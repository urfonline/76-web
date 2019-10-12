import m from 'mithril';

import './style.css';

import Navbar from "./components/Navbar";
import Splash from "./components/Splash";

class Homepage {
    view() {
        return <div class="container">
            <Navbar/>
            <div class="block">
                <Splash/>
            </div>
        </div>
    }
}

class AboutPage {
    view() {
        return <div class="container">
            <Navbar/>
            <div class="block">
                <p>
                    76 Podcasting is run by the same team that runs University Radio Falmer
                    <br/>
                    My money's in that office, right? If she start giving me some bullshit about it ain't there,
                    and we got to go someplace else and get it, I'm gonna shoot you in the head then and there.
                    Then I'm gonna shoot that bitch in the kneecaps, find out where my goddamn money is.
                    She gonna tell me too. Hey, look at me when I'm talking to you, motherfucker. You listen:
                    we go in there, and that dude Winston or anybody else is in there, you the first motherfucker
                    to get shot. You understand?
                </p>
            </div>
        </div>
    }
}

function AnimatedResolver(component) {
    return {
        onmatch: function() {
            return new Promise((resolve, reject) => {
                if (window.navVivus) {
                    window.navVivus.play(-1.5, () => resolve(component))
                } else resolve(component)
            });
        },
        render: (vnode) => [vnode]
    }
}

m.route(document.body, "/home", {
    "/home": AnimatedResolver(Homepage),
    "/about": AnimatedResolver(AboutPage),
});