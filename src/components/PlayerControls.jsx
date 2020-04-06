import m from 'mithril';
import {connect} from "../util/ReduxAdapter";

function PlayerControls(vnode) {
    return {
        view(vnode) {
            let {selectedEpisode, shouldPlay, elapsed, duration, dispatch} = vnode.attrs;
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
                           e => dispatch({ type: "SEEK", to: (e.target.value / 100) * duration })
                       }>
                </input>
            </div>
        }
    }
}

export default connect(state => state.player)(PlayerControls);
