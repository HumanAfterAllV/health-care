"use client";

import { getUser } from "@/lib/actions/patient.actions";
import { useParams } from "next/navigation";

import { useFetch } from "@/hooks/useFetch";
import { Patient } from "@/types/supabase.types";

import AppointmentForm from "@/components/forms/AppointmentForm";
import SkeletonCard from "@/components/SkeletonCard";
import ErrorRender from "@/components/ErrorRender";

export default function NewAppointment(): JSX.Element {

    const params = useParams();
    const userId = params.userId as string;
    
    const {data: patient, loading, error} = useFetch<Patient | null>(getUser, userId);

    if(loading) return <SkeletonCard />;
    if(error) return <ErrorRender code={error.status} />;

    return(
        <section className="flex h-screen max-h-screen">
            <div className="remoce-scrollbar container my-auto">
                {patient && <AppointmentForm type="create" userId={userId} patient={patient}/>}
            </div>
        </section>
    )
}