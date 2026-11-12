import React, { useState } from 'react';
import { 
  X, 
  MessageCircle, 
  Copy, 
  Check, 
  PhoneCall, 
  AlertTriangle, 
  ArrowUpRight,
  Send
} from 'lucide-react';
import { Language, BookingFormData } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { 
  getActiveWhatsAppNumber, 
  getWhatsAppUrl, 
  BUSINESS_CONFIG 
} from '../config';

interface BookingConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  messageText: string;
  formData: BookingFormData | null;
}

export const BookingConfirmationModal: React.FC<BookingConfirmationModalProps> = ({
  isOpen,
  onClose,
  lang,
  messageText,
  formData,
}) => {
  const [copied, setCopied] = useState(false);
  const t = TRANSLATIONS[lang];
  const activeWhatsApp = getActiveWhatsAppNumber();

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(messageText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleReopenWhatsApp = () => {
    const url = getWhatsAppUrl(activeWhatsApp, messageText);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleDirectCall = () => {
    window.location.href = `tel:${activeWhatsApp}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 relative flex flex-col"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="bg-[#0B192C] text-white p-6 sm:p-7 relative rounded-t-3xl">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="flex items-center gap-2.5 text-emerald-400 font-bold text-xs uppercase tracking-wider mb-2">
            <Send className="w-4 h-4" />
            <span>{t.confirmation.modalTitle}</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-extrabold text-white leading-snug">
            {t.confirmation.noticePrimary}
          </h3>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-7 space-y-6">
          
          {/* Important Notice Banner - per requirement #6 */}
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm space-y-1">
              <p className="font-bold text-amber-900">
                {lang === 'hi' ? 'महत्वपूर्ण सूचना: व्हाट्सएप पर "Send" दबाना आवश्यक है' : 'Important Action Required'}
              </p>
              <p className="text-amber-800 leading-relaxed">
                {t.confirmation.instructionText}
              </p>
            </div>
          </div>

          {/* Formatted Message Preview */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700">
              <span>{t.confirmation.previewTitle}</span>
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1 text-[#00A86B] hover:text-[#00915c] font-semibold cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? t.confirmation.copiedText : t.confirmation.copyBtn}</span>
              </button>
            </div>
            
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-800 whitespace-pre-line leading-relaxed max-h-48 overflow-y-auto selection:bg-emerald-100">
              {messageText}
            </div>
          </div>

          {/* Executive & Contact Summary */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
            <div>
              <span className="font-bold text-slate-800">{BUSINESS_CONFIG.businessName}</span>
              <span className="text-slate-400"> · </span>
              <span>{BUSINESS_CONFIG.ownerName}</span>
            </div>
            <span className="text-[#00A86B] font-semibold">{BUSINESS_CONFIG.location}</span>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={handleReopenWhatsApp}
              className="flex-1 py-3.5 px-4 rounded-xl font-bold text-sm bg-[#00A86B] hover:bg-[#00915c] text-white flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-white/20" />
              <span>{t.confirmation.sendActionBtn}</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <button
              onClick={handleDirectCall}
              className="py-3.5 px-4 rounded-xl font-bold text-sm bg-slate-100 hover:bg-slate-200 text-slate-800 flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <PhoneCall className="w-4 h-4 text-emerald-700" />
              <span>{t.confirmation.callOwnerBtn}</span>
            </button>
          </div>

          {/* Close button */}
          <div className="text-center pt-1">
            <button
              onClick={onClose}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800 underline cursor-pointer"
            >
              {t.confirmation.closeBtn}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
