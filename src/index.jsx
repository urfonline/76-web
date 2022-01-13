import m from 'mithril';

import './style.css';
import 'fork-awesome/css/fork-awesome.min.css';

import Navbar from "./components/Navbar";
import BackgroundPlate from "./components/BackgroundPlate";

import {createStore} from "./util/ReduxAdapter";
import playerReducer from "./ducks/player";

createStore({ player: playerReducer });

function RootResolver(chunk) {
    return {
        onmatch() {
            return chunk().then((module) => module.default);
        },
        render(vnode) {
            return <div class="container">
                <BackgroundPlate/>
                <Navbar/>
                <>
                    {vnode}
                </>
            </div>
        }
    };
}

m.route.prefix = "";
m.route(document.body, "/", {
    "/": RootResolver(() => import(/* webpackChunkName: "Home", webpackPreload: true */ "./pages/Home")),
    "/podcast/:slug": RootResolver(() => import(/* webpackChunkName: "Podcast" */ "./pages/Podcast")),
    "/:key": RootResolver(() => import(/* webpackChunkName: "Custom" */ "./pages/Custom")),
});
