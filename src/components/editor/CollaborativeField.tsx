'use client';

import React, { useState } from 'react';
import { Undo2, Redo2, Lock, Bell } from 'lucide-react';
import { useCollaborativeField, useYjs } from '@/src/hooks';
import { cn } from '@/src/utils';
import { CollaborativeFieldProps } from '@/src/types';

export const CollaborativeField = ({ id, label, placeholder }: CollaborativeFieldProps) => {
  const { requestFieldRelease } = useYjs();
  const [isFocused, setIsFocused] = useState(false);

  const {
    value,
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
  } = useCollaborativeField({
    fieldId: id,
    onFocus: () => setIsFocused(true),
    onBlur: () => setIsFocused(false),
  });

  const handleRequestRelease = () => {
    if (lockedBy) {
      requestFieldRelease(id);
    }
  };

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>

      <div className="relative">
        <div className="relative">
          <input
            ref={inputRef}
            id={id}
            type="text"
            value={value}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={placeholder}
            disabled={isLocked}
            className={cn(
              'w-full px-4 py-3 rounded-lg border-2 transition-all duration-200',
              'focus:outline-none focus:ring-0',
              isLocked
                ? 'bg-gray-50 text-gray-500 cursor-not-allowed border-gray-300'
                : isFocused
                ? 'border-blue-500 bg-white text-gray-900'
                : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400',
              isLocked && lockedBy && `outline-4 outline-offset-2`,
            )}
            style={
              isLocked && lockedBy
                ? {
                    outlineColor: `${lockedBy.color}40`,
                    borderColor: lockedBy.color,
                  }
                : undefined
            }
          />

          {isLocked && lockedBy && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
              <Lock className="w-4 h-4 text-gray-400" />
            </div>
          )}
        </div>

        {isLocked && lockedBy && (
          <div
            className="absolute -top-8 left-0 px-2 py-1 rounded text-xs text-white font-medium shadow-lg z-10"
            style={{ backgroundColor: lockedBy.color }}
          >
            {lockedBy.name} is editing
          </div>
        )}
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          <button
            onClick={undo}
            disabled={!canUndo || isLocked}
            className={cn(
              'p-2 rounded-md transition-colors',
              canUndo && !isLocked
                ? 'hover:bg-gray-100 text-gray-700'
                : 'text-gray-300 cursor-not-allowed'
            )}
            title="Undo (Ctrl+Z)"
          >
            <Undo2 className="w-4 h-4" />
          </button>
          <button
            onClick={redo}
            disabled={!canRedo || isLocked}
            className={cn(
              'p-2 rounded-md transition-colors',
              canRedo && !isLocked
                ? 'hover:bg-gray-100 text-gray-700'
                : 'text-gray-300 cursor-not-allowed'
            )}
            title="Redo (Ctrl+Y)"
          >
            <Redo2 className="w-4 h-4" />
          </button>
        </div>

        {isLocked && lockedBy && (
          <button
            onClick={handleRequestRelease}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md bg-orange-50 hover:bg-orange-100 text-orange-700 transition-colors"
            title="Request field release"
          >
            <Bell className="w-3.5 h-3.5" />
            Request Release
          </button>
        )}
      </div>
    </div>
  );
};
