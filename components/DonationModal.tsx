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
          ? 'bg-white text-orange-600'
          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4 transition-opacity duration-300" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <div className="p-6 relative">
          <h2 className="text-2xl font-bold text-slate-800 text-center">Support Our Cause</h2>
          <p className="text-center text-slate-600 mt-1 mb-6">Your contribution makes a huge difference!</p>
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-3xl font-light">&times;</button>
          
          <div className="flex">
            <TabButton tabName="mfs">MFS (bKash/Nagad)</TabButton>
            <TabButton tabName="bank">Bank Transfer</TabButton>
          </div>

          <div className="p-6 border-x border-b border-slate-200 rounded-b-lg">
            {activeTab === 'mfs' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-slate-700 flex items-center mb-2"><BKashIcon className="w-20 h-auto mr-3" /> bKash</h3>
                  <p className="text-sm text-slate-600">Send donation via our Merchant Account:</p>
                  <p className="font-mono bg-slate-100 p-2 rounded-md text-center text-lg mt-2 text-slate-800 tracking-widest">01234567890</p>
                  <p className="text-xs text-slate-500 mt-2">Steps: Open bKash App → Select 'Payment' → Enter Number & Amount → Use 'Donation' as reference.</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-700 flex items-center mb-2"><NagadIcon className="w-20 h-auto mr-3" /> Nagad</h3>
                  <p className="text-sm text-slate-600">Send donation via our Merchant Account:</p>
                  <p className="font-mono bg-slate-100 p-2 rounded-md text-center text-lg mt-2 text-slate-800 tracking-widest">01234567890</p>
                </div>
              </div>
            )}

            {activeTab === 'bank' && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-slate-700 mb-3">Bank Account Details</h3>
                <div className="text-sm">
                  <strong className="text-slate-600 block">Account Name:</strong>
                  <span className="text-slate-800">KUTTAWAALA Foundation</span>
                </div>
                <div className="text-sm">
                  <strong className="text-slate-600 block">Account Number:</strong>
                  <span className="text-slate-800">1234567890123</span>
                </div>
                <div className="text-sm">
                  <strong className="text-slate-600 block">Bank Name:</strong>
                  <span className="text-slate-800">The Bank of Asia</span>
                </div>
                 <div className="text-sm">
                  <strong className="text-slate-600 block">Branch:</strong>
                  <span className="text-slate-800">Gulshan Avenue</span>
                </div>
                 <div className="text-sm">
                  <strong className="text-slate-600 block">SWIFT Code:</strong>
                  <span className="text-slate-800">BOASBDDH</span>
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
