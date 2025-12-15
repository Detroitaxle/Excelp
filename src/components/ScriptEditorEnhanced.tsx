import React, { useState } from 'react';
import { Code, Info, BookOpen, Copy, Check } from 'lucide-react';

interface ScriptEditorEnhancedProps {
  script: string;
  onScriptChange: (script: string) => void;
}

const ScriptEditorEnhanced: React.FC<ScriptEditorEnhancedProps> = ({ script, onScriptChange }) => {
  const [showTemplates, setShowTemplates] = useState(false);
  const [copied, setCopied] = useState(false);

  const templates = [
    {
      name: 'Basic Filter',
      description: 'Filter rows based on column values',
      code: `# Filter rows where 'Age' column is greater than 30
df = df[df['Age'] > 30]

# Multiple conditions with AND
df = df[(df['Age'] > 30) & (df['Salary'] > 50000)]

# Multiple conditions with OR
df = df[(df['Department'] == 'IT') | (df['Department'] == 'HR')]

df`
    },
    {
      name: 'Add Calculated Column',
      description: 'Create new columns with calculations',
      code: `# Add a new column with calculation
df['Total'] = df['Price'] * df['Quantity']

# Conditional column
df['Category'] = df['Age'].apply(lambda x: 'Senior' if x > 60 else 'Adult' if x > 18 else 'Minor')

# String manipulation
df['Full_Name'] = df['First_Name'] + ' ' + df['Last_Name']

df`
    },
    {
      name: 'Sort and Group',
      description: 'Sort data and perform grouping operations',
      code: `# Sort by column
df = df.sort_values('Date', ascending=False)

# Sort by multiple columns
df = df.sort_values(['Department', 'Salary'], ascending=[True, False])

# Group and aggregate
df = df.groupby('Department').agg({
    'Salary': 'mean',
    'Age': 'median',
    'Employee_ID': 'count'
}).reset_index()

df`
    },
    {
      name: 'Data Cleaning',
      description: 'Clean and transform data',
      code: `# Remove duplicates
df = df.drop_duplicates()

# Fill missing values
df['Salary'].fillna(df['Salary'].mean(), inplace=True)

# Remove rows with missing values
df = df.dropna()

# Convert data types
df['Date'] = pd.to_datetime(df['Date'])
df['Salary'] = df['Salary'].astype(float)

# Rename columns
df = df.rename(columns={'Old_Name': 'New_Name'})

df`
    },
    {
      name: 'Statistical Analysis',
      description: 'Perform statistical operations',
      code: `# Add statistical columns
df['Salary_Zscore'] = (df['Salary'] - df['Salary'].mean()) / df['Salary'].std()
df['Salary_Percentile'] = df['Salary'].rank(pct=True) * 100

# Add rolling average (for time series)
df = df.sort_values('Date')
df['Moving_Avg_7d'] = df['Value'].rolling(window=7).mean()

# Identify outliers
Q1 = df['Salary'].quantile(0.25)
Q3 = df['Salary'].quantile(0.75)
IQR = Q3 - Q1
df['Is_Outlier'] = ((df['Salary'] < Q1 - 1.5 * IQR) | (df['Salary'] > Q3 + 1.5 * IQR))

df`
    },
    {
      name: 'Pivot and Reshape',
      description: 'Reshape data structure',
      code: `# Pivot table
df = df.pivot_table(
    values='Sales',
    index='Region',
    columns='Quarter',
    aggfunc='sum',
    fill_value=0
).reset_index()

# Melt (unpivot)
df = df.melt(
    id_vars=['ID', 'Name'],
    value_vars=['Q1', 'Q2', 'Q3', 'Q4'],
    var_name='Quarter',
    value_name='Sales'
)

df`
    }
  ];

  const handleTemplateSelect = (templateCode: string) => {
    onScriptChange(templateCode);
    setShowTemplates(false);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(script);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Code className="h-5 w-5 text-blue-500" />
          <h3 className="text-lg font-medium text-gray-900">Python Script</h3>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleCopy}
            className="flex items-center space-x-1 px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            <span>{copied ? 'Copied!' : 'Copy'}</span>
          </button>
          <button
            onClick={() => setShowTemplates(!showTemplates)}
            className="flex items-center space-x-1 px-3 py-1.5 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
          >
            <BookOpen className="h-4 w-4" />
            <span>Templates</span>
          </button>
        </div>
      </div>
      
      {showTemplates && (
        <div className="bg-white border border-gray-200 rounded-lg p-4 max-h-96 overflow-y-auto">
          <h4 className="font-medium text-gray-900 mb-3">Script Templates</h4>
          <div className="space-y-2">
            {templates.map((template, index) => (
              <button
                key={index}
                onClick={() => handleTemplateSelect(template.code)}
                className="w-full text-left p-3 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
              >
                <div className="font-medium text-gray-900">{template.name}</div>
                <div className="text-sm text-gray-600 mt-1">{template.description}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-2">
          <Info className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-blue-800">
            <p className="font-medium mb-1">Script Guidelines:</p>
            <ul className="space-y-1 text-xs">
              <li>• The Excel data is loaded as a pandas DataFrame named 'df'</li>
              <li>• Your script must return 'df' at the end</li>
              <li>• Common operations: filtering, sorting, calculations, new columns</li>
              <li>• Use standard pandas methods and Python syntax</li>
              <li>• Import statements are automatically included (pandas, numpy)</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="relative">
        <textarea
          value={script}
          onChange={(e) => onScriptChange(e.target.value)}
          placeholder={`# Your Python script will process the Excel data
# The DataFrame is available as 'df'
# Example: df = df[df['column_name'] > 100]
# Make sure to return df at the end

df`}
          className="w-full h-64 p-4 border border-gray-300 rounded-lg font-mono text-sm bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors resize-none"
          spellCheck={false}
        />
        <div className="absolute bottom-2 right-2 text-xs text-gray-400">
          {script.split('\n').length} lines
        </div>
      </div>
    </div>
  );
};

export default ScriptEditorEnhanced;
