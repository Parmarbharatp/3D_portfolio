import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "./index.css";

// Error boundary for React errors
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('React error caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          width: '100vw',
          height: '100vh',
          backgroundColor: '#050816',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          textAlign: 'center'
        }}>
          <div>
            <h1>Something went wrong</h1>
            <button 
              onClick={() => window.location.reload()} 
              style={{
                backgroundColor: '#915EFF',
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                marginTop: '20px'
              }}
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

// Mobile-specific optimizations
const initializeMobileOptimizations = () => {
  // Check if device is mobile
  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  
  if (isMobile) {
    // Reduce memory usage on mobile
    if (window.performance && window.performance.memory) {
      console.log('Mobile device detected - applying optimizations');
    }
    
    // Preload critical tech images
    const criticalImages = [
      '/src/assets/tech/html.png',
      '/src/assets/tech/css.png',
      '/src/assets/tech/javascript.png',
      '/src/assets/tech/typescript.png'
    ];
    
    criticalImages.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    });
  }
};

// Initialize mobile optimizations
initializeMobileOptimizations();

// Register service worker for caching
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
