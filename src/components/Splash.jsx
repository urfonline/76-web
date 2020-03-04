import m from 'mithril';
import { TimelineLite } from "gsap/TimelineLite";
import "gsap/CSSPlugin";

export default class Splash {
    constructor() {

    }

    view() {
        return <div class="splash">
            <h1 class="line">SEVEN</h1>
            <br/>
            <h1 class="line">SIX</h1>
            {/*<p>Podcasting powered by <a class="urf-red urf-link" href="https://urfonline.com">URF</a></p>*/}
        </div>
    }

    oncreate(vnode) {
        let [line1, line2] = vnode.dom.querySelectorAll(".line");
        //let paragraph = vnode.dom.querySelector("p");
        this.tl = new TimelineLite();

        this.tl.from(line1, 1, { opacity: 0, bottom: "-100px" })
            .from(line2, 1, { opacity: 0, bottom: "-100px" }, "-=0.7");
            //.from(paragraph, 1, { opacity: 0, right: "-40px" }, "-=0.6");
    }

    onbeforeremove(vnode) {
        this.tl.clear();
    }
}
