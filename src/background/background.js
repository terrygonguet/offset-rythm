(async function () {
	let data = await browser.storage.sync.get();
	// if (!data.categories) {
	// 	await browser.storage.sync.set({ categories: {} });
	// }
})();
