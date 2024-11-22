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
        .select("primaryPhysician, schedule, userId")
        .eq("appointmentId", appointmentId)
        .single();

        if(error){
            throw error;
        }
        console.log("Appointment:", appointmentId);
        return data;
    }
    catch(error){
        console.error('Error getting appointments:', error);
        throw error;
    }
}

/* 
export const getPatientUser = async () => {
    try{
        const {data: {user}, error} = await supabase.auth.getUser();

        if(error){
            console.error("Error getting user:", error);
            throw error;
        }

        return user?.id;
    }
    catch(error){
        console.error('Error getting user:', error);
        throw error;
    }
} */


export const getRecentAppointments = async () => {
    try{

        const {data, error} = await supabase
        .from("appointment")
        .select("*")

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
    catch(error){
        console.error('Error getting appointments:', error);
        throw error
    }
}

export const updateAppointment = async ({appointmentId, appointment}) => {
    try{
        const {data, error} = await supabase
        .from("appointment")
        .update({
            primaryPhysician: appointment.primaryPhysician,
            schedule: appointment.schedule,
            status: appointment.status,
            cancellationReason: appointment.cancellationReason
        })
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
    catch(error){
        console.error('Error updating appointment:', error);
        throw error;
    }
}