import polyfill from "babel-polyfill";
console.log(polyfill);

(async function () {
	let data = await browser.storage.sync.get();
	if (!data.startDay) {
		await browser.storage.sync.set({ startDay: 7 });
	}
	if (!data.gotUp) {
		await browser.storage.sync.set({ gotUp: "07:00" });
	}
})();
