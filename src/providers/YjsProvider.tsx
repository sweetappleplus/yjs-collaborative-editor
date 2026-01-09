'use client';

import { type FC, ReactNode, useEffect, useState, useCallback } from 'react';
import { WebsocketProvider } from 'y-websocket';
import * as awarenessProtocol from 'y-protocols/awareness';
import { ydoc, createWebSocketProvider } from '@/src/lib/yjsSetup';
import { generateUserId, generateUserName, generateUserColor } from '@/src/utils';
import { UserAwareness, FieldLockRequest, WebSocketStatus, YMapKeys } from '@/src/types';
import { YjsContext, YjsContextValue } from '@/src/hooks';

interface YjsProviderProps {
  children: ReactNode;
  roomName?: string;
}

export const YjsProvider: FC<YjsProviderProps> = ({ children, roomName = 'yjs-collab-editor-room' }) => {
  const [provider, setProvider] = useState<WebsocketProvider | null>(null);
  const [awareness, setAwareness] = useState<awarenessProtocol.Awareness | null>(null);
  const [currentUser, setCurrentUser] = useState<UserAwareness['user'] | null>(null);
  const [connectedUsers, setConnectedUsers] = useState<Map<number, UserAwareness>>(new Map());
  const [isConnected, setIsConnected] = useState(false);
  const [lockRequests, setLockRequests] = useState<FieldLockRequest[]>([]);

  useEffect(() => {
    const wsProvider = createWebSocketProvider(roomName);
    const awarenessInstance = wsProvider.awareness;

    const user: UserAwareness['user'] = {
      id: generateUserId(),
      name: generateUserName(),
      color: generateUserColor(),
    };

    setCurrentUser(user);
    setProvider(wsProvider);
    setAwareness(awarenessInstance);

    awarenessInstance.setLocalState({
      user,
      editing: undefined,
      cursor: undefined,
    } as UserAwareness);

    const handleStatus = ({ status }: { status: string }) => {
      setIsConnected(status === WebSocketStatus.CONNECTED);
    };

    wsProvider.on('status', handleStatus);

    const handleAwarenessChange = () => {
      const states = new Map<number, UserAwareness>();
      awarenessInstance.getStates().forEach((state, clientId) => {
        if (clientId !== awarenessInstance.clientID) {
          states.set(clientId, state as UserAwareness);
        }
      });
      setConnectedUsers(states);
    };

    awarenessInstance.on('change', handleAwarenessChange);

    const lockRequestsMap = ydoc.getMap(YMapKeys.LOCK_REQUESTS);
    const handleLockRequestChange = () => {
      const requests: FieldLockRequest[] = [];
      lockRequestsMap.forEach((value) => {
        const request = value as FieldLockRequest;
        const localState = awarenessInstance.getLocalState() as UserAwareness;
        if (localState?.editing?.fieldId === request.fieldId) {
          requests.push(request);
        }
      });
      setLockRequests(requests);
    };

    lockRequestsMap.observe(handleLockRequestChange);

    return () => {
      wsProvider.off('status', handleStatus);
      awarenessInstance.off('change', handleAwarenessChange);
      lockRequestsMap.unobserve(handleLockRequestChange);
      wsProvider.destroy();
    };
  }, [roomName]);

  const setEditingField = useCallback(
    (fieldId: string | null) => {
      if (!awareness || !currentUser) return;

      const localState = awareness.getLocalState() as UserAwareness;
      awareness.setLocalState({
        ...localState,
        user: currentUser,
        editing: fieldId
          ? {
              fieldId,
              timestamp: Date.now(),
            }
          : undefined,
      } as UserAwareness);
    },
    [awareness, currentUser]
  );

  const requestFieldRelease = useCallback(
    (fieldId: string) => {
      if (!currentUser) return;

      const lockRequestsMap = ydoc.getMap(YMapKeys.LOCK_REQUESTS);
      const requestId = `${currentUser.id}-${fieldId}-${Date.now()}`;

      lockRequestsMap.set(requestId, {
        requesterId: currentUser.id,
        requesterName: currentUser.name,
        fieldId,
        timestamp: Date.now(),
      } as FieldLockRequest);

      setTimeout(() => {
        lockRequestsMap.delete(requestId);
      }, 10000);
    },
    [currentUser]
  );

  const dismissLockRequest = useCallback((requestId: string) => {
    const lockRequestsMap = ydoc.getMap(YMapKeys.LOCK_REQUESTS);
    lockRequestsMap.delete(requestId);
  }, []);

  const value: YjsContextValue = {
    provider,
    awareness,
    currentUser,
    connectedUsers,
    isConnected,
    setEditingField,
    requestFieldRelease,
    lockRequests,
    dismissLockRequest,
  };

  return <YjsContext.Provider value={value}>{children}</YjsContext.Provider>;
};
