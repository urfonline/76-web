import m from 'mithril';

import './style.css';
import 'fork-awesome/css/fork-awesome.min.css';

import Navbar from "./components/Navbar";
import Splash from "./components/Splash";
import BackgroundPlate from "./components/BackgroundPlate";
import PodcastGallery from "./components/PodcastGallery";
import Podcast from "./components/Podcast";
import Player from "./components/Player";
import SocialIcons from "./components/SocialIcons";

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

class ContactPage {
    view() {
        return <div class="block filled contact-page">
            <p>
                To apply for a show or get involved,
                email <a class="stylish" href="mailto:podcasting@urfonline.com">podcasting@urfonline.com</a>.
            </p>
            <p>
                Powered by URF at <a class="stylish urf-red" href="https://urfonline.com">urfonline.com</a>
            </p>
            <SocialIcons/>
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
    "/contact": RootResolver(ContactPage),
    "/podcast/:slug": RootResolver(PodcastPage),
});
