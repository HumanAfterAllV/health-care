import { MedicalNoteProvider } from "@/components/medical/MedicalNoteContext";
import MedicalNoteForm from "@/components/medical/MedicalNoteForm";
import { getDoctorAppointmentForMedicalNote } from "@/lib/actions/doctor.actions";
import { Appointment } from "@/types/supabase.types";

export default async function Page({params: {appointmentId} }: SearchParamProps): Promise<JSX.Element> {
    
    const appointment: Appointment = await getDoctorAppointmentForMedicalNote(appointmentId);
    return (

        <MedicalNoteProvider appointment={appointment}>
            <MedicalNoteForm/>
        </MedicalNoteProvider>
    )
}