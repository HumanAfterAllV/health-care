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

    } catch (error: any) {
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