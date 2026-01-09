export const FeaturesSection = () => {
  return (
    <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
      <h3 className="text-sm font-semibold text-blue-900 mb-2">Features</h3>
      <ul className="text-sm text-blue-700 space-y-1">
        <li>✓ Real-time synchronization across multiple users</li>
        <li>✓ Field locking when another user is editing</li>
        <li>✓ Visual indicators showing who is editing</li>
        <li>✓ Undo/Redo functionality (Ctrl+Z / Ctrl+Y)</li>
        <li>✓ Request field release from other users</li>
        <li>✓ Different colors for each user</li>
      </ul>
    </div>
  );
}
