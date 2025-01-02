"use client";

import { useFetch } from "@/hooks/useFetch";
import { useParams } from "next/navigation";
import { MedicalNoteProvider } from "@/hooks/useNoteContext";

import { getDoctorAppointmentForMedicalNote } from "@/lib/actions/doctor.actions";

import MedicalNoteForm from "@/components/medical/MedicalNoteForm";
import SkeletonCard from "@/components/SkeletonCard";
import ErrorRender from "@/components/ErrorRender";

export default function Page(): JSX.Element | null {
    const params = useParams();
    const appointmentId = params.appointmentId as string;

    const {data: appointment, loading, error} = useFetch(getDoctorAppointmentForMedicalNote, appointmentId);

    if(loading) return <SkeletonCard />;
    if(error) return <ErrorRender code={error.status} />;
    
    return (
        appointment && (
            <MedicalNoteProvider appointment={appointment}>
                <MedicalNoteForm/>
            </MedicalNoteProvider>
        )
    )
}