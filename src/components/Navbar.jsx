import m from 'mithril';
import { Link } from 'mithril/route';

import SeventySixLogo from './SeventySixLogo';
import PlayerControls from "./Player";

export default class Navbar {
    view(vnode) {
        return <div class="navbar">
            <Link href={"/"}>
                <SeventySixLogo size={'50px'} class={"logo"}/>
            </Link>
            <Link href={"/about"}>About</Link>
            <Link href={"/contact"}>Contact</Link>
            <PlayerControls/>
        </div>
    }
}
