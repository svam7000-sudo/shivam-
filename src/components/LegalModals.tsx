import React from 'react';
import { X, ShieldCheck, FileText, Info } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { BUSINESS_CONFIG } from '../config';

export type LegalModalType = 'privacy' | 'terms' | 'about' | null;

interface LegalModalsProps {
  modalType: LegalModalType;
  onClose: () => void;
  lang: Language;
}

export const LegalModals: React.FC<LegalModalsProps> = ({
  modalType,
  onClose,
  lang,
}) => {
  if (!modalType) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl border border-slate-200 relative"
        role="dialog"
      >
        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-slate-200 flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            {modalType === 'privacy' && <ShieldCheck className="w-5 h-5 text-[#00A86B]" />}
            {modalType === 'terms' && <FileText className="w-5 h-5 text-[#00A86B]" />}
            {modalType === 'about' && <Info className="w-5 h-5 text-[#00A86B]" />}
            <h3 className="text-lg font-bold text-[#0B192C]">
              {modalType === 'privacy' && (lang === 'hi' ? 'गोपनीयता नीति (Privacy Policy)' : 'Privacy Policy')}
              {modalType === 'terms' && (lang === 'hi' ? 'नियम एवं शर्तें (Terms & Conditions)' : 'Terms & Conditions')}
              {modalType === 'about' && (lang === 'hi' ? 'हमारे बारे में (About Us)' : 'About Shivam MNP Booking')}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-5 text-sm text-slate-600 leading-relaxed">
          {modalType === 'privacy' && (
            <>
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-900">
                {lang === 'hi'
                  ? 'महत्वपूर्ण सुरक्षा वादा: हम इस वेबसाइट पर कोई भी आधार फोटो, बैंक विवरण या ओटीपी नहीं मांगते हैं।'
                  : 'Important Privacy Commitment: We never collect Aadhaar photos, bank info, or OTPs on this website.'}
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 text-base">1. Customer Information Handling</h4>
                <p>
                  SHIVAM MNP BOOKING operates as an independent doorstep telecom facilitator in Sasaram, Bihar.
                  When you submit the booking form, your contact details (Name, Phone number, Address, Date) are
                  packaged directly into a WhatsApp message sent to our official business number.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 text-base">2. No Online Storage of Sensitive Data</h4>
                <p>
                  We do NOT store your address, phone number, or personal details on any external cloud database.
                  Your booking details are transmitted via end-to-end encrypted WhatsApp chat directly to the
                  business owner, Shivam Kumar, solely for coordinating doorstep delivery.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 text-base">3. Verification & Aadhaar Guidelines</h4>
                <p>
                  All SIM card activations and biometric Aadhaar verifications are performed in-person at your
                  doorstep using official telecom POS terminals as mandated by the Department of
                  Telecommunications (DoT) and TRAI.
                </p>
              </div>
            </>
          )}

          {modalType === 'terms' && (
            <>
              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 text-base">1. MNP Eligibility Guidelines (TRAI)</h4>
                <p>
                  In accordance with Telecom Regulatory Authority of India (TRAI) regulations, a SIM card must be
                  active on the donor network for at least 90 calendar days to be eligible for Mobile Number
                  Portability (MNP). All outstanding postpaid bills or negative balances must be cleared.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 text-base">2. Doorstep Delivery Coverage</h4>
                <p>
                  Free home delivery of SIM cards is available throughout Sasaram town and adjacent localities in
                  Rohtas district, Bihar. Preferred appointment dates are subject to local executive schedule and
                  operational confirmation via WhatsApp.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 text-base">3. Physical Verification Requirement</h4>
                <p>
                  The original subscriber whose name is registered on the SIM card must be physically present with
                  their valid Original Aadhaar card for live digital verification.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 text-base">4. Independent Facilitator Disclaimer</h4>
                <p>
                  SHIVAM MNP BOOKING is an independent authorized telecom retailer and facilitator. All brand names
                  including Jio, Airtel, Vi, and BSNL are registered trademarks of their respective owners.
                </p>
              </div>
            </>
          )}

          {modalType === 'about' && (
            <>
              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 text-base">About SHIVAM MNP BOOKING</h4>
                <p>
                  Founded and operated by <strong>Shivam Kumar</strong> in Sasaram, Bihar, SHIVAM MNP BOOKING
                  was created to eliminate long queues at mobile retail stores and make mobile number porting
                  effortless.
                </p>
                <p>
                  Whether you want to port your existing number from Airtel, Vi, or BSNL to Jio True 5G, or book a
                  fresh new Jio connection for your home, our executive delivers the SIM directly to your doorstep
                  with paperless biometric activation in minutes.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                <p className="font-bold text-slate-800">Business Summary:</p>
                <p>Owner: Shivam Kumar</p>
                <p>Service Area: Sasaram, Rohtas District, Bihar</p>
                <p>Services: Jio MNP, New SIM Booking, Home SIM Delivery & E-KYC</p>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-[#0B192C] text-white hover:bg-slate-800 cursor-pointer"
          >
            {lang === 'hi' ? 'ठीक है (Close)' : 'Close Window'}
          </button>
        </div>
      </div>
    </div>
  );
};
