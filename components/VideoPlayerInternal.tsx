// components/VideoPlayerInternal.tsx
'use client';

import React from 'react';
import ReactPlayer from 'react-player';

// This component just passes all props through to ReactPlayer
export default function VideoPlayerInternal(props: any) {
  return <ReactPlayer {...props} />;
}