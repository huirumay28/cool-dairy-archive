'use client';

import { getYouTubeId } from '@/lib/data';

interface YouTubeEmbedProps {
  url: string;
  channel?: string;
  className?: string;
}

export default function YouTubeEmbed({ url, channel, className = '' }: YouTubeEmbedProps) {
  const videoId = getYouTubeId(url);
  
  if (!videoId) {
    return (
      <div className={`bg-gray-50 border border-gray-200 rounded-lg p-6 ${className}`}>
        <p className="text-sm text-gray-600">
          YouTube video: <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{url}</a>
        </p>
        {channel && <p className="text-xs text-gray-500 mt-1">Channel: {channel}</p>}
      </div>
    );
  }
  
  return (
    <div className={`aspect-video rounded-lg overflow-hidden ${className}`}>
      <iframe
        width="100%"
        height="100%"
        src={`https://www.youtube-nocookie.com/embed/${videoId}`}
        title="YouTube video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="border-0"
      />
    </div>
  );
}
