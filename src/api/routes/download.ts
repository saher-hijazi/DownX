import express from 'express';
import { YTDlpWrap } from 'yt-dlp-wrap';
import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();
const downloadsDir = path.join(process.cwd(), 'downloads');

// Track active downloads
const activeDownloads = new Map();

// Get video info
router.post('/info', async (req, res) => {
  try {
    const { url } = req.body;
    
    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }
    
    const ytDlp = new YTDlpWrap();
    
    const videoInfo = await ytDlp.getVideoInfo(url);
    
    return res.status(200).json({
      success: true,
      info: {
        title: videoInfo.title,
        thumbnail: videoInfo.thumbnail,
        duration: videoInfo.duration,
        formats: videoInfo.formats.map(format => ({
          formatId: format.format_id,
          formatNote: format.format_note,
          ext: format.ext,
          resolution: format.resolution,
          filesize: format.filesize,
          acodec: format.acodec,
          vcodec: format.vcodec
        }))
      }
    });
  } catch (error) {
    console.error('Error fetching video info:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch video information' 
    });
  }
});

// Start download
router.post('/start', async (req, res) => {
  try {
    const { url, format, type } = req.body;
    
    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }
    
    const downloadId = uuidv4();
    const ytDlp = new YTDlpWrap();
    
    // Set output template
    const outputTemplate = path.join(downloadsDir, `${downloadId}.%(ext)s`);
    
    // Set options based on type (video or audio)
    const options = [
      '--no-playlist',
      '-o', outputTemplate
    ];
    
    if (type === 'audio') {
      options.push('-x', '--audio-format', 'mp3');
    } else if (format) {
      options.push('-f', format);
    }
    
    // Create download object to track progress
    const downloadObj = {
      id: downloadId,
      url,
      progress: 0,
      status: 'starting',
      filename: null,
      error: null
    };
    
    activeDownloads.set(downloadId, downloadObj);
    
    // Send initial response
    res.status(200).json({
      success: true,
      downloadId,
      message: 'Download started'
    });
    
    // Start download process
    try {
      downloadObj.status = 'downloading';
      
      ytDlp.exec([url, ...options])
        .on('progress', (progress) => {
          downloadObj.progress = progress.percent;
        })
        .on('error', (error) => {
          downloadObj.status = 'error';
          downloadObj.error = error.message;
          console.error(`Download error for ${downloadId}:`, error);
        })
        .on('close', () => {
          // Find the downloaded file
          const files = fs.readdirSync(downloadsDir);
          const downloadedFile = files.find(file => file.startsWith(downloadId));
          
          if (downloadedFile) {
            downloadObj.status = 'completed';
            downloadObj.filename = downloadedFile;
          } else {
            downloadObj.status = 'error';
            downloadObj.error = 'File not found after download';
          }
        });
    } catch (error) {
      downloadObj.status = 'error';
      downloadObj.error = error.message;
      console.error(`Download error for ${downloadId}:`, error);
    }
  } catch (error) {
    console.error('Error starting download:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Failed to start download' 
    });
  }
});

// Get download status
router.get('/status/:downloadId', (req, res) => {
  const { downloadId } = req.params;
  
  if (!downloadId || !activeDownloads.has(downloadId)) {
    return res.status(404).json({ error: 'Download not found' });
  }
  
  const download = activeDownloads.get(downloadId);
  
  return res.status(200).json({
    success: true,
    download: {
      id: download.id,
      progress: download.progress,
      status: download.status,
      filename: download.filename,
      error: download.error
    }
  });
});

// Download file
router.get('/file/:downloadId', (req, res) => {
  const { downloadId } = req.params;
  
  if (!downloadId || !activeDownloads.has(downloadId)) {
    return res.status(404).json({ error: 'Download not found' });
  }
  
  const download = activeDownloads.get(downloadId);
  
  if (download.status !== 'completed' || !download.filename) {
    return res.status(400).json({ error: 'Download not completed yet' });
  }
  
  const filePath = path.join(downloadsDir, download.filename);
  
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'File not found' });
  }
  
  return res.download(filePath);
});

export const downloadRouter = router;
