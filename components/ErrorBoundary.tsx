import React, { Component, ErrorInfo, ReactNode } from 'react';
import { en, bn } from '../i18n/translations';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

const translations = { en, bn };

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      // Simple language detection fallback
      const lang = document.documentElement.lang === 'bn' ? 'bn' : 'en';
      const t = (key: keyof typeof en): string => {
        const dict = translations[lang] as Record<string, string>;
        const fallback = translations['en'] as Record<string, string>;
        // Ensure key is treated as string. keyof typeof en should be string literal union.
        const k = key as string;
        return dict[k] || fallback[k] || k;
      };
      
      return (
        <div className="container mx-auto px-6 py-16 text-center">
          <h1 className="text-4xl font-bold text-red-600 dark:text-red-400">{t('errorBoundary.title')}</h1>
          <p className="text-lg text-slate-800 dark:text-slate-200 mt-4">{t('errorBoundary.subtitle')}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-8 bg-orange-500 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-orange-600 transition-colors"
          >
            {t('errorBoundary.button')}
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;