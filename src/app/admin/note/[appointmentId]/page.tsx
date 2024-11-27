import PatientInfo from "@/components/medical/PatientInfo";
import { getDoctorAppointment } from "@/lib/actions/appointment.actions";

export default async function Page({params: {appointmentId} }: SearchParamProps): Promise<JSX.Element> {
    
    const appointment = await getDoctorAppointment(appointmentId);

    return (
        <div className="flex h-screen bg-gradient-to-br from-teal-100 to-blue-100 p-4 space-x-4">
            <PatientInfo appoinment={appointment}/>
        </div>
    )
}