"use server";

import { revalidatePath } from "next/cache";
import { supabase } from "../supabaseClient";


export const createAppointment = async (appointment: CreateAppointmentParams) => {
    try {
        const { data: insertData, error: insertError } = await supabase
        .from("appointment")
        .insert([{
            userId: appointment.userId,
            patient: appointment.patient,
            primaryPhysician: appointment.primaryPhysician,
            schedule: appointment.schedule,
            reason: appointment.reason,
            note: appointment.note,
            status: appointment.status,
        }]).select("appointmentId").single();
        
        if (insertError) {
            throw insertError;
        }
        
        if (!insertData) {
            throw new Error("No data returned from supabase");
        }

        console.log("Inserted appointment:", insertData.appointmentId);
        return insertData;
    
    } catch (error: unknown) {
        console.error('Error creating appointment:', error);
        throw error;
    }
}

export const getDoctorAppointment = async (appointmentId: string) => {
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
                specialty
            )
            ,userId
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

export const getDoctorsList = async () => {
    try{
        const {data: doctors, error: error} = await supabase
        .from("doctor")
        .select("doctor_id, name, specialty")

        if(error){
            throw error;
        }

        if(!doctors){
            throw new Error("No doctors found, try again...");
        }

        return doctors;
    }
    catch(error: unknown){
        console.error('Error getting appointments:', error);
        throw error;
    }
}


export const getRecentAppointments = async () => {
    try{

        const {data, error} = await supabase
        .from("appointment")
        .select(`*, primaryPhysician(name)`)
        .not("status", "eq", "completed")
        
        if(error){
            throw error;
        }
        
        if(!data){
            throw new Error("No appointments found");
        }

        const initialCounts = {
            scheduledCount: 0,
            pendingCount: 0,
            cancelledCount: 0,
        }

        const counts = data.reduce((acc, appointment) => {
            switch(appointment.status){
                case "scheduled":
                    acc.scheduledCount++;
                    break;
                case "pending":
                    acc.pendingCount++;
                    break;
                case "cancelled":
                    acc.cancelledCount++;
                    break;
                default:
                    console.warn("Unknown status:", appointment.status);
            }
            return acc;
        }, initialCounts)

        console.log("Appointment counts:", counts);
        return {data, counts};
    }
    catch(error: unknown){
        console.error('Error getting appointments:', error);
        throw error
    }
}

export const updateAppointment = async ({appointmentId, appointment}) => {
    try{
        const {data, error} = await supabase
        .from("appointment")
        .update(appointment)
        .eq("appointmentId", appointmentId)
        .select()
        .single();

        if(error){
            console.error("Error updating appointment:", error);
            throw error;
        }

        console.log(`Updated appointment: ${appointmentId}`);
        console.log(appointment);
        revalidatePath("/admin");
        return data;
    }
    catch(error: unknown){
        console.error('Error updating appointment:', error);
        throw error;
    }
}

export const getNumberOfPatients = async () => {
    try{
        const {count: countPatient, error} = await supabase
        .from("patient")
        .select("userId", { count: "exact" });

        if(error){
            throw error;
        }

        return countPatient;
    }
    catch(error: unknown){
        console.error('Error getting appointments:', error);
        throw error;
    }
}

export const getRecentPatients = async () => {
    try{
        const {data, error} = await supabase
        .from("patient")
        .select("name, email, phone, createdAt")
        .order("createdAt", { ascending: false })
        .limit(3)
        

        if(error){
            throw error;
        }

        return data;
    }
    catch(error: unknown){
        console.error('Error getting appointments:', error);
        throw error;
    }
}