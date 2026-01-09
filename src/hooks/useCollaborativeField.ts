'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import * as Y from 'yjs';
import { getYText, createUndoManager } from '@/src/lib/yjsSetup';
import { useYjs } from '@/src/hooks';
import { UserAwareness } from '@/src/types';

interface UseCollaborativeFieldOptions {
  fieldId: string;
  onFocus?: () => void;
  onBlur?: () => void;
}

interface UseCollaborativeFieldReturn {
  value: string;
  setValue: (value: string) => void;
  isLocked: boolean;
  lockedBy: UserAwareness['user'] | null;
  handleFocus: () => void;
  handleBlur: () => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  inputRef: React.RefObject<HTMLInputElement | null>;
}

export function useCollaborativeField({
  fieldId,
  onFocus,
  onBlur,
}: UseCollaborativeFieldOptions): UseCollaborativeFieldReturn {
  const { awareness, currentUser, connectedUsers, setEditingField } = useYjs();
  const [value, setValue] = useState('');
  const [isLocked, setIsLocked] = useState(false);
  const [lockedBy, setLockedBy] = useState<UserAwareness['user'] | null>(null);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const ytextRef = useRef<Y.Text | null>(null);
  const undoManagerRef = useRef<Y.UndoManager | null>(null);
  const isLocalChangeRef = useRef(false);

  useEffect(() => {
    const ytext = getYText(fieldId);
    ytextRef.current = ytext;

    const undoManager = createUndoManager(ytext);
    undoManagerRef.current = undoManager;

    setValue(ytext.toString());

    const handleYTextChange = () => {
      if (!isLocalChangeRef.current) {
        setValue(ytext.toString());
      }
      isLocalChangeRef.current = false;

      setCanUndo(undoManager.canUndo());
      setCanRedo(undoManager.canRedo());
    };

    ytext.observe(handleYTextChange);

    const handleStackItemAdded = () => {
      setCanUndo(undoManager.canUndo());
      setCanRedo(undoManager.canRedo());
    };

    const handleStackItemPopped = () => {
      setCanUndo(undoManager.canUndo());
      setCanRedo(undoManager.canRedo());
    };

    undoManager.on('stack-item-added', handleStackItemAdded);
    undoManager.on('stack-item-popped', handleStackItemPopped);

    return () => {
      ytext.unobserve(handleYTextChange);
      undoManager.off('stack-item-added', handleStackItemAdded);
      undoManager.off('stack-item-popped', handleStackItemPopped);
    };
  }, [fieldId]);

  useEffect(() => {
    let locked = false;
    let lockingUser: UserAwareness['user'] | null = null;

    connectedUsers.forEach((userState) => {
      if (userState.editing?.fieldId === fieldId) {
        locked = true;
        lockingUser = userState.user;
      }
    });

    setIsLocked(locked);
    setLockedBy(lockingUser);
  }, [connectedUsers, fieldId]);

  const handleFocus = useCallback(() => {
    if (!isLocked) {
      setEditingField(fieldId);
      onFocus?.();
    }
  }, [fieldId, isLocked, setEditingField, onFocus]);

  const handleBlur = useCallback(() => {
    setEditingField(null);
    onBlur?.();
  }, [setEditingField, onBlur]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (isLocked) return;

      const newValue = e.target.value;
      const ytext = ytextRef.current;

      if (!ytext) return;

      isLocalChangeRef.current = true;

      const oldValue = ytext.toString();
      
      ytext.delete(0, oldValue.length);
      ytext.insert(0, newValue);

      setValue(newValue);
    },
    [isLocked]
  );

  const undo = useCallback(() => {
    if (undoManagerRef.current && undoManagerRef.current.canUndo()) {
      undoManagerRef.current.undo();
    }
  }, []);

  const redo = useCallback(() => {
    if (undoManagerRef.current && undoManagerRef.current.canRedo()) {
      undoManagerRef.current.redo();
    }
  }, []);

  return {
    value,
    setValue,
    isLocked,
    lockedBy,
    handleFocus,
    handleBlur,
    handleChange,
    undo,
    redo,
    canUndo,
    canRedo,
    inputRef,
  };
}
