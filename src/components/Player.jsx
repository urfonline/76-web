import m from "mithril";
import {connect} from "../util/ReduxAdapter";
import Stream from "mithril/stream";

function PlayerAudio(vnode) {
    function handleAudioStateChange(e) {
        console.log(e);
        // vnode.attrs.dispatch({ type: "AUDIO_STATE_CHANGE", audioState: e.type });

        if (e.type === "loadedmetadata") {
            vnode.attrs.onTimeUpdate({ elapsed: 0, duration: e.target.duration });
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

            let seekState = vnode.attrs.seekState();

            if (seekState.shouldSeek) {
                vnode.dom.currentTime = seekState.target;
                vnode.attrs.onTimeUpdate({ elapsed: vnode.dom.currentTime });
                vnode.attrs.seekState({ ...seekState, shouldSeek: false });
            }
        },

        view(vnode) {
            let { selectedEpisode = {} } = vnode.attrs;

            return <audio src={selectedEpisode.mediaUrl} onloadstart={handleAudioStateChange}
                          onplay={handleAudioStateChange} onpause={handleAudioStateChange}
                          ontimeupdate={handleTimeUpdate} onloadedmetadata={handleAudioStateChange}/>
        }
    }
}

function PlayerControls(vnode) {
    let elapsed = 0;
    let duration = 1;
    let seekState = Stream({ shouldSeek: false, target: 0 });
    let hoverPos = 0;

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
        seekState({ shouldSeek: true, target: (e.offsetX / e.currentTarget.clientWidth) * duration });
    }

    return {
        view(vnode) {
            let {selectedEpisode, shouldPlay, dispatch} = vnode.attrs;
            let progress = (elapsed / duration) * 100;

            if (!selectedEpisode) {
                return <div class="player-info"/>
            }

            return <div class="player-info">
                <a onclick={() => dispatch({type: "TOGGLE"})}>
                    {shouldPlay ? <i class="fa fa-pause"/> : <i class="fa fa-play"/>}
                </a>
                <span class="episode-title">{selectedEpisode.title}</span>
                <PlayerAudio onTimeUpdate={handleTimeUpdate} seekState={seekState} selectedEpisode={selectedEpisode}
                             shouldPlay={shouldPlay}/>
                <div class="progress-container">
                    <div class="progress-bg" onmousemove={handleMouseMove} onmouseleave={handleMouseLeave}
                         onclick={handleSeek}>
                        <div class="progress-hover" style={`width: ${hoverPos}px`}>

                        </div>
                        <div class="progress-primary" style={`width: ${progress}%`}/>
                    </div>
                </div>
            </div>
        }
    }
}

export default connect((state) => state.player)(PlayerControls);
