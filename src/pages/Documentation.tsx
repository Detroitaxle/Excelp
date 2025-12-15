import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { BookOpen, Code, FileSpreadsheet, Play, ArrowLeft } from 'lucide-react';

export default function Documentation() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link 
            to="/" 
            className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>

          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="flex items-center space-x-3 mb-6">
              <BookOpen className="h-8 w-8 text-blue-500" />
              <h1 className="text-3xl font-bold text-gray-900">Documentation</h1>
            </div>

            <div className="prose prose-blue max-w-none">
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Getting Started</h2>
              <p className="text-gray-700 mb-4">
                Excel Script Processor allows you to transform and analyze Excel files using Python scripts. 
                Follow these simple steps to process your data:
              </p>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6">
                <div className="flex items-start space-x-3">
                  <FileSpreadsheet className="h-6 w-6 text-blue-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-2">Step 1: Upload Your Excel File</h3>
                    <p className="text-blue-800 text-sm">
                      Drag and drop your .xlsx or .xls file, or click to browse. Files up to 50MB are supported.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 border-l-4 border-green-500 p-4 my-6">
                <div className="flex items-start space-x-3">
                  <Code className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-green-900 mb-2">Step 2: Write Your Python Script</h3>
                    <p className="text-green-800 text-sm mb-2">
                      Use pandas to manipulate your data. The DataFrame is available as 'df'. Use our templates to get started quickly.
                    </p>
                    <pre className="bg-white p-3 rounded text-xs border border-green-200 mt-2">
{`# Example: Filter and sort data
df = df[df['Salary'] > 50000]
df = df.sort_values('Name')
df`}
                    </pre>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 border-l-4 border-purple-500 p-4 my-6">
                <div className="flex items-start space-x-3">
                  <Play className="h-6 w-6 text-purple-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-purple-900 mb-2">Step 3: Process & Download</h3>
                    <p className="text-purple-800 text-sm">
                      Click "Process File" to run your script. Once complete, download the transformed Excel file.
                    </p>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Available Libraries</h2>
              <p className="text-gray-700 mb-4">Your scripts have access to the following Python libraries:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                <li><strong>pandas</strong> - Data manipulation and analysis</li>
                <li><strong>numpy</strong> - Numerical computing</li>
                <li><strong>datetime</strong> - Date and time operations</li>
              </ul>

              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Script Requirements</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                <li>Your script must reference the DataFrame as <code className="bg-gray-100 px-2 py-1 rounded">df</code></li>
                <li>The script must return <code className="bg-gray-100 px-2 py-1 rounded">df</code> at the end</li>
                <li>Maximum execution time: 30 seconds</li>
                <li>Scripts run in a secure, sandboxed environment</li>
              </ul>

              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Common Operations</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Filtering Data</h3>
              <pre className="bg-gray-100 p-4 rounded-lg text-sm mb-4 overflow-x-auto">
{`# Single condition
df = df[df['Age'] > 30]

# Multiple conditions (AND)
df = df[(df['Age'] > 30) & (df['Salary'] > 50000)]

# Multiple conditions (OR)
df = df[(df['City'] == 'NYC') | (df['City'] == 'LA')]`}
              </pre>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Adding Columns</h3>
              <pre className="bg-gray-100 p-4 rounded-lg text-sm mb-4 overflow-x-auto">
{`# Simple calculation
df['Total'] = df['Price'] * df['Quantity']

# Conditional values
df['Status'] = df['Score'].apply(lambda x: 'Pass' if x >= 60 else 'Fail')

# String operations
df['Full_Name'] = df['First_Name'] + ' ' + df['Last_Name']`}
              </pre>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Sorting and Grouping</h3>
              <pre className="bg-gray-100 p-4 rounded-lg text-sm mb-4 overflow-x-auto">
{`# Sort by single column
df = df.sort_values('Date', ascending=False)

# Sort by multiple columns
df = df.sort_values(['Department', 'Salary'], ascending=[True, False])

# Group and aggregate
df = df.groupby('Department')['Salary'].mean().reset_index()`}
              </pre>

              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Security & Limits</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                <li>Maximum file size: 50 MB</li>
                <li>Maximum rows: 100,000</li>
                <li>Scripts execute in isolated containers</li>
                <li>No network access from scripts</li>
                <li>No file system access</li>
              </ul>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-8">
                <h3 className="font-semibold text-yellow-900 mb-2">⚠️ Important Notes</h3>
                <ul className="text-sm text-yellow-800 space-y-1">
                  <li>• Always test your scripts with sample data first</li>
                  <li>• Keep backups of your original files</li>
                  <li>• Sensitive data is processed securely and not stored</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
