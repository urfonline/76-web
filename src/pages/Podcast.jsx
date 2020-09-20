import m from "mithril";
import Podcast from "../components/Podcast";

import {useQuery} from "../util/QueryClient";
import QPodcast from "../queries/podcast.gql";

export default function PodcastPage(vnode) {
    let [stream, run, error] = useQuery(QPodcast, { slug: vnode.attrs.slug });

    let podcast = stream.map(data => data.podcast);

    return {
        oninit: run,
        view(vnode) {
            return <div class="block">
                {podcast() ? m(Podcast, podcast()) : <h1>Loading...</h1>}
                {error() && <div class="error">
                    There was an error fetching that podcast :(
                    <div><code>{error().message}</code></div>
                </div>}
            </div>
        }
    }
}
