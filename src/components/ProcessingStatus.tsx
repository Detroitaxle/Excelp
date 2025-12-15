import React from 'react';
import { Loader2, CheckCircle, XCircle, Download } from 'lucide-react';

interface ProcessingStatusProps {
  status: 'idle' | 'processing' | 'success' | 'error';
  error?: string;
  onDownload?: () => void;
  onReset?: () => void;
}

const ProcessingStatus: React.FC<ProcessingStatusProps> = ({ 
  status, 
  error, 
  onDownload, 
  onReset 
}) => {
  if (status === 'idle') return null;

  return (
    <div className="space-y-4">
      {status === 'processing' && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-center space-x-3">
            <Loader2 className="h-6 w-6 text-blue-500 animate-spin" />
            <div>
              <p className="text-blue-900 font-medium">Processing your file...</p>
              <p className="text-blue-700 text-sm">Executing Python script on Excel data</p>
            </div>
          </div>
        </div>
      )}

      {status === 'success' && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-6 w-6 text-green-500" />
              <div>
                <p className="text-green-900 font-medium">Processing completed successfully!</p>
                <p className="text-green-700 text-sm">Your modified Excel file is ready for download</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={onDownload}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center space-x-2 transition-colors"
              >
                <Download className="h-4 w-4" />
                <span>Download</span>
              </button>
              <button
                onClick={onReset}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Process Another
              </button>
            </div>
          </div>
        </div>
      )}

      {status === 'error' && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="flex items-start space-x-3">
            <XCircle className="h-6 w-6 text-red-500 mt-0.5" />
            <div className="flex-1">
              <p className="text-red-900 font-medium">Processing failed</p>
              <p className="text-red-700 text-sm mt-1">{error || 'An unexpected error occurred'}</p>
              <button
                onClick={onReset}
                className="mt-3 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProcessingStatus;