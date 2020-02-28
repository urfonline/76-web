import m from "mithril";
import { Link } from "mithril/route";

import { QPodcastGallery } from "../queries/podcasts.gql";
import {useQuery} from "../util/QueryClient";

class PodcastSquare {
    view(vnode) {
        return <div class={"podcast square"}>
            <Link href={"/podcast/" + vnode.attrs.podcast.slug}>
                <img src={vnode.attrs.podcast.coverUrl} alt={vnode.attrs.podcast.title} />
            </Link>
        </div>
    }
}

export default function PodcastGallery(vnode) {
    let [stream, run] = useQuery(QPodcastGallery);

    let allPodcasts = stream.map(data => data.allPodcasts || []);

    return {
        oninit: run,
        view(vnode) {
            return <div class="podcast-gallery">
                {allPodcasts().map(podcast => m(PodcastSquare, { podcast }))}
            </div>
        }
    }
}