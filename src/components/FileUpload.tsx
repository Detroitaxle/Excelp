import React, { useCallback, useState } from 'react';
import { Upload, File, X, AlertCircle } from 'lucide-react';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  selectedFile: File | null;
  onFileRemove: () => void;
}

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect, selectedFile, onFileRemove }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState<string>('');

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const validateAndSelectFile = useCallback((file: File) => {
    setError('');
    
    // Check file type
    const isExcel = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
                    file.type === 'application/vnd.ms-excel' ||
                    file.name.endsWith('.xlsx') ||
                    file.name.endsWith('.xls');
    
    if (!isExcel) {
      setError('Please upload a valid Excel file (.xlsx or .xls)');
      return;
    }
    
    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      setError(`File size exceeds 50MB limit. Your file is ${(file.size / 1024 / 1024).toFixed(2)}MB`);
      return;
    }
    
    // Check file size minimum
    if (file.size < 100) {
      setError('File appears to be empty or corrupted');
      return;
    }
    
    onFileSelect(file);
  }, [onFileSelect]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    const excelFile = files[0];
    
    if (excelFile) {
      validateAndSelectFile(excelFile);
    }
  }, [validateAndSelectFile]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      validateAndSelectFile(file);
    }
  }, [validateAndSelectFile]);

  if (selectedFile) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <File className="h-8 w-8 text-green-500" />
            <div>
              <p className="text-sm font-medium text-green-900">{selectedFile.name}</p>
              <p className="text-xs text-green-700">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
          </div>
          <button
            onClick={onFileRemove}
            className="p-1 hover:bg-green-100 rounded-full transition-colors"
            aria-label="Remove file"
          >
            <X className="h-5 w-5 text-green-600" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          isDragOver
            ? 'border-blue-400 bg-blue-50'
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <div className="space-y-2">
          <p className="text-lg font-medium text-gray-900">Upload Excel File</p>
          <p className="text-sm text-gray-500">Drag and drop your .xlsx or .xls file here, or click to browse</p>
          <p className="text-xs text-gray-400">Maximum file size: 50MB</p>
        </div>
        <label className="mt-4 inline-block">
          <input
            type="file"
            accept=".xlsx,.xls"
            onChange={handleFileInput}
            className="sr-only"
          />
          <span className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium cursor-pointer transition-colors">
            Choose File
          </span>
        </label>
      </div>
      
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start space-x-2">
          <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}
    </div>
  );
};

export default FileUpload;