export enum WebSocketStatus {
  CONNECTED = 'connected',
  DISCONNECTED = 'disconnected',
  CONNECTING = 'connecting',
}

export enum YMapKeys {
  LOCK_REQUESTS = 'lockRequests',
}

export interface UserAwareness {
  user: {
    id: string;
    name: string;
    color: string;
  };
  editing?: {
    fieldId: string;
    timestamp: number;
  };
  cursor?: {
    fieldId: string;
    position: number;
  };
}

export interface FieldLockRequest {
  requesterId: string;
  requesterName: string;
  fieldId: string;
  timestamp: number;
}

export interface CollaborativeFieldProps {
  id: string;
  label: string;
  placeholder?: string;
}

export interface UserInfo {
  id: string;
  name: string;
  color: string;
  isEditing: boolean;
  editingField?: string;
}
