import React, { useState } from 'react';
import { ChevronDownIcon } from './icons';

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-slate-200 dark:border-slate-700">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left py-5 px-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded-md"
      >
        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">{title}</h3>
        <ChevronDownIcon
          className={`w-6 h-6 text-slate-500 dark:text-slate-400 transform transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <div className="p-6 pt-0 text-slate-600 dark:text-slate-300 leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AccordionItem;