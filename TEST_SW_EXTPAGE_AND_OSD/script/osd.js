chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
	console.log("OSD runtime.onMessage", msg)
	if (msg.cmd == 'DOMParser') {
		let parser = new DOMParser();
		let doc = parser.parseFromString(msg.html, 'text/html');
		let tc = doc.getElementById('bar').textContent;
		sendResponse(tc)
	}
})
