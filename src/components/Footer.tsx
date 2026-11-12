import React from 'react';
import { ShieldCheck, MessageCircle, Phone, MapPin, Heart } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { BUSINESS_CONFIG, getActiveWhatsAppNumber, getWhatsAppUrl } from '../config';
import { LegalModalType } from './LegalModals';

interface FooterProps {
  lang: Language;
  onOpenLegal: (type: LegalModalType) => void;
}

export const Footer: React.FC<FooterProps> = ({
  lang,
  onOpenLegal,
}) => {
  const t = TRANSLATIONS[lang];
  const activeWhatsApp = getActiveWhatsAppNumber();

  const handleWhatsApp = () => {
    const url = getWhatsAppUrl(
      activeWhatsApp,
      'Hello Shivam Kumar, I want to inquire about SIM porting services in Sasaram.'
    );
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <footer className="bg-[#0B192C] text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          
          {/* Col 1: Brand & About (Zone 1) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#00A86B] flex items-center justify-center text-white font-extrabold text-base">
                SM
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">
                {BUSINESS_CONFIG.businessName}
              </span>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed max-w-md">
              {t.footer.aboutText}
            </p>

            <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold pt-1">
              <ShieldCheck className="w-4 h-4 text-[#00A86B]" />
              <span>{lang === 'hi' ? '100% सुरक्षित और निःशुल्क होम डिलीवरी' : '100% Safe, Official & Free Doorstep Service'}</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <a href="#home" className="hover:text-white transition-colors">
                  {t.nav.home}
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  {t.nav.services}
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-white transition-colors">
                  {t.nav.howItWorks}
                </a>
              </li>
              <li>
                <a href="#booking-form" className="hover:text-white transition-colors">
                  {t.nav.bookNow}
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  {t.nav.contact}
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  {t.nav.faq}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Legal & Modals Links (Required by Prompt) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider">
              {t.footer.legalTitle}
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button
                  onClick={() => onOpenLegal('about')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  {lang === 'hi' ? 'हमारे बारे में (About Us)' : 'About Us'}
                </button>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  {lang === 'hi' ? 'संपर्क करें (Contact Us)' : 'Contact Us'}
                </a>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegal('privacy')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  {t.footer.privacyPolicy}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegal('terms')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  {t.footer.termsConditions}
                </button>
              </li>
            </ul>

            {/* Direct Contact info in footer */}
            <div className="pt-2 text-xs text-slate-400 space-y-1">
              <p className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                <span>{BUSINESS_CONFIG.location}</span>
              </p>
              <p className="flex items-center gap-1.5 font-mono">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-white font-bold">{BUSINESS_CONFIG.displayPhone}</span>
              </p>
            </div>
          </div>

        </div>

        {/* Disclaimer */}
        <div className="pt-6 pb-6 text-xs text-slate-500 leading-relaxed border-b border-slate-800/80">
          <p>{t.footer.disclaimer}</p>
        </div>

        {/* Copyright Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
          <p className="font-medium text-slate-300">
            {t.footer.copyright}
          </p>
          <p className="text-slate-500">
            {t.footer.developedFor}
          </p>
        </div>

      </div>
    </footer>
  );
};
