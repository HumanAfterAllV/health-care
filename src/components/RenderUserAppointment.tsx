"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { getDoctorAppointment } from "@/lib/actions/appointment.actions";
import { Doctors } from "@/constants";
import { formatDateTime } from "@/lib/utils";

import { Button } from "@/components/ui/button";

import Skeleton from "@/components/Skeleton";

export default function RenderUserAppointment(): JSX.Element {
    const searchParams = useSearchParams();
    const appointmentId = searchParams.get('appointmentId');
    const [doctorAppointment, setDoctorAppointment] = useState<{ primaryPhysician: string; schedule: string ,userId: string} | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchData() {
            if (!appointmentId) {
                setError("No appointment ID provided");
                return;
            }
            try {
                const data = await getDoctorAppointment(appointmentId);
                setDoctorAppointment(data);
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
                <Skeleton className="h-10 w-2/3" />
                <div className="flex items-center gap-3">
                    <Skeleton className="h-24 w-24 rounded-full"/>
                    <Skeleton className="h-6 w-1/2"/>
                </div>
                <Skeleton className="h-6 w-1/4"/>
            </div>
        )
    }


    const doctor = Doctors.find((doc) => doc.name === doctorAppointment.primaryPhysician);
    return(
        <>
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
                    <p className="whitespace-nowrap">{doctorAppointment.primaryPhysician}</p>
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
            <Button variant="outline" className="shad-primary-btn" asChild>
                <Link href={`/patients/${doctorAppointment.userId}/new-appointment`}>
                    New Appointment
                </Link>
            </Button>
        </>
    )
}