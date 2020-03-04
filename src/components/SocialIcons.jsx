import m from 'mithril';

export default function SocialIcons(vnode) {
	return {
		view(vnode) {
			return <div class="socials">
				<a class="social" href="https://www.facebook.com/76podcasting/">
					<i class="fa fa-facebook-official fa-2x"/>
				</a>
				<a class="social" href="https://www.instagram.com/76podcasting/">
					<i class="fa fa-instagram fa-2x"/>
				</a>
			</div>
		}
	}
}
