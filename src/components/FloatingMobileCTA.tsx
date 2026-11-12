import React from 'react';
import { MessageCircle, Send, PhoneCall } from 'lucide-react';
import { Language } from '../types';
import { getActiveWhatsAppNumber, getWhatsAppUrl } from '../config';

interface FloatingMobileCTAProps {
  lang: Language;
  onNavigateToBooking: () => void;
}

export const FloatingMobileCTA: React.FC<FloatingMobileCTAProps> = ({
  lang,
  onNavigateToBooking,
}) => {
  const activeWhatsApp = getActiveWhatsAppNumber();

  const handleWhatsApp = () => {
    const text = lang === 'hi'
      ? 'नमस्ते शिवम कुमार जी, मुझे सासाराम में सिम पोर्टिंग के बारे में जानकारी चाहिए।'
      : 'Hello Shivam Kumar, I need details about SIM Porting in Sasaram.';
    const url = getWhatsAppUrl(activeWhatsApp, text);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed bottom-0 inset-x-0 z-30 sm:hidden bg-white/95 backdrop-blur-md border-t border-slate-200 px-3 py-2 flex items-center gap-2 shadow-lg">
      <button
        onClick={handleWhatsApp}
        className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
        aria-label="WhatsApp"
      >
        <MessageCircle className="w-4 h-4 text-[#00A86B]" />
        <span>WhatsApp</span>
      </button>

      <button
        onClick={onNavigateToBooking}
        className="flex-[1.5] py-2.5 px-3 rounded-xl bg-[#00A86B] hover:bg-[#00915c] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
        aria-label="Book SIM"
      >
        <Send className="w-3.5 h-3.5" />
        <span>{lang === 'hi' ? 'सिम बुक करें' : 'Book SIM Now'}</span>
      </button>
    </div>
  );
};
