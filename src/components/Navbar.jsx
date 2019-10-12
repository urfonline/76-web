import m from 'mithril';
import { Link } from 'mithril/route';

import SeventySixLogo from './SeventySixLogo';

export default class Navbar {
    view() {
        return <div class="navbar">
            <SeventySixLogo size={'50px'} class={"logo"}/>
            <Link href={"/home"}>Home</Link>
            <Link href={"/about"}>About Us</Link>
        </div>
    }
}
