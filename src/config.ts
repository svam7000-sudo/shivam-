/**
 * SHIVAM MNP BOOKING - Configuration
 * Business WhatsApp & Contact: 9162029954
 */

export const BUSINESS_CONFIG = {
  businessName: 'SHIVAM MNP BOOKING',
  ownerName: 'SHIVAM KUMAR',
  location: 'Sasaram, Bihar',
  addressDetail: 'Sasaram, District Rohtas, Bihar, PIN: 821115',
  defaultWhatsAppNumber: '919162029954', // 91 + 9162029954
  displayPhone: '+91 91620 29954',
  rawMobile: '9162029954',
  email: 'shivamart69@gmail.com',
  workingHours: '9:00 AM - 8:00 PM (Monday to Sunday)',
  servicesOffered: 'Jio MNP, New SIM, Home MNP Service',
  serviceAreas: [
    'Sasaram Town',
    'Fazalganj',
    'Gaurakshani',
    'Old GT Road',
    'Rauza',
    'Sher Shah Suri Tomb Area',
    'Karamchat',
    'Nearby Rohtas Rural Localities'
  ],
  pricingNote: 'Free Doorstep SIM Delivery & Porting Assistance'
};

export function getActiveWhatsAppNumber(): string {
  return BUSINESS_CONFIG.defaultWhatsAppNumber;
}

/**
 * Creates the formatted WhatsApp click-to-chat URL per requirement #5:
 * NEW MNP BOOKING
 * Customer Name: [Name]
 * Mobile Number: [Number]
 * Current Operator: [Operator]
 * Service Required: [Service]
 * Full Address: [Address]
 * City: [City]
 * PIN Code: [PIN Code]
 * Booking Date: [Date]
 * Additional Message: [Message]
 */
export function buildWhatsAppBookingMessage(params: {
  fullName: string;
  mobileNumber: string;
  currentOperator: string;
  serviceRequired: string;
  fullAddress: string;
  cityArea: string;
  pinCode: string;
  preferredDate: string;
  additionalMessage: string;
}): string {
  return [
    'NEW MNP BOOKING',
    `Customer Name: ${params.fullName.trim()}`,
    `Mobile Number: ${params.mobileNumber.trim()}`,
    `Current Operator: ${params.currentOperator}`,
    `Service Required: ${params.serviceRequired}`,
    `Full Address: ${params.fullAddress.trim()}`,
    `City: ${params.cityArea.trim()}`,
    `PIN Code: ${params.pinCode.trim()}`,
    `Booking Date: ${params.preferredDate}`,
    `Additional Message: ${params.additionalMessage.trim() || 'N/A'}`
  ].join('\n');
}

export function getWhatsAppUrl(phone: string, text: string): string {
  const cleanPhone = phone.replace(/\D/g, '');
  const encodedText = encodeURIComponent(text);
  // Using https://api.whatsapp.com/send works seamlessly across desktop, Android, and iOS browsers
  return `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodedText}`;
}
