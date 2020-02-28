import m from "mithril";

class PodcastEpisode {
    view(vnode) {
        return <div class={"podcast-episode " + (vnode.attrs.open ? "open" : "closed")}
                    onclick={vnode.attrs.handleClick}>
            <span>{vnode.attrs.title}</span>
            <span class="duration">{vnode.attrs.duration}</span>
            {vnode.attrs.open && <div class="extra">
                <p>{vnode.attrs.description}</p>
            </div>}
        </div>
    }
}

export default class Podcast {
    constructor() {
        this.accordion = 0;
    }

    view(vnode) {
        return <div class="podcast-page">
            <h1>{vnode.attrs.title}</h1>
            <div class="podcast-content">
                <img class="float-right" src={vnode.attrs.coverUrl} alt={vnode.attrs.title} />
                <p>{vnode.attrs.description}</p>
                <h3>Episodes</h3>
                <div class="podcast-episodes">
                    {vnode.attrs.episodes.map(
                        (ep, i) => m(PodcastEpisode, {
                            ...ep,
                            open: this.accordion === i,
                            handleClick() {
                                vnode.state.accordion = i;
                            },
                        })
                    )}
                </div>
            </div>
        </div>
    }
}