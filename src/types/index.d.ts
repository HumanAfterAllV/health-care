/* eslint-disable no-unused-vars */

declare type SearchParamProps = {
    params: { [key: string]: string };
    searchParams: { [key: string]: string | string[] | undefined };
  };

  declare type Gender = "Male" | "Female" | "Other";
  declare type Status = "pending" | "scheduled" | "cancelled" | "completed"?;
  declare type BloodType = "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";

  
  declare interface CreateUserParams {
    name: string;
    email: string;
    phone: string;
  }
  declare interface User extends CreateUserParams {
    userId: string;
  }
  
  declare interface RegisterUserParams extends CreateUserParams {
    userId: string;
    birthDate: Date;
    gender: Gender;
    address: string;
    occupation: string;
    emergencyContactName: string;
    emergencyContactNumber: string;
    primaryPhysician:string;
    insuranceProvider?: string;
    insurancePolicyNumber?: string;
    allergies?: string | undefined;
    currentMedication?: string | undefined;
    familyMedicalHistory?: string | undefined;
    pastMedicalHistory?: string | undefined;
    identificationType?: string | undefined;
    identificationNumber?: string | undefined;
    identificationDocument?: File | File[] | undefined | null;
    privacyConsent: boolean;
  }
  
  declare type CreateAppointmentParams = {
    userId: string;
    patient: string;
    primaryPhysician: string | PrimaryPhysicianDetails;
    reason: string;
    schedule: Date;
    status: Status;
    note: string | undefined;
  };
  
  declare type UpdateAppointmentParams = {
    appointmentId: string;
    userId: string;
    appointment: Appointment;
    type: string;
  };


  declare interface CreateMedicalNoteParams {
    noteId: string;
    pdf: File[] | File | undefined;
    height: number | string;
    weight: number | string;
    bloodPressure: string;
    heartRate: string;
    temperature: string;
    oxygenSaturation: string;
    muscleMassIndex: string;
    userId: string;
    appointmentId: string;
  }

  declare interface PrimaryPhysician {
    name?: string;
    specialty?: string;
    doctor_id?: string;
  };

  declare interface UserDetails {
    userId?: string;
    name?: string;
    gender?: string;
    birthDate?:  Date;
    allergies?: string;
    bloodType?: BloodType;
    currentMedication?: string;
    familyMedicalHistory?: string;
    pastMedicalHistory?: string;
  }


  