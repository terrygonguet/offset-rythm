import "./popup.scss";
import Vue from "vue/dist/vue";
// import fontawesome from "@fortawesome/fontawesome";
// import solid from "@fortawesome/fontawesome-free-solid";
import moment from "moment";

// fontawesome.library.add(solid.faUser);

browser.storage.sync.get()
	.then(data => {
		let startDay = data.startDay;
		let gotUp = data.gotUp;

		let app = new Vue({
			el: "#container",
			data: {
				startDay,
				gotUp,
			},
			mounted () {
				this.$el.style.visibility = "visible";
			},
			computed: {
				bedTime () {
					let gotUp = moment(this.gotUp, "HH:mm");
					let now = moment();

					if (gotUp.hour() > now.hour()) { // if the time gotUp is later than now it was yesterday
						gotUp.subtract(1, "day");
					}

					gotUp.add(16, "hours");
					return gotUp.format("HH:mm");
				}
			},
			methods: {
				// fa (...icon) {
				// 	let faIcon = fontawesome.icon(...icon);
				// 	return faIcon ? faIcon.html[0] : "not found";
				// },
				save () {
					browser.storage.sync.set({ startDay: this.startDay, gotUp: this.gotUp });
				},
				currentTime () {
					let startDay = moment(`${this.startDay}`, "H");
					let gotUp = moment(this.gotUp, "HH:mm");
					let now = moment();

					if (gotUp.hour() > now.hour()) { // if the time gotUp is later than now it was yesterday
						gotUp.subtract(1, "day");
					}

					let hoursAwake = now.diff(gotUp, "hours", true);
					return startDay.add(hoursAwake, "hours").format("HH:mm:ss");
				},
			},
		});

		// Doesn't work for some reason
		// window.addEventListener("beforeunload", () => {
		// 	app.save();
		// });

		setInterval(() => {
			app.$forceUpdate();
		}, 1000);

	});
