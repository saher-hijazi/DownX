const express = require('express');
const cors = require('cors');
const { spawn } = require('child_process');

// Create a simple Express server
const app = express();
const port = 3001;

// Enable CORS
app.use(cors());

// Parse JSON request body
app.use(express.json());

// Format file size
function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'API server is running',
    timestamp: new Date().toISOString()
  });
});

// Get video info - new endpoint
app.post('/api/download/info', async (req, res) => {
  try {
    const { url } = req.body;
    
    console.log('Received request for URL:', url);

    if (!url) {
      return res.status(400).json({
        success: false,
        error: 'URL is required',
        errorCode: 'MISSING_URL'
      });
    }
    
    // Validate URL format
    try {
      new URL(url);
    } catch (error) {
      return res.status(400).json({
        success: false,
        error: 'Invalid URL format',
        errorCode: 'INVALID_URL'
      });
    }
    
    // Determine platform from URL
    let platformName = 'Unknown';
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      platformName = 'YouTube';
    } else if (url.includes('vimeo.com')) {
      platformName = 'Vimeo';
    } else if (url.includes('dailymotion.com')) {
      platformName = 'Dailymotion';
    } else if (url.includes('facebook.com')) {
      platformName = 'Facebook';
    } else if (url.includes('soundcloud.com')) {
      platformName = 'SoundCloud';
    }
    
    console.log('Platform detected:', platformName);
    
    // Generate mock data for now
    // Get thumbnail based on platform
    let thumbnail = '/placeholder-thumbnail.svg';
    if (platformName === 'YouTube' && url.includes('v=')) {
      const videoId = url.split('v=')[1].split('&')[0];
      thumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    }
    
    // Generate a title based on the URL
    let title = `${platformName} Video`;
    if (url.includes('youtube.com') && url.includes('v=')) {
      const videoId = url.split('v=')[1].split('&')[0];
      title = `${platformName} Video (${videoId})`;
    } else if (url.includes('youtu.be')) {
      const videoId = url.split('youtu.be/')[1].split('?')[0];
      title = `${platformName} Video (${videoId})`;
    }
    
    // Generate mock video info
    const videoInfo = {
      title,
      thumbnail,
      duration: Math.floor(Math.random() * 600) + 60, // Random duration between 1-10 minutes
      videoFormats: [
        {
          formatId: 'best',
          quality: '4K',
          extension: 'mp4',
          resolution: '3840x2160',
          filesize: formatFileSize(Math.floor(Math.random() * 500000000) + 200000000) // 200-700MB
        },
        {
          formatId: '137+140',
          quality: '1080p',
          extension: 'mp4',
          resolution: '1920x1080',
          filesize: formatFileSize(Math.floor(Math.random() * 100000000) + 50000000) // 50-150MB
        },
        {
          formatId: '136+140',
          quality: '720p',
          extension: 'mp4',
          resolution: '1280x720',
          filesize: formatFileSize(Math.floor(Math.random() * 50000000) + 20000000) // 20-70MB
        },
        {
          formatId: '135+140',
          quality: '480p',
          extension: 'mp4',
          resolution: '854x480',
          filesize: formatFileSize(Math.floor(Math.random() * 30000000) + 10000000) // 10-40MB
        },
        {
          formatId: '134+140',
          quality: '360p',
          extension: 'mp4',
          resolution: '640x360',
          filesize: formatFileSize(Math.floor(Math.random() * 20000000) + 5000000) // 5-25MB
        }
      ],
      audioFormats: [
        {
          formatId: '251',
          quality: 'High Quality (160kbps)',
          extension: 'mp3',
          filesize: formatFileSize(Math.floor(Math.random() * 10000000) + 5000000) // 5-15MB
        },
        {
          formatId: '250',
          quality: 'Medium Quality (70kbps)',
          extension: 'mp3',
          filesize: formatFileSize(Math.floor(Math.random() * 5000000) + 2000000) // 2-7MB
        },
        {
          formatId: '249',
          quality: 'Low Quality (50kbps)',
          extension: 'mp3',
          filesize: formatFileSize(Math.floor(Math.random() * 3000000) + 1000000) // 1-4MB
        }
      ]
    };
    
    console.log(`Generated ${videoInfo.videoFormats.length} video formats and ${videoInfo.audioFormats.length} audio formats`);
    
    return res.status(200).json({
      success: true,
      info: videoInfo,
      isMock: true
    });
  } catch (error) {
    console.error('Error fetching video info:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to fetch video information',
      errorCode: 'SERVER_ERROR',
      details: error.message
    });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`API server running at http://localhost:${port}`);
});
