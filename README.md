# <img src="https://user-images.githubusercontent.com/33762/33720344-abc20bb8-db31-11e7-8362-59a4985aeff0.png" width="150" />

### Vimeo-Max/MSP  
API to play and manipulate Vimeo videos on Max/MSP and Jitter.  
 
This API currently supports only progressive video playback.

## Requirements
- Max 8 or higher
- QuickTime
- Developer credentials to your Vimeo account

## Getting Vimeo API Credentials

You need an API key to access Vimeo from Max. To get an API key: 

- Get a Vimeo Account. 

> Accessing video files is limited to [Vimeo Pro and Business](https://vimeo.com/upgrade) customers. 

> You can only stream videos from your own Vimeo account. Access to all videos is limited to partnership-level integrations. If you are interested in a partnership, reach out to sam.lyon@vimeo.com

- [Click here](https://authy.vimeo.com/auth/vimeo/maxmsp) to generate an API token for your Max/MSP patch. Note this API token down.

## Setup and Usage
<div align="center">
<span style="display:inline-block;">
<img src=docs/max_scramblr.gif height="300">
</span>
</div>


Max 8 uses Node4Max (n4m). Vimeo-Max/MSP plugin is available as an n4m plugin in the `n4m-vimeo` directory in this repo.

- In this directory, you should see a file named .env-template (hint: this file may be invisible). This is an environment file, it contains key-value pairs that other applications, like Node, can load before running.

- Duplicate the .env-template file to a new file named ".env". It must be named ".env", not "my.env" or anything like that. Fill in this file using the API access token obtained in the earlier step.

- `n4m-vimeo/player.maxpat` contains an example patch that plays video from a Vimeo URL



[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
