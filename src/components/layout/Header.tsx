import { FileEdit } from 'lucide-react';
import { ConnectionStatus } from '@/src/components/ui';

export const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <FileEdit className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Yjs Collaborative Editor
              </h1>
              <p className="text-sm text-gray-500">
                Real-time collaborative form editing
              </p>
            </div>
          </div>
          <ConnectionStatus />
        </div>
      </div>
    </header>
  );
};
