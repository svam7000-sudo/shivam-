import React, { useState } from 'react';
import { 
  X, 
  Settings2, 
  Phone, 
  Check, 
  RotateCcw, 
  ExternalLink, 
  HelpCircle,
  FileCode,
  Globe
} from 'lucide-react';
import { 
  BUSINESS_CONFIG, 
  getActiveWhatsAppNumber, 
  setActiveWhatsAppNumber, 
  resetWhatsAppNumber 
} from '../config';

interface OwnerSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNumberChanged: () => void;
}

export const OwnerSettingsModal: React.FC<OwnerSettingsModalProps> = ({
  isOpen,
  onClose,
  onNumberChanged,
}) => {
  const currentNumber = getActiveWhatsAppNumber();
  const [inputNumber, setInputNumber] = useState(currentNumber);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<'number' | 'github'>('number');

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = inputNumber.replace(/\D/g, '');
    if (clean.length >= 10) {
      setActiveWhatsAppNumber(clean);
      setSavedSuccess(true);
      onNumberChanged();
      setTimeout(() => setSavedSuccess(false), 2000);
    }
  };

  const handleReset = () => {
    resetWhatsAppNumber();
    setInputNumber(BUSINESS_CONFIG.defaultWhatsAppNumber);
    onNumberChanged();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div 
        className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 relative"
        role="dialog"
      >
        {/* Header */}
        <div className="bg-[#0B192C] text-white p-6 relative rounded-t-3xl">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Settings2 className="w-4 h-4" />
            <span>Business Settings</span>
          </div>

          <h3 className="text-xl font-bold">
            WhatsApp Number & Free Hosting
          </h3>
          <p className="text-slate-300 text-xs mt-1">
            Configure your business WhatsApp number and see GitHub Pages publishing steps.
          </p>
        </div>

        {/* Tab Bar */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 pt-3 gap-4">
          <button
            onClick={() => setActiveTab('number')}
            className={`pb-3 text-xs sm:text-sm font-bold border-b-2 cursor-pointer transition-colors ${
              activeTab === 'number'
                ? 'border-[#00A86B] text-[#00A86B]'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Business WhatsApp Number
          </button>
          <button
            onClick={() => setActiveTab('github')}
            className={`pb-3 text-xs sm:text-sm font-bold border-b-2 cursor-pointer transition-colors ${
              activeTab === 'github'
                ? 'border-[#00A86B] text-[#00A86B]'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            GitHub Pages Guide
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {activeTab === 'number' ? (
            <div className="space-y-5">
              
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-2">
                <p className="font-semibold text-slate-800">
                  Current Active Business Number: <span className="font-mono text-emerald-700 font-bold">+{currentNumber}</span>
                </p>
                <p>
                  You can update the number here to test real WhatsApp messaging immediately in this browser.
                </p>
              </div>

              <form onSubmit={handleSave} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-800">
                    Enter Your Real WhatsApp Number (with country code, e.g. 919876543210):
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Phone className="w-4 h-4 text-emerald-600" />
                    </div>
                    <input
                      type="tel"
                      value={inputNumber}
                      onChange={(e) => setInputNumber(e.target.value)}
                      placeholder="e.g. 919876543210"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#00A86B] focus:ring-2 focus:ring-emerald-100 font-mono"
                    />
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Include country code <strong>91</strong> for India. Example for 9876543210 is <strong>919876543210</strong>.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="submit"
                    className="flex-1 py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm bg-[#00A86B] hover:bg-[#00915c] text-white flex items-center justify-center gap-2 cursor-pointer transition-colors"
                  >
                    {savedSuccess ? <Check className="w-4 h-4" /> : <Settings2 className="w-4 h-4" />}
                    <span>{savedSuccess ? 'Number Saved!' : 'Save & Use This Number'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="py-2.5 px-3 rounded-xl font-medium text-xs text-slate-600 bg-slate-100 hover:bg-slate-200 flex items-center gap-1 cursor-pointer"
                    title="Reset to default config"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset</span>
                  </button>
                </div>
              </form>

              <div className="pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-500">
                <p className="font-bold text-slate-700">Permanent Change in Code:</p>
                <p>
                  To change the WhatsApp number permanently for all website visitors:
                </p>
                <code className="block p-3 rounded-lg bg-slate-900 text-emerald-400 font-mono text-[11px] leading-relaxed">
                  File: /src/config.ts<br />
                  defaultWhatsAppNumber: '91YOURNUMBERHERE'
                </code>
              </div>

            </div>
          ) : (
            <div className="space-y-4 text-xs text-slate-600 leading-relaxed">
              <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 space-y-1">
                <p className="font-bold text-sm">How to host free on GitHub Pages (100% Free Forever)</p>
                <p>This website is built with lightweight, static-compatible React + Tailwind CSS and requires no backend server or database.</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <span className="font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">Step 1</span>
                  <p>In <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-900">src/config.ts</code>, put your actual WhatsApp number in <code className="text-emerald-700 font-bold">defaultWhatsAppNumber</code>.</p>
                </div>

                <div className="flex items-start gap-2">
                  <span className="font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">Step 2</span>
                  <p>Push your repository to GitHub (e.g. <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-900">github.com/shivam/shivam-mnp-booking</code>).</p>
                </div>

                <div className="flex items-start gap-2">
                  <span className="font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">Step 3</span>
                  <p>In your GitHub repository, go to <strong>Settings</strong> &gt; <strong>Pages</strong>, select the source branch, and click <strong>Save</strong>.</p>
                </div>

                <div className="flex items-start gap-2">
                  <span className="font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">Step 4</span>
                  <p>Your website is instantly live at <code className="text-emerald-700">https://yourusername.github.io/shivam-mnp-booking</code> with zero hosting costs!</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs sm:text-sm font-bold bg-[#0B192C] text-white hover:bg-slate-800 cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
