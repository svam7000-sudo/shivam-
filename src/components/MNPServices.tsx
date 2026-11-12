import React from 'react';
import { ArrowRight, Check, Zap, Smartphone, Sparkles } from 'lucide-react';
import { Language, ServiceType, Operator } from '../types';
import { TRANSLATIONS, MNP_SERVICES_LIST } from '../data/translations';

interface MNPServicesProps {
  lang: Language;
  onSelectServiceAndBook: (service: ServiceType, operator?: Operator) => void;
}

export const MNPServices: React.FC<MNPServicesProps> = ({
  lang,
  onSelectServiceAndBook,
}) => {
  const t = TRANSLATIONS[lang];

  // Specific styling per operator
  const getOperatorBadgeStyle = (op: Operator | 'None') => {
    switch (op) {
      case 'Airtel':
        return {
          pill: 'bg-red-50 text-red-700 border-red-200',
          accent: 'from-red-600 to-rose-700',
          tag: 'Airtel → Jio',
        };
      case 'Vi':
        return {
          pill: 'bg-amber-50 text-amber-800 border-amber-200',
          accent: 'from-amber-600 to-orange-700',
          tag: 'Vi → Jio',
        };
      case 'BSNL':
        return {
          pill: 'bg-blue-50 text-blue-700 border-blue-200',
          accent: 'from-blue-600 to-indigo-700',
          tag: 'BSNL → Jio',
        };
      case 'Other':
        return {
          pill: 'bg-purple-50 text-purple-700 border-purple-200',
          accent: 'from-purple-600 to-slate-700',
          tag: 'Other → Jio',
        };
      default:
        return {
          pill: 'bg-emerald-50 text-emerald-800 border-emerald-200',
          accent: 'from-[#00A86B] to-[#0B192C]',
          tag: 'New Connection',
        };
    }
  };

  return (
    <section id="services" className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#00A86B]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{lang === 'hi' ? 'एमएनपी सुविधाएं' : 'Fast SIM Facilitation'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B192C] tracking-tight">
            {t.servicesSection.title}
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            {t.servicesSection.subtitle}
          </p>
        </div>

        {/* 5 Distinct Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {MNP_SERVICES_LIST.map((service, index) => {
            const styling = getOperatorBadgeStyle(service.fromOperator);
            const isNewJio = service.id === 'new-jio-sim';

            return (
              <div
                key={service.id}
                className={`flex flex-col justify-between rounded-2xl p-6 sm:p-7 border transition-all duration-200 hover:shadow-xl relative bg-white ${
                  service.popular
                    ? 'border-emerald-300 ring-2 ring-emerald-500/20 shadow-md'
                    : 'border-slate-200 hover:border-slate-300 shadow-xs'
                }`}
              >
                {/* Popular or Category Ribbon */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-md border ${styling.pill}`}>
                    {styling.tag}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">
                    {lang === 'hi' ? service.badgeHi : service.badge}
                  </span>
                </div>

                {/* Card Title & Tagline */}
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700">
                      {isNewJio ? <Zap className="w-4 h-4 text-emerald-600" /> : <Smartphone className="w-4 h-4 text-[#0B192C]" />}
                    </div>
                    <h3 className="text-xl font-bold text-[#0B192C]">
                      {lang === 'hi' ? service.titleHi : service.title}
                    </h3>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {lang === 'hi' ? service.taglineHi : service.tagline}
                  </p>
                </div>

                {/* Benefits List */}
                <div className="space-y-2.5 mb-8 grow border-t border-slate-100 pt-4">
                  {(lang === 'hi' ? service.benefitsHi : service.benefits).map((b, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                      <div className="w-4 h-4 rounded-full bg-emerald-100 text-[#00A86B] flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span className="leading-tight">{b}</span>
                    </div>
                  ))}
                </div>

                {/* Card CTA: Book Now Button */}
                <button
                  onClick={() =>
                    onSelectServiceAndBook(
                      service.serviceType,
                      service.fromOperator === 'None' ? 'Other' : service.fromOperator
                    )
                  }
                  className={`w-full py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    service.popular
                      ? 'bg-[#00A86B] hover:bg-[#00915c] text-white shadow-sm hover:shadow-md'
                      : 'bg-[#0B192C] hover:bg-[#1E3E62] text-white'
                  }`}
                >
                  <span>{t.servicesSection.bookBtn}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Free Doorstep Guarantee Banner */}
        <div className="mt-12 bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-lg font-bold text-[#0B192C]">
              {lang === 'hi' ? 'सासाराम में 100% फ्री होम डिलीवरी व पोर्टिंग' : '100% Free Doorstep Service in Sasaram'}
            </h4>
            <p className="text-slate-600 text-sm">
              {lang === 'hi'
                ? 'सिम डिलीवरी का कोई अतिरिक्त चार्ज नहीं। सिर्फ अपने पसंद के जियो रिचार्ज प्लान का भुगतान करें।'
                : 'No delivery fee or hidden charges. Pay only for your chosen official Jio recharge plan.'}
            </p>
          </div>
          <button
            onClick={() => onSelectServiceAndBook('Airtel to Jio', 'Airtel')}
            className="px-6 py-3 rounded-xl font-bold text-sm bg-white border-2 border-emerald-600 text-emerald-800 hover:bg-emerald-50 transition-colors shrink-0 cursor-pointer"
          >
            {lang === 'hi' ? 'अभी पोर्टिंग शेड्यूल करें' : 'Schedule Porting Now'}
          </button>
        </div>

      </div>
    </section>
  );
};
