import m from "mithril";
import Splash from "../components/Splash";
import PodcastGallery from "../components/PodcastGallery";
import SocialIcons from "../components/SocialIcons";

export default class Homepage {
    oncreate() {
        document.title = "Seven Six Podcasting";
    }

    view() {
        return <div class="block">
            <Splash/>
            <h1>Podcasts</h1>
            <PodcastGallery/>
            <div class="footer">
                <SocialIcons/>
                <div class="center">Built with &#10084; by the URF tech team, 2020</div>
            </div>
        </div>
    }
}
