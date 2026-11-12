import React from 'react';
import { 
  Building2, 
  User, 
  MapPin, 
  Phone, 
  Clock, 
  CheckCircle2, 
  MessageCircle, 
  PhoneCall, 
  ShieldCheck,
  Radio
} from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { 
  BUSINESS_CONFIG, 
  getActiveWhatsAppNumber, 
  getWhatsAppUrl 
} from '../config';

interface ContactSectionProps {
  lang: Language;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  const activeWhatsApp = getActiveWhatsAppNumber();

  const handleWhatsApp = () => {
    const text = lang === 'hi'
      ? 'नमस्ते शिवम कुमार जी, मुझे सासाराम में सिम पोर्टिंग / नई सिम के संबंध में संपर्क करना है।'
      : 'Hello Shivam Kumar, I would like to get in touch regarding SIM Porting / New SIM service in Sasaram.';
    const url = getWhatsAppUrl(activeWhatsApp, text);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleDirectCall = () => {
    window.location.href = `tel:${activeWhatsApp}`;
  };

  return (
    <section id="contact" className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#00A86B]">
            <Building2 className="w-3.5 h-3.5" />
            <span>{lang === 'hi' ? 'सीधे संपर्क करें' : 'Local Support'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B192C] tracking-tight">
            {t.contact.title}
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            {t.contact.subtitle}
          </p>
        </div>

        {/* 2-Column Split: Contact Details Card + Doorstep Service Photo */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Official Business Details Card */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-md flex flex-col justify-between">
            
            <div className="space-y-6">
              
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2 text-emerald-800 text-xs sm:text-sm font-bold bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
                  <ShieldCheck className="w-4 h-4 text-[#00A86B]" />
                  <span>{lang === 'hi' ? 'प्रमाणित टेलीकॉम डिस्ट्रीब्यूटर' : 'Verified Telecom Facilitator'}</span>
                </div>
                <span className="text-xs font-semibold text-slate-500">
                  {lang === 'hi' ? 'सासाराम, बिहार' : 'Sasaram, Bihar'}
                </span>
              </div>

              {/* Grid of Business Info Fields per requirement #7 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* 1. Business Name */}
                <div className="space-y-1">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    {t.contact.businessNameLabel}
                  </span>
                  <p className="text-lg font-extrabold text-[#0B192C]">
                    {BUSINESS_CONFIG.businessName}
                  </p>
                </div>

                {/* 2. Owner Name */}
                <div className="space-y-1">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    {t.contact.ownerLabel}
                  </span>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-[#00A86B]" />
                    <p className="text-lg font-bold text-[#0B192C]">
                      {BUSINESS_CONFIG.ownerName}
                    </p>
                  </div>
                </div>

                {/* 3. Location */}
                <div className="space-y-1">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    {t.contact.locationLabel}
                  </span>
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-base font-bold text-[#0B192C]">
                        {BUSINESS_CONFIG.location}
                      </p>
                      <p className="text-xs text-slate-500">
                        {BUSINESS_CONFIG.addressDetail}
                      </p>
                    </div>
                  </div>
                </div>

                {/* 4. Mobile / WhatsApp */}
                <div className="space-y-1">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    {t.contact.phoneLabel}
                  </span>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-emerald-600" />
                    <p className="text-base font-bold text-slate-900 font-mono">
                      +{activeWhatsApp}
                    </p>
                  </div>
                </div>

              </div>

              {/* 5. Services Offered */}
              <div className="pt-4 border-t border-slate-100 space-y-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  {t.contact.servicesLabel}
                </span>
                <p className="text-base font-semibold text-slate-800">
                  {BUSINESS_CONFIG.servicesOffered}
                </p>
              </div>

              {/* 6. Working Hours & Delivery Areas */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  {t.contact.hoursLabel}
                </span>
                <div className="flex items-center gap-2 text-sm text-slate-700">
                  <Clock className="w-4 h-4 text-slate-500" />
                  <span>{BUSINESS_CONFIG.workingHours}</span>
                </div>
              </div>

            </div>

            {/* Direct Action Buttons */}
            <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleWhatsApp}
                className="flex-1 py-3.5 px-5 rounded-xl font-bold text-sm bg-[#00A86B] hover:bg-[#00915c] text-white flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{t.contact.directWhatsAppBtn}</span>
              </button>

              <button
                onClick={handleDirectCall}
                className="flex-1 py-3.5 px-5 rounded-xl font-bold text-sm bg-[#0B192C] hover:bg-[#1E3E62] text-white flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                <PhoneCall className="w-4 h-4" />
                <span>{t.contact.directCallBtn}</span>
              </button>
            </div>

          </div>

          {/* Right Column: Doorstep Executive Photo & Local Service Map info */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md flex flex-col justify-between">
            <div className="space-y-5">
              
              <div className="relative rounded-2xl overflow-hidden aspect-4/3 bg-slate-900 border border-slate-200">
                <img
                  src="/src/assets/images/doorstep_service_1794498985062.jpg"
                  alt="Shivam Kumar Doorstep Jio SIM Service in Sasaram"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <div className="absolute top-3 left-3 bg-[#0B192C]/90 text-white text-xs font-bold px-3 py-1.5 rounded-lg backdrop-blur-xs">
                  {lang === 'hi' ? 'डोरस्टेप सिम डिलीवरी' : 'Doorstep SIM Delivery'}
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-lg font-bold text-[#0B192C]">
                  {t.contact.serviceCoverageTitle}
                </h4>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  {t.contact.serviceCoverageDesc}
                </p>
              </div>

              {/* Service Areas Tags */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {BUSINESS_CONFIG.serviceAreas.map((area, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-medium"
                  >
                    {area}
                  </span>
                ))}
              </div>

            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>{lang === 'hi' ? 'त्वरित प्रतिक्रिया' : 'Fast Response Time'}</span>
              <span className="font-bold text-[#00A86B]">Within 30 Mins</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
