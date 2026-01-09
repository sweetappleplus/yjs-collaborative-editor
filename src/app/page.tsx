import { YjsProvider } from '@/src/providers/YjsProvider';
import { CollaborativeForm } from '@/src/components/editor';
import { ActiveUsers, LockRequestNotification } from '@/src/components/ui';
import { Header, Footer } from '@/src/components/layout';

function EditorContent() {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50">
      <LockRequestNotification />
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <CollaborativeForm />
          </div>

          <div className="lg:col-span-1">
            <ActiveUsers />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function Home() {
  return (
    <YjsProvider>
      <EditorContent />
    </YjsProvider>
  );
}
