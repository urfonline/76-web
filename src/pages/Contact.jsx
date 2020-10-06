import m from "mithril";
import SocialIcons from "../components/SocialIcons";
import {useQuery} from "../util/QueryClient";
import QPages from "../queries/pages.gql";

export default function ContactPage(vnode) {
    let [result, run, error] = useQuery(QPages, { slug: "contact" });

    let pageInfo = result.map(data => data.podcastPage);

    return {
        oninit: run,

        onupdate() {
            if (pageInfo()) {
                document.title = `${pageInfo().title} | Seven Six`;
            }
        },

        view() {
            if (!pageInfo()) {
                return <div class="block">
                    {error() ? <div class="error">Couldn't load that page :(</div> : <h1>Loading...</h1>}
                </div>
            }

            return <div class="block">
                <h1>{pageInfo().title}</h1>
                <div class="custom-page">
                    <div class="custom-content">
                        {m.trust(pageInfo().body)}
                        <p>
                            Powered by URF at <a class="urf-red" href="https://urfonline.com">urfonline.com</a>
                        </p>
                    </div>
                    <SocialIcons/>
                </div>
            </div>
        }
    }
}
