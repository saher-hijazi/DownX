# DownX - Video & Audio Downloader

DownX is a modern, high-performance web application for downloading videos and audio from popular platforms like YouTube, Vimeo, Dailymotion, Facebook, and SoundCloud.

## Features

- **Multi-Platform Support**: Download from YouTube, Vimeo, Dailymotion, Facebook, and SoundCloud
- **High-Quality Downloads**: Support for various quality options including HD and 4K
- **Audio Extraction**: Download audio-only in MP3 format
- **User-Friendly Interface**: Clean, modern UI with dark mode support
- **Progress Tracking**: Real-time download progress indicators
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Prerequisites

Before running DownX, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) (v9 or higher)
- [yt-dlp](https://github.com/yt-dlp/yt-dlp) (for video downloading functionality)
- [FFmpeg](https://ffmpeg.org/) (for audio extraction and format conversion)

## Installation

1. Clone this repository:
   ```
   git clone(https://github.com/saher-hijazi/DownX.git)
   cd downx
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev:all
   ```

   This will start both the Next.js frontend and the Express API server.

4. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## Usage

1. Enter the URL of the video or audio you want to download in the input field
2. Click "Get Download Options"
3. Select your preferred format and quality
4. Click "Download" to start the download process
5. Once the download is complete, click "Download File" to save it to your device

## Building for Production

To build the application for production:

```
npm run build:all
```

To start the production server:

```
npm run start:all
```

## Legal Disclaimer

DownX is designed for downloading content for personal use only. Please respect copyright laws and the terms of service of the platforms you download from. We do not host or distribute any copyrighted content.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [yt-dlp](https://github.com/yt-dlp/yt-dlp) for the core downloading functionality
- [Next.js](https://nextjs.org/) for the frontend framework
- [Express](https://expressjs.com/) for the API server
- [Tailwind CSS](https://tailwindcss.com/) for styling
