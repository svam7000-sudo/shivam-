export type Language = 'en' | 'hi';

export type Operator = 'Airtel' | 'Vi' | 'BSNL' | 'Other';

export type ServiceType = 
  | 'Airtel to Jio'
  | 'Vi to Jio'
  | 'BSNL to Jio'
  | 'Other Operator to Jio'
  | 'New Jio SIM Booking';

export interface BookingFormData {
  fullName: string;
  mobileNumber: string;
  currentOperator: Operator;
  serviceRequired: ServiceType;
  fullAddress: string;
  cityArea: string;
  pinCode: string;
  preferredDate: string;
  additionalMessage: string;
}

export interface ServiceCardData {
  id: string;
  title: string;
  titleHi: string;
  fromOperator: Operator | 'None';
  toOperator: 'Jio';
  serviceType: ServiceType;
  tagline: string;
  taglineHi: string;
  badge: string;
  badgeHi: string;
  benefits: string[];
  benefitsHi: string[];
  popular?: boolean;
}
