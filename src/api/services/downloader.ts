import { YTDlpWrap } from 'yt-dlp-wrap';
import ffmpeg from 'fluent-ffmpeg';
import path from 'path';
import fs from 'fs';

// Supported platforms
export const SUPPORTED_PLATFORMS = [
  'youtube.com', 'youtu.be',
  'vimeo.com',
  'dailymotion.com',
  'facebook.com', 'fb.watch',
  'soundcloud.com'
];

// Check if URL is from a supported platform
export const isSupportedPlatform = (url: string): boolean => {
  try {
    const urlObj = new URL(url);
    return SUPPORTED_PLATFORMS.some(platform => urlObj.hostname.includes(platform));
  } catch (error) {
    return false;
  }
};

// Format video info for frontend
export const formatVideoInfo = (rawInfo: any) => {
  // Extract relevant formats
  const videoFormats = rawInfo.formats
    .filter((format: any) => format.vcodec !== 'none' && format.acodec !== 'none')
    .map((format: any) => ({
      formatId: format.format_id,
      quality: format.format_note || format.height ? `${format.height}p` : 'Unknown',
      extension: format.ext,
      filesize: format.filesize ? Math.round(format.filesize / 1024 / 1024) + ' MB' : 'Unknown',
      resolution: format.resolution || 'Unknown'
    }));

  // Extract audio formats
  const audioFormats = rawInfo.formats
    .filter((format: any) => format.vcodec === 'none' && format.acodec !== 'none')
    .map((format: any) => ({
      formatId: format.format_id,
      quality: format.format_note || 'Unknown',
      extension: format.ext,
      filesize: format.filesize ? Math.round(format.filesize / 1024 / 1024) + ' MB' : 'Unknown'
    }));

  return {
    title: rawInfo.title,
    thumbnail: rawInfo.thumbnail,
    duration: rawInfo.duration,
    videoFormats,
    audioFormats
  };
};

// Convert video to different format
export const convertVideo = async (
  inputPath: string,
  outputFormat: string,
  progressCallback?: (progress: number) => void
): Promise<string> => {
  const outputPath = inputPath.replace(/\.[^/.]+$/, `.${outputFormat}`);
  
  return new Promise((resolve, reject) => {
    ffmpeg(inputPath)
      .output(outputPath)
      .on('progress', (progress) => {
        if (progressCallback) {
          progressCallback(Math.min(100, Math.round(progress.percent)));
        }
      })
      .on('end', () => {
        resolve(outputPath);
      })
      .on('error', (err) => {
        reject(err);
      })
      .run();
  });
};

// Clean up old downloads (files older than 1 hour)
export const cleanupDownloads = (downloadsDir: string): void => {
  const ONE_HOUR = 60 * 60 * 1000; // 1 hour in milliseconds
  
  try {
    const files = fs.readdirSync(downloadsDir);
    
    files.forEach(file => {
      const filePath = path.join(downloadsDir, file);
      const stats = fs.statSync(filePath);
      
      const fileAge = Date.now() - stats.mtime.getTime();
      
      if (fileAge > ONE_HOUR) {
        fs.unlinkSync(filePath);
        console.log(`Deleted old file: ${file}`);
      }
    });
  } catch (error) {
    console.error('Error cleaning up downloads:', error);
  }
};
