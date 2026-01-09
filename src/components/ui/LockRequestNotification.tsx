'use client';

import React from 'react';
import { AlertCircle } from 'lucide-react';
import { useYjs } from '@/src/hooks';

export const LockRequestNotification = () => {
  const { lockRequests } = useYjs();

  if (lockRequests.length === 0) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
      {lockRequests.map((request) => {
        const requestId = `${request.requesterId}-${request.fieldId}-${request.timestamp}`;
        return (
          <div
            key={requestId}
            className="bg-white rounded-lg shadow-lg border-2 border-orange-200 p-4 animate-slide-in"
          >
            <div className="flex items-start gap-3">
              <div className="shrink-0">
                <AlertCircle className="w-5 h-5 text-orange-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">
                  Field Release Request
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  <span className="font-semibold">{request.requesterName}</span>{' '}
                  wants to edit <span className="font-semibold">{request.fieldId}</span>
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
