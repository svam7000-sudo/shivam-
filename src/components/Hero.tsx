import React from 'react';
import { ArrowRight, MessageCircle, PhoneCall, Sparkles, CheckCircle2, Shield, Zap, Home } from 'lucide-react';
import { Language, ServiceType } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { BUSINESS_CONFIG, getActiveWhatsAppNumber, getWhatsAppUrl } from '../config';

interface HeroProps {
  lang: Language;
  onSelectServiceAndBook: (service: ServiceType) => void;
  onNavigateToBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  lang,
  onSelectServiceAndBook,
  onNavigateToBooking,
}) => {
  const t = TRANSLATIONS[lang];
  const activeWhatsApp = getActiveWhatsAppNumber();

  const handleWhatsAppContact = () => {
    const message = lang === 'hi'
      ? `नमस्ते शिवम कुमार जी, मुझे सासाराम में सिम पोर्टिंग / नया जियो सिम के बारे में जानकारी चाहिए।`
      : `Hello Shivam Kumar, I want to inquire about SIM Porting / New Jio SIM Booking in Sasaram.`;
    const url = getWhatsAppUrl(activeWhatsApp, message);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="home" className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50/70 to-slate-100/60 pt-8 pb-16 sm:pt-14 sm:pb-24 border-b border-slate-200">
      {/* Background ambient lighting subtle decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Hero Column */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Trust Kicker text */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs sm:text-sm font-semibold text-emerald-800">
              <Sparkles className="w-4 h-4 text-[#00A86B]" />
              <span>{lang === 'hi' ? 'सासाराम का विश्वसनीय डोरस्टेप सिम बुकिंग केंद्र' : 'Trusted Doorstep SIM Porting in Sasaram, Bihar'}</span>
            </div>

            {/* Heading & Tagline */}
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold text-[#0B192C] tracking-tight leading-[1.15] text-balance">
                {t.hero.heading}
              </h1>
              <p className="text-xl sm:text-2xl font-bold text-[#00A86B] tracking-tight">
                {t.hero.tagline}
              </p>
            </div>

            {/* Subheading text */}
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl">
              {t.hero.subheading}
            </p>

            {/* 3 Required Primary Hero CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              {/* Button 1: Book Your MNP */}
              <button
                onClick={onNavigateToBooking}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-base text-white bg-[#00A86B] hover:bg-[#00915c] shadow-md hover:shadow-lg transition-all cursor-pointer whitespace-nowrap active:scale-[0.99]"
              >
                <span>{t.hero.ctaBookMNP}</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              {/* Button 2: New Jio SIM Booking */}
              <button
                onClick={() => onSelectServiceAndBook('New Jio SIM Booking')}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-bold text-base text-[#0B192C] bg-white hover:bg-slate-50 border-2 border-[#0B192C]/20 hover:border-[#0B192C] shadow-xs transition-all cursor-pointer whitespace-nowrap active:scale-[0.99]"
              >
                <Zap className="w-5 h-5 text-amber-500" />
                <span>{t.hero.ctaNewSIM}</span>
              </button>

              {/* Button 3: WhatsApp Contact */}
              <button
                onClick={handleWhatsAppContact}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-bold text-base text-emerald-900 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 transition-all cursor-pointer whitespace-nowrap active:scale-[0.99]"
              >
                <MessageCircle className="w-5 h-5 text-emerald-600 fill-emerald-600/20" />
                <span>{t.hero.ctaWhatsApp}</span>
              </button>
            </div>

            {/* 4 Feature Trust Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 pt-4 border-t border-slate-200">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-[#00A86B] shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm font-semibold text-slate-800">
                  {t.hero.highlights.doorstep}
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-[#00A86B] shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm font-semibold text-slate-800">
                  {t.hero.highlights.numberKept}
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-[#00A86B] shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm font-semibold text-slate-800">
                  {t.hero.highlights.kyc}
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-[#00A86B] shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm font-semibold text-slate-800">
                  {t.hero.highlights.zeroFees}
                </span>
              </div>
            </div>

          </div>

          {/* Right Hero Visual Banner */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900 group">
              <img
                src="/src/assets/images/hero_sim_porting_1794498984299.jpg"
                alt="Shivam MNP Booking - Jio SIM Porting and Delivery"
                referrerPolicy="no-referrer"
                className="w-full h-[320px] sm:h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
                onError={(e) => {
                  // Fallback if image fails to render
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              
              {/* Overlay Badge at bottom of image */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0B192C]/95 via-[#0B192C]/80 to-transparent p-5 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold text-emerald-400 tracking-wider uppercase">
                      {lang === 'hi' ? 'जियो 5G नेटवर्क अपग्रेड' : 'Jio True 5G Upgrade'}
                    </div>
                    <div className="text-lg font-bold">
                      {lang === 'hi' ? 'शिवम कुमार · सासाराम' : 'Shivam Kumar · Sasaram'}
                    </div>
                  </div>
                  <div className="px-3 py-1.5 rounded-lg bg-[#00A86B] text-white text-xs font-bold tracking-wide">
                    {lang === 'hi' ? 'मुफ्त होम डिलीवरी' : 'FREE DELIVERY'}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick floating card */}
            <div className="absolute -bottom-6 -left-4 sm:left-4 bg-white/95 backdrop-blur-md rounded-xl p-3.5 shadow-xl border border-slate-200 hidden sm:flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center text-[#00A86B]">
                <Home className="w-5 h-5" />
              </div>
              <div className="text-xs">
                <div className="font-bold text-[#0B192C]">
                  {lang === 'hi' ? 'घर बैठे सिम एक्टिवेशन' : 'Doorstep SIM Delivery'}
                </div>
                <div className="text-slate-500">
                  {lang === 'hi' ? 'सासाराम एवं आस-पास' : 'Sasaram & Rohtas District'}
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
