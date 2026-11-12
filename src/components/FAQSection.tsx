import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface FAQSectionProps {
  lang: Language;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#00A86B]">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{lang === 'hi' ? 'संदेह निवारण' : 'Got Questions?'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B192C] tracking-tight">
            {t.faq.title}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            {t.faq.subtitle}
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {t.faq.items.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 bg-white overflow-hidden transition-all duration-200 shadow-xs"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-bold text-slate-900 hover:text-[#00A86B] transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg">{item.q}</span>
                  <div className={`p-1.5 rounded-lg bg-slate-100 text-slate-600 transition-transform duration-200 ${isOpen ? 'rotate-180 bg-emerald-50 text-[#00A86B]' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-slate-600 text-sm sm:text-base leading-relaxed border-t border-slate-100 pt-3">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
