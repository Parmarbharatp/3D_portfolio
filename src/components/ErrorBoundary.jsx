import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#915EFF] to-[#804dee] rounded-lg p-4">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center mb-4">
              <span className="text-[#915EFF] text-xl font-bold">!</span>
            </div>
            <h3 className="text-white text-lg font-semibold mb-2">Something went wrong</h3>
            <p className="text-gray-200 text-sm mb-4">The 3D component encountered an error</p>
            <button
              onClick={() => this.setState({ hasError: false, error: null, errorInfo: null })}
              className="bg-white text-[#915EFF] px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
