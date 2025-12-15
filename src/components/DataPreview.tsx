import React, { useEffect, useState } from 'react';
import { Eye, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';

interface DataPreviewProps {
  file: File | null;
}

interface PreviewData {
  headers: string[];
  rows: any[][];
  totalRows: number;
}

const DataPreview: React.FC<DataPreviewProps> = ({ file }) => {
  const [previewData, setPreviewData] = useState<PreviewData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(0);
  const rowsPerPage = 10;

  useEffect(() => {
    if (!file) {
      setPreviewData(null);
      return;
    }

    loadPreview();
  }, [file]);

  const loadPreview = async () => {
    if (!file) return;

    setLoading(true);
    setError('');

    try {
      // For demo purposes, we'll create sample data
      // In production, you'd parse the actual Excel file here
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          // Simulating Excel parsing
          // In production, use libraries like SheetJS (xlsx)
          const sampleData: PreviewData = {
            headers: ['ID', 'Name', 'Email', 'Department', 'Salary', 'Join Date'],
            rows: [
              [1, 'John Doe', 'john@company.com', 'Engineering', 75000, '2023-01-15'],
              [2, 'Jane Smith', 'jane@company.com', 'Marketing', 65000, '2023-02-20'],
              [3, 'Bob Johnson', 'bob@company.com', 'Sales', 70000, '2023-03-10'],
              [4, 'Alice Williams', 'alice@company.com', 'Engineering', 80000, '2023-01-25'],
              [5, 'Charlie Brown', 'charlie@company.com', 'HR', 60000, '2023-04-05'],
              [6, 'Diana Prince', 'diana@company.com', 'Engineering', 85000, '2023-02-15'],
              [7, 'Eve Wilson', 'eve@company.com', 'Marketing', 68000, '2023-03-20'],
              [8, 'Frank Castle', 'frank@company.com', 'Sales', 72000, '2023-01-30'],
              [9, 'Grace Lee', 'grace@company.com', 'Engineering', 78000, '2023-02-10'],
              [10, 'Henry Ford', 'henry@company.com', 'Operations', 65000, '2023-04-01'],
            ],
            totalRows: 10
          };
          
          setPreviewData(sampleData);
          setLoading(false);
        } catch (err) {
          setError('Failed to parse Excel file. Please ensure it\'s a valid .xlsx or .xls file.');
          setLoading(false);
        }
      };

      reader.onerror = () => {
        setError('Failed to read file.');
        setLoading(false);
      };

      reader.readAsArrayBuffer(file);
    } catch (err) {
      setError('An unexpected error occurred while loading the preview.');
      setLoading(false);
    }
  };

  if (!file) return null;

  if (loading) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center space-x-2 text-gray-600">
          <Eye className="h-5 w-5 animate-pulse" />
          <span>Loading data preview...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-start space-x-2">
          <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
          <div className="text-sm text-red-800">{error}</div>
        </div>
      </div>
    );
  }

  if (!previewData) return null;

  const totalPages = Math.ceil(previewData.rows.length / rowsPerPage);
  const startIdx = currentPage * rowsPerPage;
  const endIdx = Math.min(startIdx + rowsPerPage, previewData.rows.length);
  const currentRows = previewData.rows.slice(startIdx, endIdx);

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Eye className="h-5 w-5 text-blue-500" />
          <span className="font-medium text-gray-900">Data Preview</span>
          <span className="text-sm text-gray-500">({previewData.totalRows} rows total)</span>
        </div>
        {totalPages > 1 && (
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
              disabled={currentPage === 0}
              className="p-1 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="text-sm text-gray-600">
              Page {currentPage + 1} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
              disabled={currentPage === totalPages - 1}
              className="p-1 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {previewData.headers.map((header, idx) => (
                <th
                  key={idx}
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentRows.map((row, rowIdx) => (
              <tr key={rowIdx} className="hover:bg-gray-50">
                {row.map((cell, cellIdx) => (
                  <td key={cellIdx} className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataPreview;
