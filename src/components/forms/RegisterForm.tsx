"use client"

import Image from "next/image"
import { useState } from "react"
import { useRouter } from "next/navigation"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Form, FormControl } from "@/components/ui/form"
import { SelectItem } from "../ui/select"
import { Label } from "../ui/label"

import { PatientFormValidation } from "@/lib/validations"
import { registerPatient } from "@/lib/actions/patient.actions"

import { BloodTypes, Doctors, GenderOptions, IdentificationTypes, PatientFormDefaultValues } from "@/constants"

import { FormFieldTypes } from "@/types/supabase.types"

import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import FileUploader from "../FileUploader"
 
 
export default function RegisterForm({user}: {user: User}): JSX.Element {
    const router = useRouter()

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [files, setFiles] = useState<File[]>([])

    const form = useForm<z.infer<typeof PatientFormValidation>>({
        resolver: zodResolver(PatientFormValidation),
        defaultValues: {
            ...PatientFormDefaultValues,
            name: user.name,
            email: user.email,
            phone: user.phone,
        },
    })
 
  async function onSubmit(values: z.infer<typeof PatientFormValidation>) {
    setIsLoading(true);

    let identificationDocument: File | null = null;

    if(files.length > 0){
        identificationDocument = files[0];
        console.log(`Identification document: ${identificationDocument}`);
    }

    try {
        const patientData = {
            ...values,
            userId: user.userId,
            birthDate: new Date(values.birthDate),
            identificationDocument,
        }
        
        console.log(`Patient data:`, JSON.stringify(patientData, null, 2));
        const patient = await registerPatient(patientData);
        if(patient) router.push(`/patients/${user.userId}/new-appointment`);
    }
    catch (error) {
        console.error('Error creating patient:', error);
    }
    finally{
        setIsLoading(false);
    }
  }
    return(
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 flex-1">
                <section className="space-y-4">
                    <h1 className="header">Welcome</h1>
                    <p className="text-dark-700">Let us know more about yourself.</p>
                </section>
                <section className="space-y-6">
                    <div className="mb-9 space-y-1">
                        <h2 className="sub-header">Personal information.</h2>
                    </div>
                </section>

                <CustomFormField
                    fieldType={FormFieldTypes.INPUT}
                    control={form.control}
                    name="name"
                    placeholder="Your name"
                    iconSrc="/assets/icons/user.svg"
                    iconAlt="user"
                />

                <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomFormField
                        fieldType={FormFieldTypes.INPUT}
                        control={form.control}
                        name="email"
                        label="Email"
                        placeholder="Your email"
                        iconSrc="/assets/icons/email.svg"
                        iconAlt="email"
                    />
                    <CustomFormField
                        fieldType={FormFieldTypes.PHONE_INPUT}
                        control={form.control}
                        name="phone"
                        label="Phone number"
                        placeholder="Your phone number"
                    />
                </div>

                <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomFormField
                        fieldType={FormFieldTypes.DATE_PICKER}
                        control={form.control}
                        name="birthDate"
                        label="Date of Birth"
                        placeholder="Your email"
                    />
                    <CustomFormField
                        fieldType={FormFieldTypes.SKELETON}
                        control={form.control}
                        name="gender"
                        label="Gender"
                        renderSkeleton={(field) => (
                            <FormControl>
                                <RadioGroup 
                                    className="flex h-11 gap-6 xl:justify-between" 
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    {GenderOptions.map((option, i) => (
                                        <div key={option + i} className="radio-group">
                                            <RadioGroupItem value={option} id={option}/>
                                            <Label htmlFor={option} className="cursor-pointer">
                                                    {option}
                                            </Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            </FormControl>
                        )}
                    />
                </div>

                <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomFormField
                        fieldType={FormFieldTypes.INPUT}
                        control={form.control}
                        name="address"
                        label="Address"
                        placeholder="Address"
                    />
                    <CustomFormField
                        fieldType={FormFieldTypes.INPUT}
                        control={form.control}
                        name="occupation"
                        placeholder="Occupation"
                        label="Occupation"
                    />
                </div>
                <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomFormField
                        fieldType={FormFieldTypes.INPUT}
                        control={form.control}
                        name="emergencyContactName"
                        label="Emergency contact name"
                        placeholder="Contact name"
                    />
                    <CustomFormField
                        fieldType={FormFieldTypes.PHONE_INPUT}
                        control={form.control}
                        name="emergencyContactNumber"
                        label="Emergency contact number"
                        placeholder="Contact number"
                    />
                </div>
                <section className="space-y-6">
                    <div className="mb-9 space-y-1">
                        <h2 className="sub-header">Medical information.</h2>
                    </div>
                </section>
                <CustomFormField
                    fieldType={FormFieldTypes.SELECT}
                    control={form.control}
                    name="primaryPhysician"
                    label="Primary physician"
                    placeholder="Select a physician"
                >
                    {Doctors.map((doctor) => (
                        <SelectItem key={doctor.name} value={doctor.name} className="hover:bg-gray-100">
                            <div className="flex cursor-pointer items-center gap-2">
                                <Image 
                                    src={doctor.image} 
                                    alt={doctor.name} 
                                    height={32} 
                                    width={32}
                                    className="rounded-full border border-dark-500"
                                />
                                <p>{doctor.name} - {doctor.specialty!}</p>
                            </div>
                        </SelectItem>
                    ))}
                </CustomFormField>
                <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomFormField
                        fieldType={FormFieldTypes.INPUT}
                        control={form.control}
                        name="insuranceProvider"
                        label="Insurance provider"
                        placeholder="Provider"
                    />
                    <CustomFormField
                        fieldType={FormFieldTypes.INPUT}
                        control={form.control}
                        name="insurancePolicyNumber"
                        label="Policy number"
                        placeholder="Policy number"
                    />

                    <CustomFormField
                        fieldType={FormFieldTypes.SELECT}
                        control={form.control}
                        name="bloodType"
                        label="Blood type"
                        placeholder="Select blood type"
                    >
                        {BloodTypes.map((type) => (
                            <SelectItem value={type} key={type} className="flex cursor-pointer hover:bg-gray-100">
                                {type}
                            </SelectItem>
                        ))}
                    </CustomFormField>
                </div>
                <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomFormField
                        fieldType={FormFieldTypes.TEXTAREA}
                        control={form.control}
                        name="allergies"
                        label="Allergies (if any)"
                        placeholder="Peanuts, Pollen, etc."
                    />
                    <CustomFormField
                        fieldType={FormFieldTypes.TEXTAREA}
                        control={form.control}
                        name="currentMedication"
                        label="Current medication (if any)"
                        placeholder="Ibuprofen, Paracetamol, etc."
                    />
                </div>
                <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomFormField
                        fieldType={FormFieldTypes.TEXTAREA}
                        control={form.control}
                        name="familyMedicalHistory"
                        label="Family medical history"
                        placeholder="Father had heart disease, etc."
                    />
                    <CustomFormField
                        fieldType={FormFieldTypes.TEXTAREA}
                        control={form.control}
                        name="pastMedicalHistory"
                        label="Past medical history"
                        placeholder="Broken arm, etc."
                    />
                </div>
                <section className="space-y-6">
                    <div className="mb-9 space-y-1">
                        <h2 className="sub-header">Identification and Verification.</h2>
                    </div>
                </section>
                <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomFormField
                        fieldType={FormFieldTypes.SELECT}
                        control={form.control}
                        name="identificationType"
                        label="Identification type"
                        placeholder="Select an identification type"
                    >
                        {IdentificationTypes.map((type) => (
                            <SelectItem key={type} value={type} className="cursor-pointer hover:bg-gray-100">
                                {type}
                            </SelectItem>
                        ))}
                    </CustomFormField>
                    <CustomFormField
                        fieldType={FormFieldTypes.INPUT}
                        control={form.control}
                        name="identificationNumber"
                        label="Identification number"
                        placeholder="123456"
                    />
                </div>

                <CustomFormField
                    fieldType={FormFieldTypes.SKELETON}
                    control={form.control}
                    name="identificationDocument"
                    label="Scanned copy of identification document"
                    renderSkeleton={() => (
                        <FormControl>
                            <FileUploader files={files} onChange={(newFiles) => setFiles(newFiles)}/>
                        </FormControl>
                    )}
                />

                <section className="space-y-6">
                    <div className="mb-9 space-y-1">
                        <h2 className="sub-header">Consent and Privacy</h2>
                    </div>
                </section>

                <CustomFormField
                    fieldType={FormFieldTypes.CHECKBOX}
                    control={form.control}
                    name="treatmentConsent"
                    label="I consent to the terms and conditions"
                />
                <CustomFormField
                    fieldType={FormFieldTypes.CHECKBOX}
                    control={form.control}
                    name="privacyConsent"
                    label="I consent to privacy policy"
                />
                <CustomFormField
                    fieldType={FormFieldTypes.CHECKBOX}
                    control={form.control}
                    name="disclosureConsent"
                    label="I consent to disclosure policy"
                />
  
                <SubmitButton isLoading={isLoading}>
                    Get Started
                </SubmitButton>
            </form>
      </Form>
    )
}