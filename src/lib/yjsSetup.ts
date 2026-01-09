import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';

export const ydoc = new Y.Doc();

export function createWebSocketProvider(roomName: string): WebsocketProvider {
  const provider = new WebsocketProvider(
    'wss://demos.yjs.dev/ws',
    roomName,
    ydoc,
    {
      connect: true,
    }
  );

  return provider;
}

export function getYText(fieldId: string): Y.Text {
  return ydoc.getText(fieldId);
}

export function getYMap(mapId: string): Y.Map<unknown> {
  return ydoc.getMap(mapId);
}

export function createUndoManager(ytext: Y.Text): Y.UndoManager {
  return new Y.UndoManager(ytext, {
    trackedOrigins: new Set([null]),
  });
}
