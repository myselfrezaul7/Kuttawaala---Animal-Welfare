import React, { useState, useEffect, useRef } from 'react';
import { CloseIcon, BKashIcon, NagadIcon } from './icons';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DonationModal: React.FC<DonationModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'mfs' | 'bank' | 'medicine'>('mfs');
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Focus trapping and Escape key handling for accessibility
  useEffect(() => {
    if (isOpen) {
      const focusableElements = modalRef.current?.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusableElements || focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      // Focus the first element (the close button) when the modal opens
      closeButtonRef.current?.focus();

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            onClose();
            return;
        }

        if (e.key !== 'Tab') return;

        if (e.shiftKey) { // Shift+Tab
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else { // Tab
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      };
      
      document.addEventListener('keydown', handleKeyDown);

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, onClose]);


  if (!isOpen) return null;

  const TabButton: React.FC<{ tabName: 'mfs' | 'bank' | 'medicine'; children: React.ReactNode }> = ({ tabName, children }) => (
    <button
      onClick={() => setActiveTab(tabName)}
      role="tab"
      aria-selected={activeTab === tabName}
      className={`py-2.5 px-4 w-1/3 text-center font-semibold rounded-t-lg transition-colors ${
        activeTab === tabName
          ? 'bg-white/30 dark:bg-black/30 text-orange-700 dark:text-orange-400'
          : 'bg-transparent text-slate-700 dark:text-slate-300 hover:bg-white/20 dark:hover:bg-black/20'
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex justify-center items-center p-4 transition-opacity duration-300" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="donation-modal-title">
      <div ref={modalRef} className="bg-white/30 dark:bg-slate-800/30 backdrop-blur-xl border border-white/30 dark:border-white/10 rounded-2xl shadow-2xl w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <div className="p-6 relative">
          <h2 id="donation-modal-title" className="text-2xl font-bold text-slate-900 dark:text-slate-50 text-center">Support Our Cause</h2>
          <p className="text-center text-slate-800 dark:text-slate-200 mt-1 mb-6">Your contribution makes a huge difference!</p>
          <button ref={closeButtonRef} onClick={onClose} aria-label="Close" className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 text-3xl font-light">&times;</button>
          
          <div className="flex bg-white/20 dark:bg-black/20 rounded-t-lg" role="tablist" aria-label="Donation Methods">
            <TabButton tabName="mfs">Money</TabButton>
            <TabButton tabName="medicine">Medicine</TabButton>
            <TabButton tabName="bank">Bank Transfer</TabButton>
          </div>

          <div className="p-6 bg-white/30 dark:bg-black/30 border-x border-b border-white/30 dark:border-white/10 rounded-b-lg">
            {activeTab === 'mfs' && (
              <div role="tabpanel" aria-labelledby="mfs-tab" className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 flex items-center mb-2"><BKashIcon className="w-20 h-auto mr-3" /> bKash</h3>
                  <p className="text-sm text-slate-700 dark:text-slate-200">Send donation via our Merchant Account:</p>
                  <p className="font-mono bg-white/20 dark:bg-black/20 p-2 rounded-md text-center text-lg mt-2 text-slate-900 dark:text-slate-50 tracking-widest">01234567890</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">Steps: Open bKash App → Select 'Payment' → Enter Number & Amount → Use 'Donation' as reference.</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 flex items-center mb-2"><NagadIcon className="w-20 h-auto mr-3" /> Nagad</h3>
                  <p className="text-sm text-slate-700 dark:text-slate-200">Send donation via our Merchant Account:</p>
                  <p className="font-mono bg-white/20 dark:bg-black/20 p-2 rounded-md text-center text-lg mt-2 text-slate-900 dark:text-slate-50 tracking-widest">01234567890</p>
                </div>
              </div>
            )}
            
            {activeTab === 'medicine' && (
               <div role="tabpanel" aria-labelledby="medicine-tab" className="space-y-4 animate-fadeIn">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">Donate Essential Supplies</h3>
                <p className="text-sm text-slate-700 dark:text-slate-200">
                  Your in-kind donations of medical supplies are crucial. Below is a list of our most needed items.
                </p>
                <ul className="list-disc list-inside text-sm text-slate-700 dark:text-slate-200 space-y-1 bg-white/20 dark:bg-black/20 p-3 rounded-md">
                  <li>Antibiotics (e.g., Doxycycline)</li>
                  <li>Flea & Tick Prevention</li>
                  <li>Deworming Medication</li>
                  <li>Medicated Shampoos & Wipes</li>
                  <li>Gauze, Bandages, and Medical Tape</li>
                </ul>
                <div>
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">Delivery Address:</p>
                  <address className="text-sm bg-white/20 dark:bg-black/20 p-2 rounded-md mt-1 text-slate-900 dark:text-slate-50 not-italic">
                    KUTTAWAALA Shelter<br/>
                    House 123, Road 45, Gulshan 2<br/>
                    Dhaka-1212, Bangladesh
                  </address>
                </div>
                <a 
                  href="mailto:kuttawaala@gmail.com?subject=Medicine%20Donation%20Inquiry"
                  className="block w-full text-center bg-orange-500 text-white font-bold py-2.5 px-4 rounded-lg hover:bg-orange-600 transition-colors"
                >
                  Contact to Coordinate
                </a>
              </div>
            )}

            {activeTab === 'bank' && (
              <div role="tabpanel" aria-labelledby="bank-tab" className="space-y-3">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-3">Bank Account Details</h3>
                <div className="text-sm">
                  <strong className="text-slate-700 dark:text-slate-300 block">Account Name:</strong>
                  <span className="text-slate-900 dark:text-slate-50">KUTTAWAALA Foundation</span>
                </div>
                <div className="text-sm">
                  <strong className="text-slate-700 dark:text-slate-300 block">Account Number:</strong>
                  <span className="text-slate-900 dark:text-slate-50">1234567890123</span>
                </div>
                <div className="text-sm">
                  <strong className="text-slate-700 dark:text-slate-300 block">Bank Name:</strong>
                  <span className="text-slate-900 dark:text-slate-50">The Bank of Asia</span>
                </div>
                 <div className="text-sm">
                  <strong className="text-slate-700 dark:text-slate-300 block">Branch:</strong>
                  <span className="text-slate-900 dark:text-slate-50">Gulshan Avenue</span>
                </div>
                 <div className="text-sm">
                  <strong className="text-slate-700 dark:text-slate-300 block">SWIFT Code:</strong>
                  <span className="text-slate-900 dark:text-slate-50">BOASBDDH</span>
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