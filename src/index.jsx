import m from 'mithril';

import './style.css';

import Navbar from "./components/Navbar";
import Splash from "./components/Splash";
import BackgroundPlate from "./components/BackgroundPlate";
import PodcastGallery from "./components/PodcastGallery";
import Podcast from "./components/Podcast";
import Player from "./components/Player";

import {useQuery} from "./util/QueryClient";
import QPodcast from "./queries/podcast.gql";

import {createStore} from "./util/ReduxAdapter";
import playerReducer from "./ducks/player";

class Homepage {
    view() {
        return <div class="block">
            <Splash/>
            <h1>Podcasts</h1>
            <PodcastGallery/>
        </div>
    }
}

class AboutPage {
    view() {
        return <div class="block filled">
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
    }
}

function PodcastPage(vnode) {
    let [stream, run, error] = useQuery(QPodcast, { slug: vnode.attrs.slug });

    let podcast = stream.map(data => data.podcast);

    return {
        oninit: run,
        view(vnode) {
            return <div class="block">
                {podcast() ? m(Podcast, podcast()) : <h1>Loading...</h1>}
                {error() && <div class="error">There was an error fetching that podcast :(</div>}
            </div>
        }
    }
}

createStore({ player: playerReducer });

function RootResolver(WrappedComponent) {
    return {
        onmatch() {
            return WrappedComponent;
        },
        render(vnode) {
            return <div class="container">
                <BackgroundPlate/>
                <Navbar/>
                <Player/>
                {vnode}
            </div>
        }
    };
}

m.route(document.body, "/home", {
    "/home": RootResolver(Homepage),
    "/about": RootResolver(AboutPage),
    "/podcast/:slug": RootResolver(PodcastPage),
});