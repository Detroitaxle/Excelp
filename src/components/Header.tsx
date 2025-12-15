import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FileSpreadsheet } from 'lucide-react';

const Header = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <div className="bg-blue-500 p-2 rounded-lg">
              <FileSpreadsheet className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-xl font-semibold text-gray-900">Excel Script Processor</h1>
          </Link>
          <nav className="hidden md:flex space-x-8">
            <Link 
              to="/" 
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/') ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/documentation" 
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/documentation') ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Documentation
            </Link>
            <Link 
              to="/examples" 
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/examples') ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Examples
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;