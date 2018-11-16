# n4m-vimeo

Play and manipulate your vimeo videos

## Getting an API Key

You need an API key to access Vimeo from Max. To get an API key: 

- Get a Vimeo Account. 

> Accessing video files is limited to [Vimeo Pro and Business](https://vimeo.com/upgrade) customers. 

> You can only stream videos from your own Vimeo account. Access to all videos is limited to partnership-level integrations. If you are interested in a partnership, reach out to casey@vimeo.com

- [Click Here](https://authy.vimeo.com/auth/vimeo/maxmsp) to generate an API token for your Max/MSP patch. Note this API token down.
- In this n4m-vimeo directory, you should see a file named .env-template (hint: this file may be invisible). This is an environment file, it contains key-value pairs that other applications, like Node, can load before running.

- Duplicate the .env-template file to a new file named ".env". It must be named ".env", not "my.env" or anything like that. Fill in this file using the API access token obtained in the earlier step.

- Add a video ID in the text box in player.maxpat. A video id is the numeric value following 'vimeo.com/' in the Vimeo URL for a video.