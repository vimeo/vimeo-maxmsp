const maxApi = require('max-api');
const fs = require('fs');
const utils = require("./utils");
const Vimeo = require('vimeo').Vimeo;

const https = require("https");

maxApi.post('hw');


// Attempt to load the dotenv module, which is needed to load the .env file containing the Vimeo API keys.
let dotenv_module;
try {
	dotenv_module = require('dotenv');
	dotenv_module.config();
} catch (e) {
	maxApi.post(e, maxApi.POST_LEVELS.ERROR);
	maxApi.post("Could not load the dotenv module. Please be sure to send the message 'script npm install' to the node.script object to download node modules", maxApi.POST_LEVELS.ERROR);
	process.exit(1);
}

if (!process.env.VIMEO_ACCESS_TOKEN) {
	maxApi.post("No value for key VIMEO_ACCESS_TOKEN in .env file. Please make sure to create a file called .env with a Vimeo API Access Token.");
	process.exit(1);
}

function requestVideo(videoUrl, authToken) {
	if (!utils.isTokenValid(authToken)) {
		return;
	}

	let videoId = videoUrl.match(/(vimeo\.com\/)?([0-9]+)/)[2];

	let api = new Vimeo(null, null, authToken);

	api.request({
	    method: 'GET',
	    path: `/videos/${videoId}?fields=files`,
	    headers: { 
	    	'Accept': 'application/vnd.vimeo.*+json;version=3.4' },
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
	// request("https://player.vimeo.com/video/393732499/config")
	// .then((data) => {
	// 	// Master Playlist URL
	// 	const akamaiCDNUrl = data.request.files.hls.cdns.akfire_interconnect_quic.url;
	// 	let segmentUrlList = [];

	// 	getHLSManifest(akamaiCDNUrl)
	// 		.then((data) => {
	// 			const url = new require('url')
	// 			// Media Playlist URL
	// 			const newUrl = new URL(data.variants[0].uri, akamaiCDNUrl);
	// 			getHLSManifest(newUrl)
	// 				.then((data) => {
	// 					data.segments.forEach((segment) => {
	// 						const uri = segment.uri;
	// 						maxApi.post(new URL(uri, newUrl));
	// 						segmentUrlList.push(new URL(uri, newUrl));
	// 					});
	// 					maxApi.outlet(segmentUrlList);	
	// 				})
	// 		})
	// });
	const videoId = arguments[1];
	requestVideo(videoId, process.env.VIMEO_ACCESS_TOKEN);
});


function request(requrl) {
	return new Promise((resolve, reject) => {
		let data = "";
		https.get(requrl, (res) => {
			// maxApi.post('# response url', res.url);
			res.on("data", (d) => {
				data = data + d;
			});

			res.on("end", () => {
				resolve(JSON.parse(data));
			})
		}).on("error", e => {
			reject(e);
		});
	});
}

function getHLSManifest(requrl) {
	return new Promise((resolve, reject) => {
		let data = "";
		https.get(requrl, (res) => {
			// maxApi.post('# response url', res.url);
			res.on("data", (d) => {
				data = data + d;
			});

			res.on("end", () => {
				const HLS = require('hls-parser'); 
				// Parse the playlist
				const playlist = HLS.parse(data);
				// You can access the playlist as a JS object
				if (playlist.isMasterPlaylist) {
				// Master playlist
					maxApi.post('### MASTER PLAYLIST');
					resolve(playlist);
				} else {
				// Media playlist
					maxApi.post('### MEDIA PLAYLIST');
					resolve(playlist);
				}
			})
		}).on("error", e => {
			reject(e);
		});
	});
}




