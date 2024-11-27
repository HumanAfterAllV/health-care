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
  primaryPhysician: string | Record<string,string>;
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


export interface Appointment{
  appointmentId: string;
  patient: Patient;
  schedule: Date;
  status: Status;
  primaryPhysician: PrimaryPhysician | Record<string, string>;
  reason: string;
  note: string;
  userId: string;
  cancellationReason?: string | null;
  createdAt: Date;
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