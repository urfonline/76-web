import m from "mithril";
import {connect} from "../util/ReduxAdapter";
import Stream from "mithril/stream";

function PlayerAudio(vnode) {
    function handleAudioStateChange(e) {
        console.log(e);
        // vnode.attrs.dispatch({ type: "AUDIO_STATE_CHANGE", audioState: e.type });
        vnode.attrs.onTimeUpdate({ duration: e.target.duration });
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
            console.log(seekState);

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
                          ontimeupdate={handleTimeUpdate}/>
        }
    }
}

function PlayerControls(vnode) {
    let elapsed = 0;
    let duration = 1;
    let seekState = Stream({ shouldSeek: false, target: 0 });

    function handleTimeUpdate(actual) {
        elapsed = actual.elapsed || elapsed;
        duration = actual.duration || duration;
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
                <input type="range" min="0" max="100" step="0.01" value={progress || 0} role="slider"
                       autocomplete="off" aria-label="seek" aria-valuemin="0" aria-valuemax="100"
                       aria-valuenow={progress || 0} onchange={
                    e => seekState({ shouldSeek: true, target: (e.target.value / 100) * duration })
                }>
                </input>
                <PlayerAudio onTimeUpdate={handleTimeUpdate} seekState={seekState} selectedEpisode={selectedEpisode}
                             shouldPlay={shouldPlay}/>
            </div>
        }
    }
}

export default connect((state) => state.player)(PlayerControls);
