import React, { useState } from 'react';
import { Phone, MessageCircle, Menu, X, Globe, Settings2, ShieldCheck } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { BUSINESS_CONFIG, getActiveWhatsAppNumber, getWhatsAppUrl } from '../config';

interface HeaderProps {
  lang: Language;
  onToggleLang: () => void;
  onOpenSettings: () => void;
  onNavigateToBooking: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  lang,
  onToggleLang,
  onOpenSettings,
  onNavigateToBooking,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = TRANSLATIONS[lang];
  const activeWhatsApp = getActiveWhatsAppNumber();

  const handleQuickWhatsApp = () => {
    const url = getWhatsAppUrl(
      activeWhatsApp,
      'Hello Shivam Kumar, I want to inquire about SIM porting / new Jio SIM booking in Sasaram.'
    );
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const navLinks = [
    { label: t.nav.home, href: '#home' },
    { label: t.nav.services, href: '#services' },
    { label: t.nav.howItWorks, href: '#how-it-works' },
    { label: t.nav.contact, href: '#contact' },
    { label: t.nav.faq, href: '#faq' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top micro-bar with location info and owner name */}
      <div className="bg-[#0B192C] text-slate-300 text-xs px-4 py-1.5 hidden sm:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-emerald-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              {lang === 'hi' ? 'अधिकृत टेलीकॉम डोरस्टेप सर्विस' : 'Authorized Doorstep Telecom Service'}
            </span>
            <span className="text-slate-500">·</span>
            <span>{lang === 'hi' ? 'सासाराम, रोहतास (बिहार)' : 'Sasaram, Rohtas (Bihar)'}</span>
            <span className="text-slate-500">·</span>
            <span>{lang === 'hi' ? 'संचालक: शिवम कुमार' : 'Facilitator: Shivam Kumar'}</span>
          </div>
          <div className="flex items-center gap-4 text-slate-300">
            <span>{BUSINESS_CONFIG.workingHours}</span>
            <button
              onClick={onOpenSettings}
              className="text-slate-400 hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
              title="Configure WhatsApp Number"
            >
              <Settings2 className="w-3 h-3" />
              <span>{lang === 'hi' ? 'नंबर सेटिंग' : 'Admin'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          
          {/* Brand Wordmark (Zone 1) */}
          <a href="#home" className="flex items-center gap-2.5 shrink-0 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00A86B] to-[#0B192C] flex items-center justify-center text-white shadow-sm font-bold text-lg group-hover:scale-105 transition-transform">
              <span className="tracking-tighter">SM</span>
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-extrabold tracking-tight text-[#0B192C] leading-tight">
                SHIVAM MNP BOOKING
              </span>
              <span className="text-[11px] font-semibold text-[#00A86B] tracking-wider uppercase">
                {lang === 'hi' ? 'डोरस्टेप सिम सेवा · सासाराम' : 'Doorstep SIM Porting · Sasaram'}
              </span>
            </div>
          </a>

          {/* Navigation Links (Zone 2) - Desktop */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-slate-700">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-[#00A86B] transition-colors whitespace-nowrap shrink-0"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Actions & Utilities (Zone 3) */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Language Switcher */}
            <button
              onClick={onToggleLang}
              className="flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 text-xs font-bold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors cursor-pointer border border-slate-200"
              title="Switch Language / भाषा बदलें"
            >
              <Globe className="w-3.5 h-3.5 text-[#00A86B]" />
              <span>{t.nav.switchLang}</span>
            </button>

            {/* Quick WhatsApp button */}
            <button
              onClick={handleQuickWhatsApp}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600 fill-emerald-600/20" />
              <span>WhatsApp</span>
            </button>

            {/* Book Now primary CTA */}
            <button
              onClick={onNavigateToBooking}
              className="inline-flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2.5 text-xs sm:text-sm font-bold text-white bg-[#00A86B] hover:bg-[#00915c] rounded-xl shadow-xs hover:shadow-md transition-all cursor-pointer whitespace-nowrap"
            >
              <span>{t.nav.bookNow}</span>
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 cursor-pointer"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-base font-semibold text-slate-800 hover:bg-slate-100 hover:text-[#00A86B]"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleQuickWhatsApp();
              }}
              className="w-full py-2.5 px-4 rounded-xl font-bold text-sm bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>{lang === 'hi' ? 'व्हाट्सएप पर बात करें' : 'Chat on WhatsApp'}</span>
            </button>
            <div className="flex items-center justify-between text-xs text-slate-500 pt-2 px-1">
              <span>{BUSINESS_CONFIG.location}</span>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSettings();
                }}
                className="text-slate-600 hover:text-slate-900 underline font-medium"
              >
                {lang === 'hi' ? 'नंबर बदलें' : 'Settings'}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
