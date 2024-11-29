export interface Patient{
  userId: string;
  name: string;
  email: string;
  phone: string;
  birthDate: Date;
  gender: Gender | string[];
  address: string;
  occupation: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
  primaryPhysician: string;
  insuranceProvider: string;
  insurancePolicyNumber: string;
  bloodType: BloodType;
  allergies: string | undefined;
  currentMedication: string | undefined;
  familyMedicalHistory: string | undefined;
  pastMedicalHistory: string | undefined;
  identificationType: string | undefined;
  identificationNumber: string | undefined;
  identificationDocument: FormData | undefined;
  privacyConsent: boolean;
}

export interface Appointment {
  appointmentId: string;
  patient: Patient;
  schedule: Date;
  status?: Status;
  primaryPhysician: string | PrimaryPhysician | PrimaryPhysician[];
  reason?: string;
  note?: string;
  userId: string | UserDetails | UserDetails[]
  cancellationReason?: string | null;
  createdAt?: Date; 
}


export interface MedicalNote{
  noteId: string;
  height: string;
  weight: string;
  bloodPressure: string;
  heartRate: string;
  temperature: string;
  oxygenSaturation: string;
  muscleMassIndex: number | string;
  userId: string;
  appointmentId: string;
}


export enum FormFieldTypes {
  INPUT="input",
  TEXTAREA="textarea",
  PHONE_INPUT="phoneInput",
  CHECKBOX="checkbox",
  DATE_PICKER= "datePicker",
  SELECT=  "select",
  SKELETON= "skeleton",
}