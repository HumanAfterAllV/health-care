"use client";

import Link from "next/link";

import RenderUserAppointment from "@/components/RenderUserAppointment";
import Logo from "@/components/Logo";

export default function Success(): JSX.Element {


/*     if (!appointmentId) {
        console.error("No appointmentId provided.");
        return <div>Error: No appointment ID provided.</div>;
    }

    const doctorAppointment = await getDoctorAppointment(appointmentId);

    if (!doctorAppointment) {
    console.error("Appointment not found.");
    return <div>Error: Appointment not found.</div>;
}

    const userId = await getPatientUser();
    const doctor = Doctors.find((doc) => doc.name === doctorAppointment.primaryPhysician); */

    return (
        <div className="flex h-screen max-h-screen px-[5%]">
            <div className="success-img">
                <Link href="/">
                    <Logo />
                </Link>
                <RenderUserAppointment/>
                <p className="copyright mt-10 py-12">
                    © 2024 CarePulse
                </p>
            </div>
        </div>
    )
}