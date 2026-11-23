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
      <div className={`border border-gray-300 p-6 ${className}`}>
        <p className="font-mono text-xs mb-2">YouTube video</p>
        <a href={url} target="_blank" rel="noopener noreferrer" className="text-sm border-b border-black hover:bg-black hover:text-white transition-colors">
          {url}
        </a>
        {channel && <p className="font-mono text-xs text-gray-600 mt-1">Channel: {channel}</p>}
      </div>
    );
  }
  
  return (
    <div className={`border border-black ${className}`}>
      <div className="aspect-video">
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
      {channel && (
        <div className="p-2 border-t border-gray-300">
          <p className="font-mono text-xs text-gray-600">Channel: {channel}</p>
        </div>
      )}
    </div>
  );
}
