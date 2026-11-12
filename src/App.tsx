/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { MNPServices } from './components/MNPServices';
import { PortingGuide } from './components/PortingGuide';
import { BookingForm } from './components/BookingForm';
import { BookingConfirmationModal } from './components/BookingConfirmationModal';
import { ContactSection } from './components/ContactSection';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { LegalModals, LegalModalType } from './components/LegalModals';
import { FloatingMobileCTA } from './components/FloatingMobileCTA';
import { Language, ServiceType, Operator, BookingFormData } from './types';

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [selectedService, setSelectedService] = useState<ServiceType>('Airtel to Jio');
  const [selectedOperator, setSelectedOperator] = useState<Operator>('Airtel');

  // Booking Confirmation Modal State
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [confirmationFormData, setConfirmationFormData] = useState<BookingFormData | null>(null);

  // Legal Modal State
  const [legalModalType, setLegalModalType] = useState<LegalModalType>(null);

  // Toggle Language Handler
  const handleToggleLang = () => {
    setLang((prev) => (prev === 'en' ? 'hi' : 'en'));
  };

  // Select service from Hero or Service Card and scroll to Booking Form
  const handleSelectServiceAndBook = (service: ServiceType, operator?: Operator) => {
    setSelectedService(service);
    if (operator) {
      setSelectedOperator(operator);
    } else {
      if (service.startsWith('Airtel')) setSelectedOperator('Airtel');
      else if (service.startsWith('Vi')) setSelectedOperator('Vi');
      else if (service.startsWith('BSNL')) setSelectedOperator('BSNL');
      else if (service.startsWith('Other')) setSelectedOperator('Other');
    }

    const formElement = document.getElementById('booking-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        const nameInput = document.querySelector<HTMLInputElement>('input[name="fullName"]');
        if (nameInput) nameInput.focus();
      }, 500);
    }
  };

  // Navigate to booking form
  const handleNavigateToBooking = () => {
    const formElement = document.getElementById('booking-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Booking submission handler - triggered after WhatsApp URL opened
  const handleBookingSubmitted = (formattedMessage: string, formData: BookingFormData) => {
    setConfirmationMessage(formattedMessage);
    setConfirmationFormData(formData);
    setIsConfirmationOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 pb-14 sm:pb-0">
      
      {/* Header */}
      <Header
        lang={lang}
        onToggleLang={handleToggleLang}
        onNavigateToBooking={handleNavigateToBooking}
      />

      {/* Main Content Sections */}
      <main className="grow">
        
        {/* 1. Homepage Hero Section */}
        <Hero
          lang={lang}
          onSelectServiceAndBook={handleSelectServiceAndBook}
          onNavigateToBooking={handleNavigateToBooking}
        />

        {/* 2. MNP Services (5 Distinct Cards) */}
        <MNPServices
          lang={lang}
          onSelectServiceAndBook={handleSelectServiceAndBook}
        />

        {/* 3. Step-by-Step How SIM Porting Works & UPC Code Generator Tool */}
        <PortingGuide lang={lang} />

        {/* 4. Customer Booking Form */}
        <BookingForm
          lang={lang}
          selectedService={selectedService}
          selectedOperator={selectedOperator}
          onBookingSubmitted={handleBookingSubmitted}
        />

        {/* 5. Contact Section */}
        <ContactSection lang={lang} />

        {/* 6. Frequently Asked Questions */}
        <FAQSection lang={lang} />

      </main>

      {/* Footer */}
      <Footer
        lang={lang}
        onOpenLegal={(type) => setLegalModalType(type)}
      />

      {/* Sticky Mobile Quick Action Bar (Under 15% sticky cap) */}
      <FloatingMobileCTA
        lang={lang}
        onNavigateToBooking={handleNavigateToBooking}
      />

      {/* Requirement #6: Booking Confirmation Modal (Never falsely confirms before customer sends message) */}
      <BookingConfirmationModal
        isOpen={isConfirmationOpen}
        onClose={() => setIsConfirmationOpen(false)}
        lang={lang}
        messageText={confirmationMessage}
        formData={confirmationFormData}
      />

      {/* Legal Modals: Privacy Policy, Terms & Conditions, About Us */}
      <LegalModals
        modalType={legalModalType}
        onClose={() => setLegalModalType(null)}
        lang={lang}
      />

    </div>
  );
}
