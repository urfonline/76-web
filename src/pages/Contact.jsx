import m from "mithril";
import SocialIcons from "../components/SocialIcons";

export default class ContactPage {
    view() {
        return <div class="block">
            <h1>Contact</h1>
            <div class="contact-page">
                <p>
                    To apply for a show or get involved,
                    email <a class="stylish" href="mailto:podcasting@urfonline.com">podcasting@urfonline.com</a>.
                </p>
                <p>
                    Powered by URF at <a class="stylish urf-red" href="https://urfonline.com">urfonline.com</a>
                </p>
                <SocialIcons/>
            </div>
        </div>
    }
}
