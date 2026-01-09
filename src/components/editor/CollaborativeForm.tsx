import { CollaborativeField } from '@/src/components/editor';
import { FeaturesSection, TestInstructions } from '@/src/components/layout';

export const CollaborativeForm = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Collaborative Form
        </h2>
        <p className="text-sm text-gray-600">
          Edit the fields below. Changes are synchronized in real-time across
          all connected users. Fields are locked when another user is editing
          them.
        </p>
      </div>

      <div className="space-y-6">
        <CollaborativeField
          id="field-1"
          label="Field 1"
          placeholder="Enter text for field 1..."
        />
        <CollaborativeField
          id="field-2"
          label="Field 2"
          placeholder="Enter text for field 2..."
        />
      </div>

      <FeaturesSection />
      <TestInstructions />
    </div>
  );
};
