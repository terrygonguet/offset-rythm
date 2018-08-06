import './popup.scss';
import Vue from 'vue/dist/vue';
import fontawesome from '@fortawesome/fontawesome';
import solid from '@fortawesome/fontawesome-free-solid';

fontawesome.library.add(solid.faUser);

browser.storage.sync.get()
	.then(data => {
		let app = new Vue({
			el: '#container',
			data: {},
			mounted () {
				this.$el.style.visibility = 'visible';
			},
			computed: {},
			methods: {
				fa (...icon) {
					let faIcon = fontawesome.icon(...icon);
					return faIcon ? faIcon.html[0] : 'not found';
				},
			},
		});

		window.addEventListener('beforeunload', function (event) {
			// browser.storage.sync.set({});
		});
	});
