'use client';

import { useState, useEffect } from 'react';
import { DownloadProgressProps, DownloadStatus } from '@/types';
import { getDownloadStatus, getDownloadFileUrl } from '@/utils/api';

export default function DownloadProgress({
  downloadId,
  setDownloadId
}: DownloadProgressProps) {
  const [downloadStatus, setDownloadStatus] = useState<DownloadStatus | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!downloadId) return;

    const checkStatus = async () => {
      try {
        const response = await getDownloadStatus(downloadId);

        if (response.success && response.download) {
          setDownloadStatus(response.download);

          // If download is completed or has an error, stop polling
          if (
            response.download.status !== 'completed' &&
            response.download.status !== 'error'
          ) {
            setTimeout(checkStatus, 1000); // Poll every second
          }
        } else {
          setError(response.error || 'Failed to get download status');
        }
      } catch (error) {
        console.error('Error checking download status:', error);
        setError('Failed to get download status. Please try again.');
      }
    };

    checkStatus();
  }, [downloadId]);

  const handleDownloadFile = async () => {
    if (!downloadStatus || !downloadStatus.filename) return;

    try {
      window.open(getDownloadFileUrl(downloadId), '_blank');
    } catch (error) {
      console.error('Error downloading file:', error);
      setError('Failed to download file. Please try again.');
    }
  };

  const handleNewDownload = () => {
    setDownloadId(null);
  };

  if (error) {
    return (
      <div className="mt-8 text-center">
        <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg mb-4">
          <p>{error}</p>
        </div>
        <button
          onClick={handleNewDownload}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Try Another Download
        </button>
      </div>
    );
  }

  if (!downloadStatus) {
    return (
      <div className="mt-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-300">Initializing download...</p>
      </div>
    );
  }

  return (
    <div className="mt-8 max-w-2xl mx-auto">
      <h3 className="text-xl font-semibold mb-4 text-center">Download Progress</h3>

      {downloadStatus.status === 'starting' && (
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">Preparing download...</p>
        </div>
      )}

      {downloadStatus.status === 'downloading' && (
        <div>
          <div className="mb-2 flex justify-between text-sm text-gray-600 dark:text-gray-300">
            <span>Downloading...</span>
            <span>{Math.round(downloadStatus.progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-full transition-all duration-300 ease-out"
              style={{ width: `${downloadStatus.progress}%` }}
            ></div>
          </div>
        </div>
      )}

      {downloadStatus.status === 'completed' && (
        <div className="text-center">
          <div className="mb-4 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 px-4 py-3 rounded-lg">
            <p>Download completed successfully!</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={handleDownloadFile}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg shadow-md hover:from-blue-600 hover:to-purple-700 transition-colors"
            >
              Download File
            </button>
            <button
              onClick={handleNewDownload}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-medium rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              New Download
            </button>
          </div>
        </div>
      )}

      {downloadStatus.status === 'error' && (
        <div className="text-center">
          <div className="mb-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg">
            <p>Download failed: {downloadStatus.error || 'Unknown error'}</p>
          </div>
          <button
            onClick={handleNewDownload}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
}
