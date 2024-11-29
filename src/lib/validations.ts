import { z } from "zod";

export const UserFormValidation = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(5, "Name must be at least 5 characters")
    .max(50, "Name must be at most 50 characters"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  phone: z
    .string()
    .min(1, "Phone number is required").min(10, "Phone number must be at least 10 characters")
    .refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number"),
});

export const PatientFormValidation = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(5, "Name must be at least 5 characters")
    .max(50, "Name must be at most 50 characters"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number"),
  birthDate: z.coerce.date(),
  gender: z.enum(["Male", "Female", "Other"]),
  address: z
    .string()
    .min(1, "Address is required")
    .min(5, "Address must be at least 5 characters")
    .max(500, "Address must be at most 500 characters"),
  occupation: z
    .string()
    .min(1, "Occupation is required")
    .min(2, "Occupation must be at least 2 characters")
    .max(500, "Occupation must be at most 500 characters"),
  emergencyContactName: z
    .string()
    .min(1, "Emergency contact name is required")
    .min(2, "Contact name must be at least 2 characters")
    .max(50, "Contact name must be at most 50 characters"),
  emergencyContactNumber: z
    .string()
    .min(1, "Contact number is required")
    .min(10, "Contact number must be at least 10 characters")
    .refine(
      (emergencyContactNumber) => /^\+\d{10,15}$/.test(emergencyContactNumber),
      "Invalid phone number"
    ),
  primaryPhysician: z.string().min(2, "Select at least one doctor"),
  insuranceProvider: z
    .string()
    .min(1, "Insurance provider is required")
    .min(2, "Insurance name must be at least 2 characters")
    .max(50, "Insurance name must be at most 50 characters"),
  insurancePolicyNumber: z
    .string()
    .min(2, "Policy number must be at least 2 characters")
    .max(50, "Policy number must be at most 50 characters"),
  bloodType: z.string().min(1, "Blood type is required"),
  allergies: z.string().optional(),
  currentMedication: z.string().optional(),
  familyMedicalHistory: z.string().optional(),
  pastMedicalHistory: z.string().optional(),
  identificationType: z.string(),
  identificationNumber: z.string(),
  identificationDocument: z.custom<File[]>(),
  treatmentConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: "You must consent to treatment in order to proceed",
    }),
  disclosureConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: "You must consent to disclosure in order to proceed",
    }),
  privacyConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: "You must consent to privacy in order to proceed",
    }),
});

export const CreateAppointmentSchema = z.object({
  primaryPhysician: z.string().min(2, "Select at least one doctor"),
  schedule: z.coerce.date(),
  reason: z
    .string()
    .min(2, "Reason must be at least 2 characters")
    .max(500, "Reason must be at most 500 characters"),
  note: z.string().optional(),
  cancellationReason: z.string().optional(),
});

export const ScheduleAppointmentSchema = z.object({
  primaryPhysician: z.string().min(2, "Select at least one doctor"),
  schedule: z.coerce.date(),
  reason: z.string().optional(),
  note: z.string().optional(),
  cancellationReason: z.string().optional(),
});

export const CancelAppointmentSchema = z.object({
  cancellationReason: z
    .string()
    .min(5, "Reason must be at least 5 characters")
    .max(500, "Reason must be at most 500 characters"),
});

export function getAppointmentSchema(type: string) {
  switch (type) {
    case "create":
      return CreateAppointmentSchema;
    case "cancel":
      return CancelAppointmentSchema;
    default:
      return ScheduleAppointmentSchema;
  }
}

export const MedicalNoteSchema = z.object({
  height: z
  .number()
  .min(1, "Height is required")
  .min(50, "Height must be at least 50 cm")
  .max(300, "Height must be at most 300 cm"),
  weight: z
  .number()
  .min(1, "Weight is required")
  .min(1, "Weight must be at least 1 kg")
  .max(300, "Weight must be at most 300 kg"),
  bloodPressure: z
  .string()
  .min(1, "Blood pressure is required")
  .regex(/^\d{2,3}\/\d{2,3}$/, "Blood pressure must follow the format '120/80'")
  .refine((val) => {
    const [systolic, diastolic] = val.split("/").map(Number);
    return systolic >= 50 && systolic <= 200 && diastolic >= 30 && diastolic <= 130;
  }, "Blood pressure values must be within a reasonable range"),
  heartRate: z
  .number()
  .min(1, "Heart rate is required")
  .min(30, "Heart rate must be at least 30 bpm")
  .max(220, "Heart rate must be at most 220 bpm"),
  temperature: z
  .number()
  .min(1, "Temperature is required")
  .min(35, "Temperature must be at least 34°C")
  .max(45, "Temperature must be at most 45°C"),
  oxygenSaturation: z
  .number()
  .min(1, "Oxygen saturation is required")
  .min(50, "Oxygen saturation must be at least 50%")
  .max(100, "Oxygen saturation must be at most 100%"),
  pdf: z
  .custom<File[]>()
  .refine(
    (files) => files.length === 1 && files[0].type === "application/pdf",
    "You must upload a valid PDF file"
  ),
});