# VimeoMaxAPI
API to play and manipulate Vimeo videos on Max/MSP and Jitter.  
The `getvimeofile` object is a limited API to access your Vimeo videos via Max/MSP. The object outputs a link which can then be used with `read` and `jit.qt.movie` like any other input video on jitter.  
This API currently supports only progressive video playback and picks the resolution at random.

## Requirements
- Max 7 or higher
- QuickTime
- Developer credentials to your Vimeo account

## Installation

Download the latest release and copy the max-vimeo folder into the Max 7 Packages directory.  
Mac OS path: `~/Users/Documents/Max`  
Windows path: `C:\ProgramData\Max 7\Packages`  

The API should be available in your Max search path the next time you run it.  

## Usage

Vimeo Max/MSP API contains an object called `getvimeofile`. 

![hints](docs/tooltips.gif)

This object takes in the ID of your video on Vimeo, and an API token. [Click Here](https://authy.vimeo.com/auth/vimeo/maxmsp) to generate an API token for your Max/MSP patch.

This repo also contains 2 example patches that use the API - player and mixer. Both load a vimeo Video into `jit.qt.movie` and use it for simple Jitter applications.


Here's a gif of a quick'n'dirty patch mixing two Vimeo videos.

![maxmsp](docs/maxmsp.gif)

