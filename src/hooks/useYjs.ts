'use client';

import { createContext, useContext } from 'react';
import { WebsocketProvider } from 'y-websocket';
import * as awarenessProtocol from 'y-protocols/awareness';
import { UserAwareness, FieldLockRequest } from '@/src/types';

export interface YjsContextValue {
  provider: WebsocketProvider | null;
  awareness: awarenessProtocol.Awareness | null;
  currentUser: UserAwareness['user'] | null;
  connectedUsers: Map<number, UserAwareness>;
  isConnected: boolean;
  setEditingField: (fieldId: string | null) => void;
  requestFieldRelease: (fieldId: string) => void;
  lockRequests: FieldLockRequest[];
  dismissLockRequest: (requestId: string) => void;
}

export const YjsContext = createContext<YjsContextValue | null>(null);

export function useYjs() {
  const context = useContext(YjsContext);
  if (!context) {
    throw new Error('useYjs must be used within YjsProvider');
  }
  return context;
}
