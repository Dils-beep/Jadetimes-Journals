import React from 'react';
import { AlertTriangle, Database, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

const WorkInProgress = ({ title = "Module Not Synced", message = "This feature is currently pending integration with the core system." }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] bg-gray-50 px-4 text-center">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-lg w-full border border-gray-100 relative overflow-hidden">
        {/* Abstract Background Element */}
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-yellow-100 rounded-full opacity-50 blur-xl"></div>
        <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-20 h-20 bg-red-100 rounded-full opacity-50 blur-xl"></div>

        <div className="relative z-10 flex flex-col items-center">
            <div className="w-16 h-16 bg-yellow-50 rounded-full flex items-center justify-center mb-6">
                <AlertTriangle className="w-8 h-8 text-yellow-600" />
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
            <div className="flex items-center space-x-2 text-xs font-mono text-gray-500 bg-gray-100 px-3 py-1 rounded-full mb-6">
                <Database className="w-3 h-3" />
                <span>ERR_MODULE_DISCONNECTED</span>
            </div>

            <p className="text-gray-600 mb-8 leading-relaxed">
                {message} <br/>
                The deeper functionality for this section has been decoupled for this review version.
            </p>

            <div className="grid grid-cols-2 gap-4 w-full mb-6">
                 <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg border border-gray-100">
                    <Lock className="w-4 h-4 text-gray-400 mb-2" />
                    <span className="text-xs text-gray-500 font-medium">Secure Access</span>
                 </div>
                 <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg border border-gray-100">
                    <Database className="w-4 h-4 text-gray-400 mb-2" />
                    <span className="text-xs text-gray-500 font-medium">Data Mocked</span>
                 </div>
            </div>

            <Link to="/" className="w-full bg-gray-900 text-white font-medium py-3 rounded-xl hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 duration-200">
                Return to Dashboard
            </Link>
        </div>
      </div>
    </div>
  );
};

export default WorkInProgress;
