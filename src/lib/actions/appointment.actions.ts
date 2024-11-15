import { supabase } from "../supabaseClient";


export const createAppointment = async (appointment: CreateAppointmentParams) => {
    try {
        const { data: insertData, error: insertError } = await supabase.from("appointment").insert([{
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
    } catch (error: any) {
        console.error('Error creating appointment:', error);
        throw error;
    }
}

export const getDoctorAppointment = async (userId: string) => {
    try {
        const {data, error} = await supabase
        .from("appointment")
        .select("primaryPhysician, schedule")
        .eq("userId", userId).single();

        if(error){
            throw error;
        }
        return data;
    }
    catch(error){
        console.error('Error getting appointments:', error);
        throw error;
    }
}