import React, { useState } from 'react';
import { Send, FileText, UserCheck, CheckCircle2, MessageSquare, ExternalLink, HelpCircle } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface PortingGuideProps {
  lang: Language;
}

export const PortingGuide: React.FC<PortingGuideProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  const [testPhone, setTestPhone] = useState('');

  const steps = [
    {
      num: '01',
      title: t.howItWorks.step1Title,
      desc: t.howItWorks.step1Desc,
      icon: Send,
    },
    {
      num: '02',
      title: t.howItWorks.step2Title,
      desc: t.howItWorks.step2Desc,
      icon: FileText,
    },
    {
      num: '03',
      title: t.howItWorks.step3Title,
      desc: t.howItWorks.step3Desc,
      icon: UserCheck,
    },
    {
      num: '04',
      title: t.howItWorks.step4Title,
      desc: t.howItWorks.step4Desc,
      icon: CheckCircle2,
    },
  ];

  const handleOpenSmsHelper = () => {
    const cleanNum = testPhone.replace(/\D/g, '');
    const body = cleanNum.length === 10 ? `PORT ${cleanNum}` : 'PORT <YourMobileNumber>';
    // Standard sms link format for mobile phones
    const smsUrl = `sms:1900?body=${encodeURIComponent(body)}`;
    window.location.href = smsUrl;
  };

  return (
    <section id="how-it-works" className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#00A86B]">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{lang === 'hi' ? 'आसान प्रक्रिया' : 'Step-by-Step Flow'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B192C] tracking-tight">
            {t.howItWorks.title}
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            {t.howItWorks.subtitle}
          </p>
        </div>

        {/* 4 Clean Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-xs relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-2xl font-black text-slate-300 font-mono">
                      {step.num}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#00A86B] flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-[#0B192C] mb-2.5">
                    {step.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-semibold text-[#00A86B] flex items-center gap-1">
                  <span>{lang === 'hi' ? `चरण ${idx + 1}` : `Stage ${idx + 1}`}</span>
                  <span className="text-slate-400">·</span>
                  <span className="text-slate-500">
                    {idx === 0 ? '1 Minute' : idx === 1 ? 'Instant' : idx === 2 ? 'At Home' : '3-5 Days'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Helpful Interactive UPC SMS Assist Box */}
        <div className="mt-12 bg-white rounded-2xl border border-emerald-200 p-6 sm:p-8 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 space-y-2">
              <div className="flex items-center gap-2 text-[#00A86B] font-bold text-sm">
                <MessageSquare className="w-4 h-4" />
                <span>{t.howItWorks.smsHelperTitle}</span>
              </div>
              <h4 className="text-xl font-bold text-[#0B192C]">
                {lang === 'hi'
                  ? 'यूपीसी कोड कैसे निकालें? (PORT SMS to 1900)'
                  : 'How to generate your 8-digit UPC code for porting'}
              </h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                {lang === 'hi'
                  ? 'अपने फोन के मैसेज बॉक्स में जाएं और टाइप करें: PORT <10 अंकों का मोबाइल नंबर> और 1900 पर भेजें। आपको तुरंत एक गुप्त 8 अंकों का कोड प्राप्त होगा जो हमारे एग्जीक्यूटिव को देना होता है।'
                  : 'Type PORT <10-digit Mobile Number> in SMS and send to 1900. You will receive an 8-character unique porting code valid for 4 days.'}
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-3">
              <div className="relative">
                <input
                  type="tel"
                  maxLength={10}
                  value={testPhone}
                  onChange={(e) => setTestPhone(e.target.value.replace(/\D/g, ''))}
                  placeholder={lang === 'hi' ? '10 अंकों का नंबर डालें' : 'Enter 10-digit number'}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A86B]"
                />
              </div>
              <button
                onClick={handleOpenSmsHelper}
                className="w-full py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm bg-[#00A86B] hover:bg-[#00915c] text-white flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span>{t.howItWorks.smsBtn}</span>
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
