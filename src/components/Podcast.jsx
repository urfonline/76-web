import m from "mithril";
import {connect} from "../util/ReduxAdapter";

class PodcastEpisode {
    view(vnode) {
        return <div class={"podcast-episode " + (vnode.attrs.open ? "open" : "closed")}
                    onclick={vnode.attrs.handleClick}>
            <span><b>{vnode.attrs.title}</b></span>
            <span class="duration">{vnode.attrs.duration}</span>
            {vnode.attrs.open && <div class="extra">
                <p>{vnode.attrs.description}</p>
                <button onclick={vnode.attrs.handlePlay}>Play {vnode.attrs.isPreview ? "Preview" : "Episode"}</button>
            </div>}
        </div>
    }
}

class SpotifyLink {
    view(vnode) {
        return <a href={vnode.attrs.url} class="spotify"><i class="fa fa-spotify"/> Listen on Spotify</a>;
    }
}

class RSSLink {
    view(vnode) {
        return <a href={'feed:' + vnode.attrs.url} type="application/rss+xml"><i class="fa fa-rss"/> Subscribe via RSS</a>;
    }
}

class Podcast {
    constructor() {
        this.accordion = 0;
    }

    view(vnode) {
        return <div class="podcast-page">
            <h1>{vnode.attrs.title}</h1>
            <div class="podcast-content">
                <img class="float-right lazyload" data-src={vnode.attrs.coverUrl} alt={vnode.attrs.title} />
                <p>{vnode.attrs.description}</p>
                <div class="podcast-links">
                    {vnode.attrs.spotifyUrl && <SpotifyLink url={vnode.attrs.spotifyUrl}/>}
                    {vnode.attrs.rssUrl && <RSSLink url={vnode.attrs.rssUrl}/>}
                </div>
                <h3>Episodes</h3>
                <div class="podcast-episodes">
                    {vnode.attrs.episodes.map(
                        (ep, i) => m(PodcastEpisode, {
                            ...ep,
                            open: this.accordion === i,
                            handleClick() {
                                vnode.state.accordion = i;
                            },
                            handlePlay() {
                                vnode.attrs.dispatch({ type: "SET_EPISODE", episode: ep })
                            }
                        })
                    )}
                </div>
            </div>
            <div className="center endstop">&#9679;</div>
        </div>
    }
}

export default connect((_state) => ({}))(Podcast);
