"use client"
 
import Image from "next/image"
import { Dispatch,SetStateAction,useEffect,useState } from "react"
import { useRouter } from "next/navigation"
import { usePathname } from "next/navigation"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Doctors as DoctorImages, ReasonOptions} from "@/constants"
import { Appointment, Patient, FormFieldTypes } from "@/types/supabase.types"
import { getAppointmentSchema } from "@/lib/validations"
import { createAppointment, getDoctorsList, updateAppointment } from "@/lib/actions/appointment.actions"
import { useAnimationsGSAP } from "@/hooks/useAnimationsGSAP"

import { SelectItem } from "../ui/select"
import { Form } from "@/components/ui/form"
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import Logo from "../Logo"

interface AppointmentFormProps {
    type: "create" | "cancel" | "schedule";
    userId: string | UserDetails | UserDetails[];
    patient: Patient; 
    appointment?: Appointment;
    setOpen?: Dispatch<SetStateAction<boolean>>;
}

interface Doctor {
    doctor_id?: string;
    name?: string;
    specialty?: string;
    image?: string;
}

export default function AppointmentForm({ type, userId, patient, appointment, setOpen }: AppointmentFormProps): JSX.Element {
    const router = useRouter()

    const { elementRef } = useAnimationsGSAP("FormAppear");

    const specificRoute = usePathname();
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [doctors, setDoctos] = useState<Doctor[]>([])

    useEffect(() => {
        async function fetchDoctors() {
            try{
                const data = await getDoctorsList();
                const combineDoctors = data.map((doctor: Doctor) => {
                    const doctorImage = DoctorImages.find((d) => d.name === doctor.name)
                    return {
                        ...doctor,
                        image: doctorImage ? doctorImage.image : ""
                    };
                });
                setDoctos(combineDoctors);
            }
            catch(error: unknown){   
                console.error("Error fetching doctors:", error)
            }
        }

        fetchDoctors()
    },[])

    const AppointmentFormValidation = getAppointmentSchema(type)

    const form = useForm<z.infer<typeof AppointmentFormValidation>>({
        resolver: zodResolver(AppointmentFormValidation),
        defaultValues: {
            primaryPhysician: typeof appointment?.primaryPhysician === 'object' && 'doctor_id' in appointment.primaryPhysician ? appointment.primaryPhysician.doctor_id : "",
            schedule: appointment ? new Date(appointment.schedule) : new Date(Date.now()),
            reason: appointment?.reason || "",
            note: appointment?.note || "",
            cancellationReason: appointment?.cancellationReason || "",
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
                status = "cancelled";
                break;
            default:
                status = "pending";
                break;
        }
        try {
            if(type === "cancel" && appointment){

                const appointmentUpdate = {
                    userId,
                    appointmentId: appointment?.appointmentId,
                    appointment: {
                        status,
                        cancellationReason: values?.cancellationReason,
                    },
                };

                console.log("Updating appointment:", appointmentUpdate);

                const updatedAppointment = await updateAppointment(appointmentUpdate);

                if(updatedAppointment){
                    form.reset();
                    console.log("Appointment updated successfully:", updatedAppointment);
                    if (setOpen) setOpen(false);
                }
            }
            else if(type === "create" && patient){
                const appointmentData = {
                    userId: typeof userId === 'string' ? userId : userId[0].userId!,
                    patient: patient.name,
                    primaryPhysician: ((values as Appointment)).primaryPhysician,
                    schedule: new Date((values as Appointment).schedule),
                    reason: (values as Appointment).reason!,
                    note: (values as Appointment).note,
                    status: status as Status,
                }
                const newAppointment = await createAppointment(appointmentData);
                console.log("Creating appointment:", appointmentData);

                if(newAppointment?.appointmentId){
                    form.reset();
                    router.push(`/patients/${userId}/new-appointment/success?appointmentId=${newAppointment.appointmentId}`)
                }
                else {
                    console.error("Failed to redirect: Missing appointmentId.");
                }
            }
            else{
                if(appointment){
                    const appointmentToUpdate = {
                        userId,
                        appointmentId: appointment?.appointmentId,
                        appointment: {
                            primaryPhysician: (values as Appointment).primaryPhysician,
                            schedule: new Date((values as Appointment).schedule),
                            reason: (values as Appointment).reason!,
                            status: status as Status,
                            cancellationReason: values.cancellationReason
                        },
                        type,
                    }

                    console.log("Updating appointment:", appointmentToUpdate);

                    const updatedAppointment = await updateAppointment(appointmentToUpdate);
                    
                    if(updatedAppointment){
                        form.reset();
                        console.log("Appointment updated successfully:", updatedAppointment);
                        if (setOpen) {
                            setOpen(false);
                        }
                    }
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
        <div ref={elementRef} className="sub-container max-w-full flex-1 justify-between">
            {specificRoute.endsWith("/new-appointment") && (
                <Logo />
            )}
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
                    {type === "create" && <section className={`mb-12 space-y-4 ${specificRoute.endsWith("/new-appointment") ? "animate-item" : ""}`} >
                        <h1 className="header">New Appointment</h1>
                        <p className="text-dark-600">Request a new appointment in 10 seconds.</p>
                    </section>}

                    {type !== "cancel" && (
                        <>
                            <div className={`flex flex-col gap-6 xl:flex-row ${specificRoute.endsWith("/new-appointment") ? "animate-item" : ""}`}>
                                <CustomFormField
                                    fieldType={FormFieldTypes.SELECT}
                                    control={form.control}
                                    name="primaryPhysician"
                                    label="Doctor"
                                    placeholder="Select doctor"
                                >
                                    {doctors.map((doctor) => (
                                        <SelectItem key={doctor.doctor_id} value={doctor.doctor_id!} className="cursor-pointer hover:bg-green-200">
                                            <div className="flex items-center gap-2 ">
                                                <Image
                                                    src={doctor.image!} 
                                                    alt={doctor.name!} 
                                                    height={32} 
                                                    width={32}
                                                    className="rounded-full border border-gray-800"
                                                />
                                                <p className="flex flex-1 gap-5">{doctor.name} - {doctor.specialty}</p>
                                            </div>
                                        </SelectItem>
                                    ))}
                                </CustomFormField>
                            </div>
                            <div className={`relative flex bg-white z-10 flex-col gap-6 xl:flex-row  ${specificRoute.endsWith("/new-appointment") ? "animate-item" : ""}`}>
                                <CustomFormField
                                    fieldType={FormFieldTypes.DATE_PICKER}
                                    control={form.control}
                                    name="schedule"
                                    label="Expected appointment date and time"
                                    showTimeSelect
                                    dateFormat="MM/dd/yyyy  -  h:mm aa"
                                />
                            </div>

                            <div className={`flex flex-col gap-6 xl:flex-row ${specificRoute.endsWith("/new-appointment") ? "animate-item" : ""}`}>
                                <CustomFormField
                                    fieldType={FormFieldTypes.SELECT}
                                    control={form.control}
                                    name="reason"
                                    label="Reason for appointment"
                                    placeholder="Select reason for appointment"
                                >
                                    {ReasonOptions.map((reason) => (
                                        <SelectItem className="flex cursor-pointer hover:bg-green-200" key={reason} value={reason}>
                                            {reason}
                                        </SelectItem>
                                    ))}
                                    
                                </CustomFormField>
                                <CustomFormField
                                    fieldType={FormFieldTypes.TEXTAREA}
                                    control={form.control}
                                    name="note"
                                    label="Notes(Optional)"
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
                    <div className={`flex flex-col gap-6 xl:flex-row ${specificRoute.endsWith("new-appointment") ? "animate-item" : ""}`}>
                        <SubmitButton isLoading={isLoading}  className={`${type === 'cancel' ? "shad-danger-btn" : "shad-primary-btn-rt bg-green-400"} w-full`}>
                            {buttonLabel}
                        </SubmitButton>
                    </div>
                </form>
            </Form>
            {specificRoute.endsWith("new-appointment") && (
                <p className="copyright  mt-10 py-12 animate-item">
                    © 2024 CarePulse
                </p>
            )}
        </div>
    )
}