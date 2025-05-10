import axios from 'axios';
import { VideoInfoResponse, DownloadStartResponse, DownloadStatusResponse } from '@/types';

const API_BASE_URL = 'http://localhost:3001/api';

// Create axios instance with base URL
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Get video information
export const getVideoInfo = async (url: string): Promise<VideoInfoResponse> => {
  try {
    const response = await api.post('/download/info', { url });
    return response.data;
  } catch (error) {
    console.error('API Error - getVideoInfo:', error);
    return {
      success: false,
      error: 'Failed to fetch video information. Please try again.',
    };
  }
};

// Start download
export const startDownload = async (
  url: string,
  format: string,
  type: 'video' | 'audio'
): Promise<DownloadStartResponse> => {
  try {
    const response = await api.post('/download/start', { url, format, type });
    return response.data;
  } catch (error) {
    console.error('API Error - startDownload:', error);
    return {
      success: false,
      error: 'Failed to start download. Please try again.',
    };
  }
};

// Get download status
export const getDownloadStatus = async (downloadId: string): Promise<DownloadStatusResponse> => {
  try {
    const response = await api.get(`/download/status/${downloadId}`);
    return response.data;
  } catch (error) {
    console.error('API Error - getDownloadStatus:', error);
    return {
      success: false,
      error: 'Failed to get download status. Please try again.',
    };
  }
};

// Get download file URL
export const getDownloadFileUrl = (downloadId: string): string => {
  return `${API_BASE_URL}/download/file/${downloadId}`;
};

// Supported platforms
export const SUPPORTED_PLATFORMS = [
  'youtube.com',
  'youtu.be',
  'vimeo.com',
  'dailymotion.com',
  'facebook.com',
  'fb.watch',
  'soundcloud.com',
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

// Format duration in seconds to MM:SS or HH:MM:SS
export const formatDuration = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
};
