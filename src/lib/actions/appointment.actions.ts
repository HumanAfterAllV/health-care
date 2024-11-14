import { supabase } from "../supabaseClient";


export const createAppointment = async (appointment: CreateAppointmentParams) => {
    try {
        const { data, error } = await supabase.from("appointment").insert([{
            userId: appointment.userId,
            patient: appointment.patient,
            primaryPhysician: appointment.primaryPhysician,
            schedule: appointment.schedule,
            reason: appointment.reason,
            note: appointment.note,
            status: appointment.status,
        }]).select()

        if (error) {
            throw error;
        }

        if (!data) {
            throw new Error("No data returned from supabase");
        }
        return data[0];
    } catch (error: any) {
        console.error('Error creating appointment:', error);
        throw error;
    }
}