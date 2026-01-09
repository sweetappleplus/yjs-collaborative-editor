'use client';

import React from 'react';
import { Users, Circle } from 'lucide-react';
import { useYjs } from '@/src/hooks';
import { UserInfo } from '@/src/types';

export const ActiveUsers = () => {
  const { currentUser, connectedUsers } = useYjs();

  const users: UserInfo[] = [];

  if (currentUser) {
    users.push({
      id: currentUser.id,
      name: currentUser.name,
      color: currentUser.color,
      isEditing: false,
      editingField: undefined,
    });
  }

  connectedUsers.forEach((userState) => {
    users.push({
      id: userState.user.id,
      name: userState.user.name,
      color: userState.user.color,
      isEditing: !!userState.editing,
      editingField: userState.editing?.fieldId,
    });
  });

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-2 mb-4">
        <Users className="w-5 h-5 text-gray-700" />
        <h2 className="text-lg font-semibold text-gray-900">Active Users</h2>
        <span className="ml-auto text-sm text-gray-500">
          {users.length} {users.length === 1 ? 'user' : 'users'}
        </span>
      </div>


      <div className="space-y-3">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold text-sm"
              style={{ backgroundColor: user.color }}
            >
              {user.name.charAt(0).toUpperCase()}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user.name}
                </p>
                {user.id === currentUser?.id && (
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                    You
                  </span>
                )}
              </div>
              {user.isEditing && user.editingField && (
                <div className="flex items-center gap-1 mt-1">
                  <Circle className="w-2 h-2 fill-green-500 text-green-500" />
                  <p className="text-xs text-gray-500">
                    Editing {user.editingField}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
