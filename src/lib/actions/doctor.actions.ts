"use server"

import { supabase } from "../supabaseClient";

export const getDoctorAppointmentForMedicalNote = async (appointmentId: string) => {
    if (!appointmentId) {
        throw new Error("Missing required parameter: appointmentId");
    }

    try {
        const {data, error} = await supabase
        .from("appointment")
        .select(`
            appointmentId,
            patient,
            schedule, 
            primaryPhysician(
                name,
                specialty,
                doctor_id
            )
            ,userId(
                name,
                birthDate,
                bloodType,
                allergies,
                currentMedication,
                familyMedicalHistory,
                pastMedicalHistory
            )
        `)
        .eq("appointmentId", appointmentId)
        .single()

        if(error){
            throw error;
        }
        console.log("Appointment:", appointmentId);
        return data;
    }
    catch(error: unknown){
        console.error('Error getting appointments:', error);
        throw error;
    }
}
