"use client"
 
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Form } from "@/components/ui/form"
import { SelectItem } from "../ui/select"

import { FormFieldTypes } from "./PatientForms"
import { Doctors } from "@/constants"
import { getAppointmentSchema } from "@/lib/validations"
import { createAppointment } from "@/lib/actions/appointment.actions"

import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"

interface AppointmentFormProps {
    type: "create" | "cancel" | "schedule";
    userId: string;
    patient: any;
}

export default function AppointmentForm({ type, userId, patient }: AppointmentFormProps): JSX.Element {
    const router = useRouter()

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const AppointmentFormValidation = getAppointmentSchema(type)

    const form = useForm<z.infer<typeof AppointmentFormValidation>>({
        resolver: zodResolver(AppointmentFormValidation),
        defaultValues: {
            primaryPhysician: "",
            schedule: new Date(),
            reason: "",
            note: "",
            cancellationReason: "",
        },
    })
 
    async function onSubmit(values : z.infer<typeof AppointmentFormValidation>) {
        setIsLoading(true);

        let status;

        switch (type) {
            case "schedule":
                status = "scheduled";
                break;
            case "cancel":
                status = "canceled";
                break;
            default:
                status = "pending";
                break;
        }
        try {
            if(type === "create" && patient){
                const appointmentData = {
                    userId,
                    patient: patient.name,
                    primaryPhysician: values.primaryPhysician,
                    schedule: new Date(values.schedule),
                    reason: values.reason!,
                    note: values.note,
                    status: status as Status,

                }
                const newAppointment = await createAppointment(appointmentData);

                console.log(newAppointment)
                console.log("Redirecting with userId:", userId);
                console.log("Redirecting with appointmentId:", newAppointment.appointmentId);

                if(newAppointment?.appointmentId){
                    form.reset();
                    router.push(`/patients/${userId}/new-appointment/success?appointmentId=${newAppointment.appointmentId}`)
                }
                else {
                    console.error("Failed to redirect: Missing appointmentId.");
                }
            }


        }
        catch (error) {
            console.log(error)
        }
        finally{
            setIsLoading(false)
        }
    }

  let buttonLabel;
  
  switch (type){
    case "cancel":
        buttonLabel = "Cancel Appointment";
        break;
    case "create":
        buttonLabel = "Create Appointment";
        break;
    case "schedule":
        buttonLabel = "Schedule Appointment";
        break;
    default:
        break;
  }
    return(
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
                <section className="mb-12 space-y-4">
                    <h1 className="header">New Appointment</h1>
                    <p className="text-dark-700">Request a new appointment in 10 seconds.</p>
                </section>

                {type !== "cancel" && (
                    <>
                        <CustomFormField
                            fieldType={FormFieldTypes.SELECT}
                            control={form.control}
                            name="primaryPhysician"
                            label="Doctor"
                            placeholder="Select doctor"
                        >
                            {Doctors.map((doctor) => (
                                <SelectItem key={doctor.name} value={doctor.name}>
                                    <div className="flex cursor-pointer items-center gap-2">
                                        <Image 
                                            src={doctor.image} 
                                            alt={doctor.name} 
                                            height={32} 
                                            width={32}
                                            className="rounded-full border border-dark-500"
                                        />
                                        <p>{doctor.name}</p>
                                    </div>
                                </SelectItem>
                            ))}
                        </CustomFormField>

                        <CustomFormField
                            fieldType={FormFieldTypes.DATE_PICKER}
                            control={form.control}
                            name="schedule"
                            label="Expected appointment date and time"
                            showTimeSelect
                            dateFormat="MM/dd/yyyy  -  h:mm aa"
                        />
                        <div className="flex flex-col gap-6 xl:flex-row">
                            <CustomFormField
                                fieldType={FormFieldTypes.TEXTAREA}
                                control={form.control}
                                name="reason"
                                label="Reason for appointment"
                                placeholder="Enter reason for appointment"
                            />
                            <CustomFormField
                                fieldType={FormFieldTypes.TEXTAREA}
                                control={form.control}
                                name="note"
                                label="Notes"
                                placeholder="Enter additional notes"
                            />
                        </div>
                    </>
                )}

                {type === "cancel" && (
                    <>
                        <CustomFormField
                            fieldType={FormFieldTypes.TEXTAREA}
                            control={form.control}
                            name="cancellationReason"
                            label="Reason for cancellation"
                            placeholder="Enter reason for cancellation"
                        />
                    </>
                )}

                <SubmitButton isLoading={isLoading} className={`${type === 'cancel' ? "shad-danger-btn" : "shad-primary-btn"} w-full`}>
                    {buttonLabel}
                </SubmitButton>
            </form>
      </Form>
    )
}