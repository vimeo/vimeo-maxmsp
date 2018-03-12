function get(video_id, input_token)
{
	// If Token is not available or is invalid
	if (input_token.length <= 4) {
		post('Error: Invalid or unavailable token. Retry.');
		post();
		return;
	}

	post('Sending GET request to api.vimeo.com');
	post();

	var req = new XMLHttpRequest();
	var url = "https://api.vimeo.com/videos/" + video_id;
	var bearer = input_token;
	req.open("GET", url);
	req.setRequestHeader("Authorization", "Bearer " + bearer);
	req.responseType = 'json';
	req.onreadystatechange = readystatechange;
	req.send();
}

function readystatechange() 
{
	post();
	post(this.status);
	post();
	// Handle HTTP errors
	if (this.status !== 200) {
		post('HTTP error', this.status);
		return;
	}
	var rawtext = this.response;
	var body = JSON.parse(rawtext);

	try {
		post('Received response. Parsing URL');
		var link = body.files[1].link;
	}
	// Throw error
	catch (e) {
		post(e.name, ':', e.message);
	}
	outlet(0, link);
}


