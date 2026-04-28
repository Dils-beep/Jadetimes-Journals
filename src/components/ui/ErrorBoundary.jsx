import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service
        console.error("Uncaught error:", error, errorInfo);
        this.setState({ errorInfo });
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return (
                <div className="min-h-screen flex items-center justify-center bg-red-50 p-6">
                    <div className="max-w-2xl w-full bg-white rounded-lg shadow-xl p-8 border border-red-200">
                        <h1 className="text-3xl font-bold text-red-600 mb-4">Something went wrong.</h1>
                        <p className="text-gray-700 mb-6">The application encountered an unexpected error.</p>

                        <div className="bg-slate-900 text-slate-50 p-4 rounded overflow-auto text-sm font-mono mb-6 max-h-64">
                            <p className="text-red-300 font-bold mb-2">{this.state.error && this.state.error.toString()}</p>
                            <pre>{this.state.errorInfo && this.state.errorInfo.componentStack}</pre>
                        </div>

                        <button
                            onClick={() => window.location.href = "/"}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded transition-colors"
                        >
                            Go to Home
                        </button>
                        <button
                            onClick={() => window.location.reload()}
                            className="ml-4 border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-2 px-6 rounded transition-colors"
                        >
                            Reload Page
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
