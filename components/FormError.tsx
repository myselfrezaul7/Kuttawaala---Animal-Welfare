import React from 'react';

const WarningIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
    </svg>
);


interface FormErrorProps {
  message: string;
}

const FormError: React.FC<FormErrorProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="bg-red-500/10 border border-red-500/30 text-red-900 dark:text-red-200 p-3 rounded-lg text-center flex items-center justify-center gap-2" role="alert">
      <WarningIcon className="w-5 h-5 flex-shrink-0" />
      <span>{message}</span>
    </div>
  );
};

export default FormError;
