// components/MyVideoPlayer.tsx
'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// --- THE FIX ---
// Dynamically import OUR internal wrapper, not the library directly.
// This solves the TypeScript type inference error.
const VideoPlayerInternal = dynamic(() => import('./VideoPlayerInternal'), { ssr: false });

interface MyVideoPlayerProps {
  videoId: string;
}

export default function MyVideoPlayer({ videoId }: MyVideoPlayerProps) {
  const libraryId = process.env.NEXT_PUBLIC_BUNNY_LIBRARY_ID;

  if (!libraryId) {
    console.error('Bunny Library ID is not set.');
    return <div className="player-wrapper"><p>Video Player Error.</p></div>;
  }
  
  const videoUrl = `https://videocdn.play.b-cdn.net/${libraryId}/${videoId}/playlist.m3u8`;

  return (
    <div className="player-wrapper">
      {/* Now we use our internal wrapper */}
      <VideoPlayerInternal
        className="react-player"
        url={videoUrl}
        controls={true}
        width="100%"
        height="100%"
      />
    </div>
  );
}