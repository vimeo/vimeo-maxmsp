# Vimeo-Max/MSP
API to play and manipulate Vimeo videos on Max/MSP and Jitter.  
 
This API currently supports only progressive video playback.

## Requirements
- Max 7 or higher
- QuickTime
- Developer credentials to your Vimeo account

## Getting Vimeo API Credentials

You need an API key to access Vimeo from Max. To get an API key: 

- Get a Vimeo Account. 

> Accessing video files is limited to [Vimeo Pro and Business](https://vimeo.com/upgrade) customers. 

> You can only stream videos from your own Vimeo account. Access to all videos is limited to partnership-level integrations. If you are interested in a partnership, reach out to casey@vimeo.com

- [Click here](https://authy.vimeo.com/auth/vimeo/maxmsp) to generate an API token for your Max/MSP patch. Note this API token down.

## Setup and Usage

### Max 8

Max 8 uses Node4Max (n4m). Vimeo-Max/MSP is available as an n4m plugin in the `n4m-vimeo` directory in this repo.

- In this directory, you should see a file named .env-template (hint: this file may be invisible). This is an environment file, it contains key-value pairs that other applications, like Node, can load before running.

- Duplicate the .env-template file to a new file named ".env". It must be named ".env", not "my.env" or anything like that. Fill in this file using the API access token obtained in the earlier step.

- `n4m-vimeo/player.maxpat` contains an example patch that plays video from a Vimeo URL

### Max 7

You can access videos on Vimeo in Max using the `getvimeofile` object.  
This object outputs a link which can then be used with `read` and `jit.qt.movie` like any other input video on jitter. 

- Download the latest release and copy the max-vimeo folder into the Max 7 Packages directory.  
-- Mac OS path: `~/Users/Documents/Max`  
-- Windows path: `C:\ProgramData\Max 7\Packages`  

- The `getvimeofile` object should be available in your Max search path the next time you run it.  

This object takes the ID of your video on Vimeo, and the API token you generated earlier. 
The help page contains an example player patch that should get you started.  

![help](docs/help.gif)

![hints](docs/tooltips.gif)  

The `/examples` directory contains patches to start you off with, including a quick & dirty patch mixing two Vimeo videos using a A/B Deck structure

![maxmsp](docs/maxmsp.gif) 



[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
