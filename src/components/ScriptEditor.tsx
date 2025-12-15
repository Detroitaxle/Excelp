import React from 'react';
import { Code, Info } from 'lucide-react';

interface ScriptEditorProps {
  script: string;
  onScriptChange: (script: string) => void;
}

const ScriptEditor: React.FC<ScriptEditorProps> = ({ script, onScriptChange }) => {
  const defaultScript = `# Your Python script will process the Excel data
# The DataFrame is available as 'df'
# Example operations:

# Filter rows
# df = df[df['column_name'] > 100]

# Add new column
# df['new_column'] = df['existing_column'] * 2

# Sort data
# df = df.sort_values('column_name')

# Return the modified DataFrame
df`;

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Code className="h-5 w-5 text-blue-500" />
        <h3 className="text-lg font-medium text-gray-900">Python Script</h3>
      </div>
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-2">
          <Info className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-blue-800">
            <p className="font-medium mb-1">Script Guidelines:</p>
            <ul className="space-y-1 text-xs">
              <li>• The Excel data is loaded as a pandas DataFrame named 'df'</li>
              <li>• Your script should modify 'df' and return it</li>
              <li>• Common operations: filtering, sorting, calculations, new columns</li>
              <li>• Use standard pandas methods and Python syntax</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="relative">
        <textarea
          value={script}
          onChange={(e) => onScriptChange(e.target.value)}
          placeholder={defaultScript}
          className="w-full h-64 p-4 border border-gray-300 rounded-lg font-mono text-sm bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors resize-none"
          spellCheck={false}
        />
      </div>
    </div>
  );
};

export default ScriptEditor;