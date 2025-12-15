import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FileUpload from '../components/FileUpload';
import ScriptEditorEnhanced from '../components/ScriptEditorEnhanced';
import ProcessingStatus from '../components/ProcessingStatus';
import DataPreview from '../components/DataPreview';
import { Play, History, Trash2 } from 'lucide-react';

interface ProcessingHistory {
  id: string;
  fileName: string;
  timestamp: number;
  status: 'success' | 'error';
}

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [script, setScript] = useState('');
  const [processingStatus, setProcessingStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string>('');
  const [processedData, setProcessedData] = useState<Blob | null>(null);
  const [history, setHistory] = useState<ProcessingHistory[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  // Load history from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem('processingHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Save history to localStorage
  const addToHistory = (fileName: string, status: 'success' | 'error') => {
    const newEntry: ProcessingHistory = {
      id: Date.now().toString(),
      fileName,
      timestamp: Date.now(),
      status
    };
    const updatedHistory = [newEntry, ...history].slice(0, 10); // Keep last 10
    setHistory(updatedHistory);
    localStorage.setItem('processingHistory', JSON.stringify(updatedHistory));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('processingHistory');
    toast.success('History cleared');
  };

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setProcessingStatus('idle');
    setError('');
    toast.success('File uploaded successfully!');
  };

  const handleFileRemove = () => {
    setSelectedFile(null);
    setProcessingStatus('idle');
    setError('');
  };

  const validateScript = (script: string): string | null => {
    if (!script.trim()) {
      return 'Script cannot be empty';
    }
    
    if (!script.includes('df')) {
      return 'Script must reference the DataFrame variable "df"';
    }
    
    // Check for dangerous operations (basic security)
    const dangerousPatterns = ['import os', 'import sys', 'open(', '__import__', 'eval(', 'exec('];
    for (const pattern of dangerousPatterns) {
      if (script.toLowerCase().includes(pattern)) {
        return `Potentially dangerous operation detected: "${pattern}" is not allowed`;
      }
    }
    
    return null;
  };

  const handleProcess = async () => {
    if (!selectedFile || !script.trim()) {
      toast.error('Please upload a file and provide a Python script');
      return;
    }

    // Validate script
    const validationError = validateScript(script);
    if (validationError) {
      setError(validationError);
      setProcessingStatus('error');
      toast.error(validationError);
      addToHistory(selectedFile.name, 'error');
      return;
    }

    setProcessingStatus('processing');
    setError('');

    try {
      // Create FormData for API call
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('script', script);

      // Call the Vercel serverless function
      const response = await fetch('/api/process', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Processing failed');
      }

      const blob = await response.blob();
      setProcessedData(blob);
      setProcessingStatus('success');
      toast.success('File processed successfully!');
      addToHistory(selectedFile.name, 'success');
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to process the file. Please check your script and try again.';
      setError(errorMessage);
      setProcessingStatus('error');
      toast.error('Processing failed: ' + errorMessage);
      addToHistory(selectedFile.name, 'error');
    }
  };

  const handleDownload = () => {
    if (!processedData || !selectedFile) return;

    const url = URL.createObjectURL(processedData);
    const a = document.createElement('a');
    a.href = url;
    a.download = `processed_${selectedFile.name}`;
    document.body.appendChild(a);
    a.click({selectedFile && (
              <section>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Preview Data</h3>
                <DataPreview file={selectedFile} />
              </section>
            )}

            <section>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">2. Write Python Script</h3>
              <ScriptEditorEnhanced);
    
    toast.success('Download started!');
  };

  const handleReset = () => {
    setSelectedFile(null);
    setScript('');
    setProcessingStatus('idle');
    setError('');
    setProcessedData(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

            {history.length > 0 && (
              <section>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <History className="h-5 w-5 text-gray-500" />
                    <h3 className="text-xl font-semibold text-gray-900">Recent Activity</h3>
                  </div>
                  <button
                    onClick={() => setShowHistory(!showHistory)}
                    className="text-sm text-blue-600 hover:text-blue-700"
                  >
                    {showHistory ? 'Hide' : 'Show'}
                  </button>
                </div>
                
                {showHistory && (
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="space-y-2 mb-3">
                      {history.map((entry) => (
                        <div key={entry.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                          <div className="flex items-center space-x-3">
                            <div className={`w-2 h-2 rounded-full ${entry.status === 'success' ? 'bg-green-500' : 'bg-red-500'}`} />
                            <span className="text-sm text-gray-700">{entry.fileName}</span>
                          </div>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={clearHistory}
                      className="flex items-center space-x-1 text-sm text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span>Clear History</span>
                    </button>
                  </div>
                )}
              </section>
            )}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Process Excel Files with Python
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Upload your Excel file, write a Python script to transform the data, 
              and download the processed results. Perfect for data analysis and automation.
            </p>
          </div>

          <div className="space-y-8">
            <section>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">1. Upload Excel File</h3>
              <FileUpload
                onFileSelect={handleFileSelect}
                selectedFile={selectedFile}
                onFileRemove={handleFileRemove}
              />
            </section>

            <section>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">2. Write Python Script</h3>
              <ScriptEditor
                script={script}
                onScriptChange={setScript}
              />
            </section>

            <section>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">3. Process & Download</h3>
                <button
                  onClick={handleProcess}
                  disabled={!selectedFile || !script.trim() || processingStatus === 'processing'}
                  className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-6 py-2 rounded-md font-medium flex items-center space-x-2 transition-colors"
                >
                  <Play className="h-4 w-4" />
                  <span>Process File</span>
                </button>
              </div>
              
              <ProcessingStatus
                status={processingStatus}
                error={error}
                onDownload={handleDownload}
                onReset={handleReset}
              />
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}