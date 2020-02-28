import m from "mithril";
import {connect} from "../util/ReduxAdapter";

function Player(vnode) {
    function handleAudioStateChange(e) {
        console.log(e);
        vnode.attrs.dispatch({ type: "AUDIO_STATE_CHANGE", audioState: e.type });
    }

    return {
        oncreate(vnode) {
            vnode.dom.addEventListener('loadstart', handleAudioStateChange);
            vnode.dom.addEventListener('play', handleAudioStateChange);
            vnode.dom.addEventListener('pause', handleAudioStateChange);
        },
        onremove(vnode) {
            vnode.dom.removeEventListener('loadstart', handleAudioStateChange);
            vnode.dom.removeEventListener('play', handleAudioStateChange);
            vnode.dom.removeEventListener('pause', handleAudioStateChange);
        },
        onupdate(vnode) {
            if (vnode.attrs.shouldPlay) {
                vnode.dom.play();
            } else {
                vnode.dom.pause();
            }
        },

        view(vnode) {
            let { selectedEpisode = {} } = vnode.attrs;

            return <audio src={selectedEpisode.mediaUrl}/>
        }
    }
}

export default connect((state) => state.player)(Player);
