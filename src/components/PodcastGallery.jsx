import m from "mithril";
import { Link } from "mithril/route";

import { QPodcastGallery } from "../queries/podcasts.gql";
import {useQuery} from "../util/QueryClient";

class PodcastSquare {
    view(vnode) {
        return <div class={"podcast square"}>
            <Link href={"/podcast/" + vnode.attrs.slug}>
                <img src={vnode.attrs.coverUrl} alt={vnode.attrs.title} />
            </Link>
        </div>
    }
}

class SquarePlaceholder {
    view(vnode) {
        return <div class="podcast square placeholder"></div>
    }
}

export default function PodcastGallery(vnode) {
    let [stream, run, error] = useQuery(QPodcastGallery);

    let allPodcasts = stream.map(data => data.allPodcasts);

    return {
        oncreate: run,
        view(vnode) {
            return <div class="podcast-gallery">
                {allPodcasts() ?
                    allPodcasts().map(podcast => m(PodcastSquare, { ...podcast, key: podcast.slug }))
                    : <SquarePlaceholder/>}
                {error() &&
                    <div class="error">There was an error fetching podcasts :(</div>
                }
            </div>
        }
    }
}
