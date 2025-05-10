// Video format type
export interface VideoFormat {
  formatId: string;
  quality: string;
  extension: string;
  filesize: string;
  resolution?: string;
}

// Audio format type
export interface AudioFormat {
  formatId: string;
  quality: string;
  extension: string;
  filesize: string;
}

// Video info type
export interface VideoInfoType {
  title: string;
  thumbnail: string;
  duration: number;
  videoFormats: VideoFormat[];
  audioFormats: AudioFormat[];
}

// Download status type
export interface DownloadStatus {
  id: string;
  progress: number;
  status: 'starting' | 'downloading' | 'completed' | 'error';
  filename: string | null;
  error: string | null;
}

// Props for components
export interface DownloadFormProps {
  setVideoInfo: (info: VideoInfoType | null) => void;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setDownloadId: (id: string | null) => void;
}

export interface VideoInfoProps {
  videoInfo: VideoInfoType;
  setDownloadId: (id: string | null) => void;
  setError: (error: string | null) => void;
}

export interface DownloadProgressProps {
  downloadId: string;
  setDownloadId: (id: string | null) => void;
}

// API response types
export interface VideoInfoResponse {
  success: boolean;
  info?: {
    title: string;
    thumbnail: string;
    duration: number;
    formats: any[];
  };
  error?: string;
}

export interface DownloadStartResponse {
  success: boolean;
  downloadId?: string;
  message?: string;
  error?: string;
}

export interface DownloadStatusResponse {
  success: boolean;
  download?: DownloadStatus;
  error?: string;
}
