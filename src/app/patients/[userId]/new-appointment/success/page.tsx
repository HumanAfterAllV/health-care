"use client";

import Image from "next/image";
import Link from "next/link";

import RenderUserAppointment from "@/components/RenderUserAppointment";

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
                    <Image
                        src="/assets/icons/logo-full.svg"
                        height={1000}
                        width={1000}
                        alt="logo"
                        className="h-10 w-fit"
                    />
                </Link>
                <section className="flex flex-col items-center">
                    <Image
                        src="/assets/gifs/success.gif"
                        height={300}
                        width={280}
                        alt="success"
                    />
                    <h2 className="header mb-6 max-w-[600px] text-center">
                        Your <span className="text-green-500">appointment request</span> has been successfully submitted!
                    </h2>
                    <p>
                        We will be in touch with you shortly to confirm your appointment.
                    </p>
                </section>
                <RenderUserAppointment/>
                <p className="copyright mt-10 py-12">
                    © 2024 CarePulse
                </p>
            </div>
        </div>
    )
}