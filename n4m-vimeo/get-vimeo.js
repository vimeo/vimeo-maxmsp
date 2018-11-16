const maxApi = require('max-api');
const fs = require('fs');
const utils = require("./utils");
const Vimeo = require('vimeo').Vimeo;

// const videoId = '265496124';

// Attempt to load the dotenv module, which is needed to load the .env file containing the Vimeo API keys.
let dotenv_module;
try {
	dotenv_module = require("dotenv");
	dotenv_module.config();
} catch (e) {
	maxApi.post(e, maxApi.POST_LEVELS.ERROR);
	maxApi.post("Could not load the dotenv module. Please be sure to send the message 'script npm install' to the node.script object to download node modules", maxApi.POST_LEVELS.ERROR);
	process.exit(1);
}

if (!process.env.VIMEO_ACCESS_TOKEN) {
	maxApi.post("No value for key VIMEO_ACCESS_TOKEN in .env file. Please make sure to create a file called .env with a Vimeo API Access Token.", maxApi.POST_LEVELS.ERROR);
	process.exit(1);
}

function requestVideo(videoId, authToken) {
	if (!utils.isTokenValid(authToken)) {
		return;
	}

	let api = new Vimeo(null, null, authToken);

	api.request({
	    method: 'GET',
	    path: `/videos/${videoId}?fields=files`,
	    headers: { 
	    	'Accept': 'application/vnd.vimeo.*+json;version=3.2' },
		}, getVideoSrc);
}

function getVideoSrc(error, body, status_code, headers) {
	let fileList = [];

	if (error) {
	  maxApi.post('[Server] ' + error);
	}
	else {
		if (body == null) {
			maxApi.post({ error: "You don't have access to this video's files." });
			return;
		}

		// Response body should contain an array of files
		if (body.files instanceof Array) {

			// Filter out DASH and HLS links. Use only progressive video sources
			body.files.forEach((file) => {
				if (file["quality"] === 'sd' || file["quality"] == 'hd') {
					fileList.push(file);
				}
			});

			// Sort files highest to lowest by video height
			fileList = utils.sortHighToLow(fileList, 'height');
		}

		maxApi.post('Returning file link');
		maxApi.outlet(fileList[0].link);	
		return;
	}
}

maxApi.addHandler("get", (...arguments) => {
	const videoId = arguments[1];
	requestVideo(videoId, process.env.VIMEO_ACCESS_TOKEN);
});

