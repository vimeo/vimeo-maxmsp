function get(video_id, input_token)
{
	post('Sending GET request to api.vimeo.com');
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
	post('Received response. Parsing URL');
	var rawtext = this.response;
	var body = JSON.parse(rawtext);
	outlet(0, body.files[1].link);
}


