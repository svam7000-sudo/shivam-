import React, { useState, useEffect } from 'react';
import { 
  Send, 
  ShieldCheck, 
  AlertCircle, 
  Calendar, 
  MapPin, 
  Phone, 
  User, 
  Radio, 
  MessageSquare,
  Sparkles,
  Lock
} from 'lucide-react';
import { Language, Operator, ServiceType, BookingFormData } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { 
  getActiveWhatsAppNumber, 
  buildWhatsAppBookingMessage, 
  getWhatsAppUrl,
  BUSINESS_CONFIG 
} from '../config';

interface BookingFormProps {
  lang: Language;
  selectedService: ServiceType;
  selectedOperator: Operator;
  onBookingSubmitted: (formattedMessage: string, formData: BookingFormData) => void;
}

export const BookingForm: React.FC<BookingFormProps> = ({
  lang,
  selectedService,
  selectedOperator,
  onBookingSubmitted,
}) => {
  const t = TRANSLATIONS[lang];

  // Form State
  const [formData, setFormData] = useState<BookingFormData>({
    fullName: '',
    mobileNumber: '',
    currentOperator: selectedOperator || 'Airtel',
    serviceRequired: selectedService || 'Airtel to Jio',
    fullAddress: '',
    cityArea: 'Sasaram',
    pinCode: '821115',
    preferredDate: '',
    additionalMessage: '',
  });

  // Sync props if user clicked "Book Now" on a card
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      serviceRequired: selectedService,
      currentOperator: selectedOperator,
    }));
  }, [selectedService, selectedOperator]);

  // Set default preferred date to tomorrow's date
  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateStr = tomorrow.toISOString().split('T')[0];
    setFormData((prev) => ({
      ...prev,
      preferredDate: prev.preferredDate || dateStr,
    }));
  }, []);

  // Validation State
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [duplicateWarning, setDuplicateWarning] = useState<string | null>(null);

  // Field change handler
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    
    // Auto-sync operator if service changes
    if (name === 'serviceRequired') {
      let derivedOperator: Operator = formData.currentOperator;
      if (value.startsWith('Airtel')) derivedOperator = 'Airtel';
      else if (value.startsWith('Vi')) derivedOperator = 'Vi';
      else if (value.startsWith('BSNL')) derivedOperator = 'BSNL';
      else if (value.startsWith('Other')) derivedOperator = 'Other';

      setFormData((prev) => ({
        ...prev,
        serviceRequired: value as ServiceType,
        currentOperator: derivedOperator,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    // Clear field-specific error
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
    setDuplicateWarning(null);
  };

  // Validation logic
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Customer Full Name
    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      newErrors.fullName = t.form.errors.name;
    }

    // Mobile Number (Indian 10-digit mobile starting with 6, 7, 8, or 9)
    const cleanMobile = formData.mobileNumber.replace(/\D/g, '');
    const indianMobileRegex = /^[6-9]\d{9}$/;
    if (!cleanMobile || !indianMobileRegex.test(cleanMobile)) {
      newErrors.mobileNumber = t.form.errors.phone;
    }

    // Full Address
    if (!formData.fullAddress.trim() || formData.fullAddress.trim().length < 5) {
      newErrors.fullAddress = t.form.errors.address;
    }

    // City / Area
    if (!formData.cityArea.trim()) {
      newErrors.cityArea = t.form.errors.city;
    }

    // PIN Code (6-digit Indian PIN)
    const cleanPin = formData.pinCode.replace(/\D/g, '');
    if (!cleanPin || cleanPin.length !== 6) {
      newErrors.pinCode = t.form.errors.pin;
    }

    // Preferred Date
    if (!formData.preferredDate) {
      newErrors.preferredDate = t.form.errors.date;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Check for duplicate submission
  const checkDuplicate = (phone: string, service: string): boolean => {
    try {
      const lastBooking = sessionStorage.getItem('shivam_last_mnp_booking');
      if (lastBooking) {
        const parsed = JSON.parse(lastBooking);
        const timeDiff = Date.now() - parsed.timestamp;
        // If submitted identical phone within 3 minutes
        if (parsed.phone === phone && parsed.service === service && timeDiff < 180000) {
          return true;
        }
      }
    } catch (e) {
      console.error(e);
    }
    return false;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      // Scroll to top of form to show first error
      const formElement = document.getElementById('booking-form');
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    const cleanMobile = formData.mobileNumber.replace(/\D/g, '');

    // Duplicate check warning
    if (checkDuplicate(cleanMobile, formData.serviceRequired)) {
      setDuplicateWarning(
        lang === 'hi'
          ? 'आप पहले ही यह बुकिंग सबमिट कर चुके हैं। क्या आप दोबारा संदेश भेजना चाहते हैं?'
          : 'You recently submitted this booking request. Click below if you wish to re-open WhatsApp.'
      );
    }

    setIsSubmitting(true);

    // Prepare WhatsApp Message in the exact requested format:
    // NEW MNP BOOKING
    // Customer Name:
    // Mobile Number:
    // Current Operator:
    // Service Required:
    // Full Address:
    // City:
    // PIN Code:
    // Booking Date:
    // Additional Message:
    const formattedMessage = buildWhatsAppBookingMessage({
      fullName: formData.fullName,
      mobileNumber: cleanMobile,
      currentOperator: formData.currentOperator,
      serviceRequired: formData.serviceRequired,
      fullAddress: formData.fullAddress,
      cityArea: formData.cityArea,
      pinCode: formData.pinCode,
      preferredDate: formData.preferredDate,
      additionalMessage: formData.additionalMessage,
    });

    const activeWhatsAppNumber = getActiveWhatsAppNumber();
    const whatsappUrl = getWhatsAppUrl(activeWhatsAppNumber, formattedMessage);

    // Save submission to prevent immediate spamming
    try {
      sessionStorage.setItem(
        'shivam_last_mnp_booking',
        JSON.stringify({
          phone: cleanMobile,
          service: formData.serviceRequired,
          timestamp: Date.now(),
        })
      );
    } catch (err) {
      console.error(err);
    }

    // Open WhatsApp in new tab / app
    // Note: Customer must manually press Send
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    // Notify parent to display the required Booking Confirmation Modal:
    // "Your booking details are ready. Please send the WhatsApp message to confirm your booking."
    onBookingSubmitted(formattedMessage, formData);
    setIsSubmitting(false);
  };

  // Min date is today
  const todayStr = new Date().toISOString().split('T')[0];

  return (
    <section id="booking-form" className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Form Container Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
          
          {/* Card Top Header */}
          <div className="bg-gradient-to-r from-[#0B192C] to-[#12233c] text-white p-6 sm:p-10 relative">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.form.badge}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {t.form.title}
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mt-2 max-w-2xl">
              {t.form.subtitle}
            </p>
          </div>

          {/* Form Body */}
          <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-6">
            
            {duplicateWarning && (
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-sm flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-semibold">{duplicateWarning}</p>
                </div>
              </div>
            )}

            {/* Row 1: Full Name & Mobile Number */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="block text-xs sm:text-sm font-bold text-slate-800">
                  {t.form.nameLabel} <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder={t.form.namePlaceholder}
                    className={`w-full pl-10 pr-3.5 py-3 rounded-xl border text-sm focus:outline-none transition-colors ${
                      errors.fullName
                        ? 'border-rose-400 bg-rose-50/50 focus:ring-2 focus:ring-rose-200'
                        : 'border-slate-300 focus:border-[#00A86B] focus:ring-2 focus:ring-emerald-100'
                    }`}
                  />
                </div>
                {errors.fullName && (
                  <p className="text-xs text-rose-600 font-medium">{errors.fullName}</p>
                )}
              </div>

              {/* Mobile Number */}
              <div className="space-y-1.5">
                <label className="block text-xs sm:text-sm font-bold text-slate-800">
                  {t.form.phoneLabel} <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 font-semibold text-sm">
                    +91
                  </div>
                  <input
                    type="tel"
                    name="mobileNumber"
                    maxLength={10}
                    value={formData.mobileNumber}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, '');
                      setFormData((p) => ({ ...p, mobileNumber: val }));
                      if (errors.mobileNumber) {
                        setErrors((p) => {
                          const n = { ...p };
                          delete n.mobileNumber;
                          return n;
                        });
                      }
                    }}
                    placeholder={t.form.phonePlaceholder}
                    className={`w-full pl-12 pr-3.5 py-3 rounded-xl border text-sm focus:outline-none transition-colors ${
                      errors.mobileNumber
                        ? 'border-rose-400 bg-rose-50/50 focus:ring-2 focus:ring-rose-200'
                        : 'border-slate-300 focus:border-[#00A86B] focus:ring-2 focus:ring-emerald-100'
                    }`}
                  />
                </div>
                {errors.mobileNumber && (
                  <p className="text-xs text-rose-600 font-medium">{errors.mobileNumber}</p>
                )}
              </div>

            </div>

            {/* Row 2: Current SIM Operator & Service Required */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Current SIM Operator */}
              <div className="space-y-1.5">
                <label className="block text-xs sm:text-sm font-bold text-slate-800">
                  {t.form.operatorLabel} <span className="text-rose-500">*</span>
                </label>
                <select
                  name="currentOperator"
                  value={formData.currentOperator}
                  onChange={handleChange}
                  className="w-full px-3.5 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#00A86B] focus:ring-2 focus:ring-emerald-100 bg-white"
                >
                  <option value="Airtel">Airtel (एयरटेल)</option>
                  <option value="Vi">Vi - Vodafone Idea (वीआई)</option>
                  <option value="BSNL">BSNL (बीएसएनएल)</option>
                  <option value="Other">Other Operator (अन्य ऑपरेटर)</option>
                </select>
              </div>

              {/* Service Required */}
              <div className="space-y-1.5">
                <label className="block text-xs sm:text-sm font-bold text-slate-800">
                  {t.form.serviceLabel} <span className="text-rose-500">*</span>
                </label>
                <select
                  name="serviceRequired"
                  value={formData.serviceRequired}
                  onChange={handleChange}
                  className="w-full px-3.5 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#00A86B] focus:ring-2 focus:ring-emerald-100 bg-white"
                >
                  <option value="Airtel to Jio">Airtel to Jio Porting</option>
                  <option value="Vi to Jio">Vi to Jio Porting</option>
                  <option value="BSNL to Jio">BSNL to Jio Porting</option>
                  <option value="Other Operator to Jio">Other Operator to Jio</option>
                  <option value="New Jio SIM Booking">New Jio SIM Booking</option>
                </select>
              </div>

            </div>

            {/* Row 3: Full Address */}
            <div className="space-y-1.5">
              <label className="block text-xs sm:text-sm font-bold text-slate-800">
                {t.form.addressLabel} <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute top-3.5 left-3.5 pointer-events-none text-slate-400">
                  <MapPin className="w-4 h-4" />
                </div>
                <textarea
                  name="fullAddress"
                  rows={2}
                  value={formData.fullAddress}
                  onChange={handleChange}
                  placeholder={t.form.addressPlaceholder}
                  className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl border text-sm focus:outline-none transition-colors ${
                    errors.fullAddress
                      ? 'border-rose-400 bg-rose-50/50 focus:ring-2 focus:ring-rose-200'
                      : 'border-slate-300 focus:border-[#00A86B] focus:ring-2 focus:ring-emerald-100'
                  }`}
                />
              </div>
              {errors.fullAddress && (
                <p className="text-xs text-rose-600 font-medium">{errors.fullAddress}</p>
              )}
            </div>

            {/* Row 4: City / Area & PIN Code & Booking Date */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              
              {/* City / Area */}
              <div className="space-y-1.5">
                <label className="block text-xs sm:text-sm font-bold text-slate-800">
                  {t.form.cityLabel} <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  name="cityArea"
                  value={formData.cityArea}
                  onChange={handleChange}
                  placeholder={t.form.cityPlaceholder}
                  className={`w-full px-3.5 py-3 rounded-xl border text-sm focus:outline-none transition-colors ${
                    errors.cityArea
                      ? 'border-rose-400 bg-rose-50/50'
                      : 'border-slate-300 focus:border-[#00A86B] focus:ring-2 focus:ring-emerald-100'
                  }`}
                />
                {errors.cityArea && (
                  <p className="text-xs text-rose-600 font-medium">{errors.cityArea}</p>
                )}
              </div>

              {/* PIN Code */}
              <div className="space-y-1.5">
                <label className="block text-xs sm:text-sm font-bold text-slate-800">
                  {t.form.pinLabel} <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  name="pinCode"
                  maxLength={6}
                  value={formData.pinCode}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, '');
                    setFormData((p) => ({ ...p, pinCode: val }));
                    if (errors.pinCode) {
                      setErrors((p) => {
                        const n = { ...p };
                        delete n.pinCode;
                        return n;
                      });
                    }
                  }}
                  placeholder={t.form.pinPlaceholder}
                  className={`w-full px-3.5 py-3 rounded-xl border text-sm focus:outline-none transition-colors ${
                    errors.pinCode
                      ? 'border-rose-400 bg-rose-50/50'
                      : 'border-slate-300 focus:border-[#00A86B] focus:ring-2 focus:ring-emerald-100'
                  }`}
                />
                {errors.pinCode && (
                  <p className="text-xs text-rose-600 font-medium">{errors.pinCode}</p>
                )}
              </div>

              {/* Preferred Booking Date */}
              <div className="space-y-1.5">
                <label className="block text-xs sm:text-sm font-bold text-slate-800">
                  {t.form.dateLabel} <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="date"
                    name="preferredDate"
                    min={todayStr}
                    value={formData.preferredDate}
                    onChange={handleChange}
                    className={`w-full px-3.5 py-3 rounded-xl border text-sm focus:outline-none transition-colors bg-white ${
                      errors.preferredDate
                        ? 'border-rose-400 bg-rose-50/50'
                        : 'border-slate-300 focus:border-[#00A86B] focus:ring-2 focus:ring-emerald-100'
                    }`}
                  />
                </div>
                {errors.preferredDate && (
                  <p className="text-xs text-rose-600 font-medium">{errors.preferredDate}</p>
                )}
              </div>

            </div>

            {/* Row 5: Additional Message */}
            <div className="space-y-1.5">
              <label className="block text-xs sm:text-sm font-bold text-slate-800">
                {t.form.messageLabel}
              </label>
              <textarea
                name="additionalMessage"
                rows={2}
                value={formData.additionalMessage}
                onChange={handleChange}
                placeholder={t.form.messagePlaceholder}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#00A86B] focus:ring-2 focus:ring-emerald-100"
              />
            </div>

            {/* Privacy & Zero Sensitive Data Guarantee */}
            <div className="flex items-center gap-2.5 p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
              <Lock className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{t.form.securityNotice}</span>
            </div>

            {/* Submit Booking Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 rounded-2xl font-bold text-base sm:text-lg text-white bg-[#00A86B] hover:bg-[#00915c] shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-3 cursor-pointer active:scale-[0.99] disabled:opacity-70"
              >
                <Send className="w-5 h-5" />
                <span>{isSubmitting ? t.form.submitting : t.form.submitBtn}</span>
              </button>
            </div>

            <p className="text-center text-xs text-slate-500 pt-1">
              {lang === 'hi'
                ? 'सबमिट करते ही व्हाट्सएप में मैसेज तैयार हो जाएगा। कृपया कन्फर्म करने के लिए "Send" अवश्य दबाएं।'
                : 'Clicking submit automatically opens WhatsApp. You must manually press Send in WhatsApp.'}
            </p>

          </form>

        </div>

      </div>
    </section>
  );
};
