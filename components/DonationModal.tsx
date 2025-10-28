import React, { useState } from 'react';
import { CloseIcon, BKashIcon, NagadIcon } from './icons';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DonationModal: React.FC<DonationModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'mfs' | 'bank'>('mfs');

  if (!isOpen) return null;

  const TabButton: React.FC<{ tabName: 'mfs' | 'bank'; children: React.ReactNode }> = ({ tabName, children }) => (
    <button
      onClick={() => setActiveTab(tabName)}
      className={`py-2 px-4 w-1/2 text-center font-semibold rounded-t-lg transition-colors ${
        activeTab === tabName
          ? 'bg-white dark:bg-slate-700 text-orange-600 dark:text-orange-400'
          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4 transition-opacity duration-300" onClick={onClose}>
      <div className="bg-white dark:bg-slate-700 rounded-2xl shadow-2xl w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <div className="p-6 relative">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 text-center">Support Our Cause</h2>
          <p className="text-center text-slate-600 dark:text-slate-300 mt-1 mb-6">Your contribution makes a huge difference!</p>
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-3xl font-light">&times;</button>
          
          <div className="flex bg-slate-100 dark:bg-slate-800 rounded-t-lg">
            <TabButton tabName="mfs">MFS (bKash/Nagad)</TabButton>
            <TabButton tabName="bank">Bank Transfer</TabButton>
          </div>

          <div className="p-6 border-x border-b border-slate-200 dark:border-slate-600 rounded-b-lg">
            {activeTab === 'mfs' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200 flex items-center mb-2"><BKashIcon className="w-20 h-auto mr-3" /> bKash</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300">Send donation via our Merchant Account:</p>
                  <p className="font-mono bg-slate-100 dark:bg-slate-600 p-2 rounded-md text-center text-lg mt-2 text-slate-800 dark:text-slate-100 tracking-widest">01234567890</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">Steps: Open bKash App → Select 'Payment' → Enter Number & Amount → Use 'Donation' as reference.</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200 flex items-center mb-2"><NagadIcon className="w-20 h-auto mr-3" /> Nagad</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300">Send donation via our Merchant Account:</p>
                  <p className="font-mono bg-slate-100 dark:bg-slate-600 p-2 rounded-md text-center text-lg mt-2 text-slate-800 dark:text-slate-100 tracking-widest">01234567890</p>
                </div>
              </div>
            )}

            {activeTab === 'bank' && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200 mb-3">Bank Account Details</h3>
                <div className="text-sm">
                  <strong className="text-slate-600 dark:text-slate-300 block">Account Name:</strong>
                  <span className="text-slate-800 dark:text-slate-100">KUTTAWAALA Foundation</span>
                </div>
                <div className="text-sm">
                  <strong className="text-slate-600 dark:text-slate-300 block">Account Number:</strong>
                  <span className="text-slate-800 dark:text-slate-100">1234567890123</span>
                </div>
                <div className="text-sm">
                  <strong className="text-slate-600 dark:text-slate-300 block">Bank Name:</strong>
                  <span className="text-slate-800 dark:text-slate-100">The Bank of Asia</span>
                </div>
                 <div className="text-sm">
                  <strong className="text-slate-600 dark:text-slate-300 block">Branch:</strong>
                  <span className="text-slate-800 dark:text-slate-100">Gulshan Avenue</span>
                </div>
                 <div className="text-sm">
                  <strong className="text-slate-600 dark:text-slate-300 block">SWIFT Code:</strong>
                  <span className="text-slate-800 dark:text-slate-100">BOASBDDH</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationModal;