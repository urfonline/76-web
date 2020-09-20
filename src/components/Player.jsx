import m from "mithril";
import {connect} from "../util/ReduxAdapter";
import {usePersistence} from "../util/StorageAdapter";

function PlayerAudioImpl(vnode) {
    window.m = m;

    function handleAudioStateChange(e) {
        console.log(e);

        if (e.type === "loadedmetadata") {
            vnode.attrs.onTimeUpdate({ elapsed: 0, duration: e.target.duration });
            vnode.attrs.onReady();
        } else if (e.type === "ended") {
            vnode.attrs.onComplete();
        }
    }

    function handleTimeUpdate(e) {
        vnode.attrs.onTimeUpdate({ elapsed: e.target.currentTime, duration: e.target.duration });
    }

    return {
        onupdate(vnode) {
            if (vnode.attrs.shouldPlay) {
                vnode.dom.play();
            } else {
                vnode.dom.pause();
            }

            if (vnode.attrs.shouldSeek) {
                vnode.dom.currentTime = vnode.attrs.target;
                vnode.attrs.onTimeUpdate({ elapsed: vnode.dom.currentTime });
                vnode.attrs.seekDone();
            }
        },

        view(vnode) {
            let { selectedEpisode = {} } = vnode.attrs;

            return <audio src={selectedEpisode.mediaUrl} onloadstart={handleAudioStateChange}
                          onplay={handleAudioStateChange} onpause={handleAudioStateChange}
                          ontimeupdate={handleTimeUpdate} onloadedmetadata={handleAudioStateChange}
                          onended={handleAudioStateChange}/>
        }
    }
}

let PlayerAudio = connect((state) => state.player, {
    onReady() {
        return { type: "READY" };
    },
    seekDone() {
        return { type: "SEEK_DONE" };
    },
})(PlayerAudioImpl);

function PlayerControls(vnode) {
    let elapsed = 0;
    let duration = 1;
    let hoverPos = 0;

    let { state, set: persistElapsed, unsubscribe } = usePersistence("podplayer");
    let episodeTime = (episode) => state.map(state => state[episode.mediaUrl] || 0);

    function handleTimeUpdate(actual) {
        elapsed = actual.elapsed || elapsed;
        duration = actual.duration || duration;
    }

    function handleMouseMove(e) {
        hoverPos = e.offsetX;
    }

    function handleMouseLeave() {
        hoverPos = 0;
    }

    function handleSeek(e) {
        return { type: "SEEK", to: (e.offsetX / e.currentTarget.clientWidth) * duration };
    }

    function handleStepSeek(e, direction) {
        return { type: "SEEK", to: elapsed + (10 * direction) };
    }

    function handleFinished(e, selectedEpisode) {
        persistElapsed(selectedEpisode.mediaUrl, null);
        return { type: "DONE" };
    }

    return {
        onupdate(vnode) {
            let selectedEpisode = vnode.attrs.selectedEpisode;

            if (vnode.attrs.shouldPlay) {
                // Save slightly behind playback head, helps moderate restoring too far forward
                let elapsedOffset = Math.floor(elapsed) - 3;
                if (elapsedOffset > 0) {
                    persistElapsed(selectedEpisode.mediaUrl, elapsedOffset);
                }
            }

            if (vnode.attrs.shouldRestore) {
                vnode.attrs.dispatch({ type: "RESTORE_POSITION", to: episodeTime(selectedEpisode)() });
            }
        },

        onremove(vnode) {
            unsubscribe();
        },

        view(vnode) {
            let {selectedEpisode, shouldPlay, playPause, dispatch} = vnode.attrs;
            let progress = (elapsed / duration) * 100;

            if (!selectedEpisode) {
                return <div class="player-info"/>
            }

            return [<div class="player-info">
                <a onclick={(e) => dispatch(handleStepSeek(e, -1))}><i class="fa fa-step-backward"/></a>
                <a onclick={playPause}>
                    {shouldPlay ? <i class="fa fa-pause"/> : <i class="fa fa-play"/>}
                </a>
                <a onclick={(e) => dispatch(handleStepSeek(e, 1))}><i className="fa fa-step-forward"/></a>
                <span class="episode-title">{selectedEpisode.title}</span>
                <PlayerAudio onTimeUpdate={handleTimeUpdate}
                             onComplete={(e) => dispatch(handleFinished(e, selectedEpisode))}/>
            </div>,
            <div className="progress-container">
                <div className="progress-bg" onmousemove={handleMouseMove} onmouseleave={handleMouseLeave}
                     onclick={(e) => dispatch(handleSeek(e))}>
                    <div className="progress-hover" style={`width: ${hoverPos}px`}/>
                    <div className="progress-primary" style={`width: ${progress}%`}/>
                </div>
            </div>]
        }
    }
}

export default connect((state) => state.player, {
    playPause() {
        return { type: "TOGGLE" };
    },
})(PlayerControls);
