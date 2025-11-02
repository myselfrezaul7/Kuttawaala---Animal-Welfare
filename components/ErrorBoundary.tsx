import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  // FIX: Replaced constructor with class property for state initialization.
  // The existing constructor was causing TypeScript errors, suggesting a potential
  // toolchain or configuration issue. Using a class property is a more modern
  // and direct way to initialize state, which should resolve these type errors.
  state: State = {
    hasError: false
  };

  static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can also log the error to an error reporting service
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="container mx-auto px-6 py-16 text-center">
          <h1 className="text-4xl font-bold text-red-600 dark:text-red-400">Oops! Something went wrong.</h1>
          <p className="text-lg text-slate-800 dark:text-slate-200 mt-4">We're sorry for the inconvenience. Please try refreshing the page.</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-8 bg-orange-500 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-orange-600 transition-colors"
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
