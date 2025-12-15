import React, { useEffect, useState } from 'react';
import { Eye, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import * as XLSX from 'xlsx';

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
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const data = e.target?.result;
          if (!data) {
            throw new Error('Failed to read file data');
          }

          // Parse the Excel file
          const workbook = XLSX.read(data, { type: 'array' });
          
          // Get the first sheet
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          
          // Convert to JSON
          const jsonData: any[][] = XLSX.utils.sheet_to_json(worksheet, { 
            header: 1,
            defval: '' 
          });
          
          if (jsonData.length === 0) {
            throw new Error('Excel file appears to be empty');
          }
          
          // Extract headers (first row) and data rows
          const headers = jsonData[0].map((header: any) => String(header || ''));
          const dataRows = jsonData.slice(1).filter(row => row.some(cell => cell !== ''));
          
          const previewData: PreviewData = {
            headers: headers,
            rows: dataRows,
            totalRows: dataRows.length
          };
          
          setPreviewData(previewData);
          setLoading(false);
        } catch (err: any) {
          setError(err.message || 'Failed to parse Excel file. Please ensure it\'s a valid .xlsx or .xls file.');
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
