'use client';

import { useState } from 'react';
import { DownloadFormProps } from '@/types';
import { getVideoInfo, isSupportedPlatform } from '@/utils/api';

export default function DownloadForm({
  setVideoInfo,
  setIsLoading,
  setError,
  setDownloadId
}: DownloadFormProps) {
  const [url, setUrl] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset states
    setVideoInfo(null);
    setError(null);
    setDownloadId(null);

    // Validate URL
    if (!url.trim()) {
      setError('Please enter a valid URL');
      return;
    }

    // Check if URL is from a supported platform
    if (!isSupportedPlatform(url)) {
      setError('This URL is not from a supported platform. Please try a URL from YouTube, Vimeo, Dailymotion, Facebook, or SoundCloud.');
      return;
    }

    try {
      setIsLoading(true);

      // Store the URL in sessionStorage for later use
      sessionStorage.setItem('currentVideoUrl', url);

      // Fetch video info
      const response = await getVideoInfo(url);

      if (response.success) {
        setVideoInfo(response.info);
      } else {
        setError(response.error || 'Failed to fetch video information');
      }
    } catch (error) {
      console.error('Error fetching video info:', error);
      setError('Failed to fetch video information. Please check the URL and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaste = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      setUrl(clipboardText);
    } catch (error) {
      console.error('Failed to read clipboard:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col space-y-2">
        <label htmlFor="url" className="text-lg font-medium text-gray-700 dark:text-gray-300">
          Enter Video URL
        </label>
        <div className="flex">
          <input
            type="text"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://www.youtube.com/watch?v=..."
            className="flex-grow px-4 py-3 rounded-l-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={handlePaste}
            className="px-4 py-3 bg-gray-100 dark:bg-gray-600 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors"
          >
            Paste
          </button>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          type="submit"
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg shadow-md hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transform transition-transform hover:scale-105"
        >
          Get Download Options
        </button>
      </div>

      <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
        <p>Supported platforms: YouTube, Vimeo, Dailymotion, Facebook, SoundCloud</p>
      </div>
    </form>
  );
}
