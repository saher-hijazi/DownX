'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { VideoInfoProps, VideoFormat, AudioFormat } from '@/types';
import { startDownload, formatDuration as formatDurationUtil } from '@/utils/api';

export default function VideoInfo({
  videoInfo,
  setDownloadId,
  setError
}: VideoInfoProps) {
  const [selectedTab, setSelectedTab] = useState<'video' | 'audio'>('video');
  const [isDownloading, setIsDownloading] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string>('');

  // Get the video URL from sessionStorage
  useEffect(() => {
    const url = sessionStorage.getItem('currentVideoUrl');
    if (url) {
      setVideoUrl(url);
    }
  }, []);

  // Use the formatDuration utility function
  const formatDuration = formatDurationUtil;

  const handleDownload = async (formatId: string, type: 'video' | 'audio') => {
    try {
      setIsDownloading(true);

      const response = await startDownload(videoUrl, formatId, type);

      if (response.success && response.downloadId) {
        setDownloadId(response.downloadId);
      } else {
        setError(response.error || 'Failed to start download');
      }
    } catch (error) {
      console.error('Error starting download:', error);
      setError('Failed to start download. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="mt-8 animate-fadeIn">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/3">
          <div className="relative aspect-video rounded-lg overflow-hidden shadow-md">
            <Image
              src={videoInfo.thumbnail || '/placeholder-thumbnail.svg'}
              alt={videoInfo.title}
              fill
              className="object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = '/placeholder-thumbnail.svg';
              }}
            />
          </div>
        </div>

        <div className="md:w-2/3">
          <h2 className="text-xl font-semibold mb-2 line-clamp-2">{videoInfo.title}</h2>

          <div className="flex items-center text-gray-600 dark:text-gray-300 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{formatDuration(videoInfo.duration)}</span>
          </div>

          <div className="mb-4">
            <div className="flex border-b border-gray-200 dark:border-gray-700">
              <button
                className={`py-2 px-4 font-medium ${
                  selectedTab === 'video'
                    ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400'
                    : 'text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400'
                }`}
                onClick={() => setSelectedTab('video')}
              >
                Video
              </button>
              <button
                className={`py-2 px-4 font-medium ${
                  selectedTab === 'audio'
                    ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400'
                    : 'text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400'
                }`}
                onClick={() => setSelectedTab('audio')}
              >
                Audio
              </button>
            </div>
          </div>

          {selectedTab === 'video' && (
            <div className="space-y-3">
              <h3 className="font-medium text-gray-700 dark:text-gray-300">Available Video Formats</h3>
              <div className="grid grid-cols-1 gap-2">
                {videoInfo.videoFormats.map((format: VideoFormat) => (
                  <div
                    key={format.formatId}
                    className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                  >
                    <div>
                      <span className="font-medium">{format.quality}</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                        {format.extension.toUpperCase()} • {format.filesize}
                      </span>
                    </div>
                    <button
                      onClick={() => handleDownload(format.formatId, 'video')}
                      disabled={isDownloading}
                      className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:opacity-50"
                    >
                      Download
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'audio' && (
            <div className="space-y-3">
              <h3 className="font-medium text-gray-700 dark:text-gray-300">Available Audio Formats</h3>
              <div className="grid grid-cols-1 gap-2">
                {videoInfo.audioFormats.map((format: AudioFormat) => (
                  <div
                    key={format.formatId}
                    className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                  >
                    <div>
                      <span className="font-medium">{format.quality}</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                        {format.extension.toUpperCase()} • {format.filesize}
                      </span>
                    </div>
                    <button
                      onClick={() => handleDownload(format.formatId, 'audio')}
                      disabled={isDownloading}
                      className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:opacity-50"
                    >
                      Download
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
