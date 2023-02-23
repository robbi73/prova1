function OSCreateDocument(u, j, r) {
	return new Promise(async res => {
		try {
			await chrome.offscreen.createDocument({ 'url': u, 'justification': j, 'reasons': r });
			res()			
		} catch(e) {
			res()
		}
	})
}

async function openOSD() {
	await OSCreateDocument('osd.html', 'ignored', ['DOM_PARSER']);	/* I open the OSD */
	var e = '<table><tr><td>foo</td><td id="bar">bar</td></tr><table>'
	let reply = await chrome.runtime.sendMessage({'cmd': 'DOMParser', 'html': e});	/* I send my message */
	chrome.offscreen.closeDocument()	/* I close the document without waiting */
	console.log(reply)
}

chrome.tabs.create({'url': chrome.runtime.getURL('newpage.html') })

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	/* Here I receive messages addressed to the SW but SOMETIME also those addressed to the OSD */
	console.log("SW runtime.onMessage", request)
});

chrome.action.onClicked.addListener(t =>  openOSD() );