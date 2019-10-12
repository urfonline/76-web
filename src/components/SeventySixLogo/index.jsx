import m from 'mithril';
import Logo from './logo.svg';
import Vivus from 'vivus';

export default class SeventySixLogo {
    view({ attrs }) {
        return <Logo style={{ width: attrs.size || '75px', height: 'auto' }} className={attrs.class}/>
    }

    oncreate(vnode) {
        this.vivus = new Vivus(vnode.dom, {
            duration: 100,
            type: 'sync',
            start: 'manual',
            animTimingFunction: Vivus.LINEAR,
            pathTimingFunction: Vivus.EASE,
            reverseStack: true,
        });

        window.navVivus = this.vivus;

        this.vivus.play();
    }

    onbeforeremove() {
        this.vivus.destroy();
        window.navVivus = null;
    }
}