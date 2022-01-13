import m from 'mithril';
import Logo from './logo.svg';
import Vivus from 'vivus';

export default class SeventySixLogo {
    view({ attrs }) {
        return <Logo onclick={() => this.onclick(attrs.disabled)} style={{ width: attrs.size || '75px', height: 'auto' }} className={attrs.class}/>
    }

    oncreate(vnode) {
        this.vivus = new Vivus(vnode.dom, {
            duration: vnode.attrs.duration || 120,
            type: 'oneByOne',
            start: 'manual',
            animTimingFunction: Vivus.EASE,
            pathTimingFunction: Vivus.EASE,
        });

        window.navVivus = this.vivus;

        this.vivus.play();
    }

    onbeforeremove() {
        this.vivus.destroy();
        window.navVivus = null;
    }

    onclick(disabled) {
        if (disabled) return;

        this.vivus.play(-2, () => {
            this.vivus.play(1);
        });
    }
}
