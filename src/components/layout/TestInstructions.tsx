export const TestInstructions = () => {
  return (
    <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
      <h3 className="text-sm font-semibold text-gray-900 mb-2">How to test</h3>
      <ol className="text-sm text-gray-700 space-y-1 list-decimal list-inside">
        <li>Open this page in multiple browser tabs or windows</li>
        <li>Try editing the same field from different tabs</li>
        <li>Notice how fields lock when being edited by others</li>
        <li>Use the "Request Release" button to ask for field access</li>
        <li>Test undo/redo functionality with Ctrl+Z and Ctrl+Y</li>
      </ol>
    </div>
  );
};
