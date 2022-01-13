import m from 'mithril';

import SeventySixLogo from './SeventySixLogo';

export default class Splash {
    constructor() {

    }

    view() {
        return [<div class="splash desktop">
            <h1 class="line">SEVEN</h1>
            <br/>
            <h1 class="line">SIX</h1>
            <p>Podcasting powered by <a class="urf-red urf-link" href="https://urfonline.com">URF</a></p>
        </div>,
        <div class="splash mobile">
            <SeventySixLogo size="100%" class="logo" duration={150} disabled />
            <p>Podcasting powered by <a className="urf-red urf-link" href="https://urfonline.com">URF</a></p>
        </div>]
    }
}
