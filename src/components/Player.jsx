import m from "mithril";
import {connect} from "../util/ReduxAdapter";

function Player(vnode) {
    function handleAudioStateChange(e) {
        console.log(e);
        vnode.attrs.dispatch({ type: "AUDIO_STATE_CHANGE", audioState: e.type });
    }

    function handleTimeUpdate(e) {
        vnode.attrs.dispatch({ type: "AUDIO_TIME_UPDATE", elapsed: e.target.currentTime, duration: e.target.duration });
    }

    return {
        oncreate(vnode) {
            vnode.dom.addEventListener('loadstart', handleAudioStateChange);
            vnode.dom.addEventListener('play', handleAudioStateChange);
            vnode.dom.addEventListener('pause', handleAudioStateChange);
            vnode.dom.addEventListener('timeupdate', handleTimeUpdate);
        },
        onremove(vnode) {
            vnode.dom.removeEventListener('loadstart', handleAudioStateChange);
            vnode.dom.removeEventListener('play', handleAudioStateChange);
            vnode.dom.removeEventListener('pause', handleAudioStateChange);
            vnode.dom.removeEventListener('timeupdate', handleTimeUpdate);
        },
        onupdate(vnode) {
            if (vnode.attrs.shouldPlay) {
                vnode.dom.play();
            } else {
                vnode.dom.pause();
            }

            if (vnode.attrs.shouldSeek) {
                vnode.dom.currentTime = vnode.attrs.elapsed;
                vnode.attrs.dispatch({ type: "SEEK_DONE" });
            }
        },

        view(vnode) {
            let { selectedEpisode = {} } = vnode.attrs;

            return <audio src={selectedEpisode.mediaUrl}/>
        }
    }
}

export default connect((state) => state.player)(Player);
