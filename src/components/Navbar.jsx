import m from 'mithril';
import { Link } from 'mithril/route';

import SeventySixLogo from './SeventySixLogo';
import PlayerControls from "./PlayerControls";

export default class Navbar {
    view(vnode) {
        return <div class="navbar">
            <Link href={"/home"}>
                <SeventySixLogo size={'50px'} class={"logo"}/>
            </Link>
            <Link href={"/contact"}>Contact</Link>
            <PlayerControls/>
        </div>
    }
}
