'use client';

import React from 'react';
import { Wifi, WifiOff } from 'lucide-react';
import { useYjs } from '@/src/hooks';

export const ConnectionStatus = () => {
  const { isConnected } = useYjs();

  return (
    <div
      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium ${
        isConnected
          ? 'bg-green-50 text-green-700'
          : 'bg-red-50 text-red-700'
      }`}
    >
      {isConnected ? (
        <>
          <Wifi className="w-4 h-4" />
          <span>Connected</span>
        </>
      ) : (
        <>
          <WifiOff className="w-4 h-4" />
          <span>Disconnected</span>
        </>
      )}
    </div>
  );
};
