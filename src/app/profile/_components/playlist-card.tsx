'use client';

import React from 'react';
import { UnorderedListOutlined } from '@ant-design/icons';
import { CategoryTile } from '@/app/_components/business';

export interface Playlist {
  id: string;
  title: string;
  thumbnail: string;
  itemCount: number;
  views: number;
  description?: string;
}

export function PlaylistCard({ playlist }: { playlist: Playlist }) {
  return (
    <CategoryTile
      id={playlist.id}
      name={playlist.title}
      count={playlist.itemCount}
      thumbnail={playlist.thumbnail}
      href={`/profile/playlist/${playlist.id}`}
      icon={<UnorderedListOutlined className="text-2xl text-pink-600" />}
      countSuffix="پست"
    />
  );
}

export default PlaylistCard;
