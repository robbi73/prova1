chrome.runtime.onMessage.addListener((request, sender, sendResponse) => 
	/* Here I receive also messages addressed to the OSD, Why???? */
	console.log("Extension page  runtime.onMessage", request)
)