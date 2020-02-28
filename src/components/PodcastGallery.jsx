import m from "mithril";

class PodcastSquare {
    view(vnode) {
        return <div class={"podcast " + vnode.attrs.podcast.ratio}>
            <img src={vnode.attrs.podcast.coverUrl} alt={vnode.attrs.podcast.title} />
        </div>
    }
}

export default class PodcastGallery {
    constructor() {
        this.podcasts = [];
    }

    view(vnode) {
        return <div class="podcast-gallery">
            {vnode.state.podcasts.map((podcast) => m(PodcastSquare, { podcast }))}
        </div>
    }
}