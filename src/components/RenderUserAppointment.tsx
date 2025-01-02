"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { Doctors } from "@/constants";
import { getDoctorAppointment } from "@/lib/actions/appointment.actions";
import { formatDateTime } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface DoctorAppointment {
    appointmentId: string;
    schedule: string;
    patient: string;
    primaryPhysician: {
        name: string;
        specialty: string;
    };
    userId: string;
}
export default function RenderUserAppointment(): JSX.Element {
    const searchParams = useSearchParams();
    const appointmentId = searchParams.get('appointmentId');

    const [doctorAppointment, setDoctorAppointment] = useState<DoctorAppointment | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchData() {
            if (!appointmentId) {
                setError("No appointment ID provided");
                return;
            }
            try {
                const data = await getDoctorAppointment(appointmentId);
                console.log("Appointment:", data);
                setDoctorAppointment(data as unknown as DoctorAppointment);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("An unknown error occurred");
                }
            }
        }

        fetchData();
    }, [appointmentId]);

    
    if(error){
        return <div>Error: {error}</div>;
    }

    if(!doctorAppointment){
        return(
            <div className="flex flex-col gap-4">
                <p>Loading...</p>
            </div>
        )
    }

    const doctor = Doctors.find((doc) => doc.name === doctorAppointment.primaryPhysician.name);

    return(
        <>
            <section className="flex flex-col items-center">
                <Image
                    src="/assets/gifs/success.gif"
                    height={300}
                    width={280}
                    alt="success"
                />
                <h2 className="header mb-6 max-w-[600px] text-center">
                    Your <span className="text-green-400">appointment request</span> has been successfully submitted <span className="text-gray-600 font-medium">{doctorAppointment.patient}</span>!
                </h2>
                <p>
                    We will be in touch with you shortly to confirm your appointment.
                </p>
            </section>
            <section className="request-details">
                <p>Appointment details</p>
                <div className="flex items-center gap-3">
                    <Image
                        src={doctor?.image || "/assets/images/default-doctor.png"}
                        height={100}
                        width={100}
                        alt="doctor"
                        className="size-6"
                    />
                    <p className="whitespace-nowrap">{`${doctorAppointment.primaryPhysician.name} - ${doctorAppointment.primaryPhysician.specialty}`}</p>
                </div>
                <div className="flex gap-2">
                    <Image
                        src="/assets/icons/calendar.svg"
                        height={24}
                        width={24}
                        alt="calendar"
                    />
                    <p>{formatDateTime(doctorAppointment.schedule).dateTime}</p>
                </div>
            </section>
            <div className="flex flex-row gap-6">
                
                <Button variant="outline" className="shad-primary-btn-rt bg-green-400" asChild>
                    <Link href="/">
                        Back to Home
                    </Link>
                </Button>
                <Button variant="outline" className="shad-primary-btn-rt bg-green-400" asChild>
                    <Link href={`/patients/${doctorAppointment.userId}/new-appointment`}>
                        New Appointment
                    </Link>
                </Button>
            </div>
        </>
    )
}