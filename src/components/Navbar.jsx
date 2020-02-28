import m from 'mithril';
import { Link } from 'mithril/route';

import SeventySixLogo from './SeventySixLogo';
import {connect} from "../util/ReduxAdapter";

class Navbar {
    view(vnode) {
        let { dispatch, selectedEpisode, shouldPlay } = vnode.attrs;

        return <div class="navbar">
            <SeventySixLogo size={'50px'} class={"logo"}/>
            <Link href={"/home"}>Home</Link>
            <Link href={"/about"}>About Us</Link>
            {selectedEpisode && <div class="player-info">
                <span>{selectedEpisode.title}</span>
                {shouldPlay ?
                    (<button onclick={() => dispatch({ type: "PAUSE" })}>Pause</button>) :
                    (<button onclick={() => dispatch({ type: "PLAY" })}>Play</button>)}
            </div>}
        </div>
    }
}

export default connect((state) => state.player)(Navbar);
