"use server"

import { Appointment, MedicalNoteTypes } from "@/types/supabase.types";
import { supabase } from "../supabaseClient";
import { formatDateTime } from "../utils";

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
            reason,
            note,
            schedule, 
            primaryPhysician(
                name,
                specialty,
                doctor_id
            )
            ,userId(
                userId,
                name,
                gender,
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
};

export const getTemplate = async (type: string, appointment: Appointment): Promise<string> => {
    const birthDate = typeof appointment.userId === "object" && "birthDate" in appointment.userId && appointment.userId.birthDate ? new Date(appointment.userId.birthDate) : null;
    
    const calculateAge = (birthDate: Date): number => {
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        if(monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())){
            age--;
        }
        return age;
    }

    const age = birthDate ?  calculateAge(birthDate) : "";

    const templates = {
        "Consultation": `
            <h1 style="text-align: center;">Consultation Report</h1>
            <h2 style="text-align: center;">HealthCare Solutions</h2>
            <p style="text-align: center;">Phone: (04)0987654321 | Address: Miami Blvd #300</p>
            <hr/>
            <p>Assigned Physician: <span style="font-weight: bold;">${typeof appointment.primaryPhysician === "object" && "name" in appointment.primaryPhysician ? appointment.primaryPhysician.name : ""} - ${typeof appointment.primaryPhysician === "object" && "specialty" in appointment.primaryPhysician ? appointment.primaryPhysician.specialty : ""}</span></p>
            <p>Patient: <span style="font-weight: bold;">${typeof appointment.userId === "object" && "name" in appointment.userId ? appointment.userId.name : ""}</span> - Gender: <span style="font-weight: bold;">${typeof appointment.userId === "object" && "gender" in appointment.userId ? appointment.userId.gender : ""}</span> - Age: <span style="font-weight: bold;">${age}</span></p>
            <br/>
            <h3 style="text-decoration: underline;">Consultation Notes:</h3>
            <ul>
            <li>Date: ${typeof appointment === "object" && "schedule" in appointment ? formatDateTime(appointment.schedule).dateOnly : "N/A"}</li>
            <li>Main concern: <span style="font-weight: bold;">${typeof appointment === "object" && "reason" in appointment ? appointment.reason : "N/A"}</span> </li>
            <li>Diagnosis: To be determined</li>
            <li>Recommended tests: ""</li>
            </ul>
            <h3 style="text-decoration: underline;">Prescription:</h3>
            <p>Medication: </p>
            <p>We will follow up as necessary. Please feel free to contact us for any further inquiries.</p>
        `,
        "RoutineCheckUp": `
            <h1 style="text-align: center;">Routine Check-up Summary</h1>
            <h2 style="text-align: center;">HealthCare Solutions</h2>
            <p style="text-align: center;">Phone: (04)0987654321 | Address: Miami Blvd #300</p>
            <hr/>
            <p>Assigned Physician: <span style="font-weight: bold;">${typeof appointment.primaryPhysician === "object" && "name" in appointment.primaryPhysician ? appointment.primaryPhysician.name : ""} - ${typeof appointment.primaryPhysician === "object" && "specialty" in appointment.primaryPhysician ? appointment.primaryPhysician.specialty : ""}</span></p>
            <p>Patient: <span style="font-weight: bold;">${typeof appointment.userId === "object" && "name" in appointment.userId ? appointment.userId.name : ""}</span> - Gender: <span style="font-weight: bold;">${typeof appointment.userId === "object" && "gender" in appointment.userId ? appointment.userId.gender : ""}</span> - Age: <span style="font-weight: bold;">${age}</span></p>
            <br/>
            <h3 style="text-decoration: underline;">Examination Results:</h3>
            <ul>
            <li>Date: ${typeof appointment === "object" && "schedule" in appointment ? formatDateTime(appointment.schedule).dateOnly : "N/A"}</li>
            <li>Main concern: <span style="font-weight: bold;">${typeof appointment === "object" && "reason" in appointment ? appointment.reason : "N/A"}</span> </li>
            <li>Blood work: ""</li>
            <li>General health: ""</li>
            </ul>
            <h3 style="text-decoration: underline;">Prescription:</h3>
            <p>Medication: </p>
            <p>Continue with your healthy habits and schedule your next check-up in 6 months.</p>
        `,
      "FollowUp": `
            <h1 style="text-align: center;">Follow-Up Instructions</h1>
            <h2 style="text-align: center;">HealthCare Solutions</h2>
            <p style="text-align: center;">Phone: (04)0987654321 | Address: Miami Blvd #300</p>
            <hr/>
            <p >Assigned Physician: <span style="font-weight: bold;">${typeof appointment.primaryPhysician === "object" && "name" in appointment.primaryPhysician ? appointment.primaryPhysician.name : ""} - ${typeof appointment.primaryPhysician === "object" && "specialty" in appointment.primaryPhysician ? appointment.primaryPhysician.specialty : ""}</span></p>
            <p style="">Patient: <span style="font-weight: bold;">${typeof appointment.userId === "object" && "name" in appointment.userId ? appointment.userId.name : ""}</span> - Gender: <span style="font-weight: bold;">${typeof appointment.userId === "object" && "gender" in appointment.userId ? appointment.userId.gender : ""}</span> - Age: <span style="font-weight: bold;">${age}</span> </p>
            <br/>
            <h3 style="text-decoration: underline;">Instructions:</h3>
            <ul>
            <li>Date: ${typeof appointment === "object" && "schedule" in appointment ? formatDateTime(appointment.schedule).dateOnly : "N/A"}</li>
            <li>Main concern: <span style="font-weight: bold;">${typeof appointment === "object" && "reason" in appointment ? appointment.reason : "N/A"}</span> </li>
            <li>Continue current medication</li>
            <li>Avoid strenuous activities</li>
            <li>Contact us for any symptoms like fever or persistent pain</li>
            </ul>
            <h3 style="text-decoration: underline;">Prescription:</h3>
            <p>Medication: </p>
            <p>We look forward to seeing you on your next visit.</p>
        `,
        "SecondOpinion": `
            <h1 style="text-align: center;">Second Opinion Review</h1>
            <h2 style="text-align: center;">HealthCare Solutions</h2>
            <p style="text-align: center;">Phone: (04)0987654321 | Address: Miami Blvd #300</p>
            <hr/>
            <p>Reviewed by: <span style="font-weight: bold;">${typeof appointment.primaryPhysician === "object" && "name" in appointment.primaryPhysician ? appointment.primaryPhysician.name : ""} - ${typeof appointment.primaryPhysician === "object" && "specialty" in appointment.primaryPhysician ? appointment.primaryPhysician.specialty : ""}</span></p>
            <p>Patient: <span style="font-weight: bold;">${typeof appointment.userId === "object" && "name" in appointment.userId ? appointment.userId.name : ""}</span> - Gender: <span style="font-weight: bold;">${typeof appointment.userId === "object" && "gender" in appointment.userId ? appointment.userId.gender : ""}</span> - Age: <span style="font-weight: bold;">${age}</span></p>
            <br/>
            <h3 style="text-decoration: underline;">Review Summary:</h3>
            <ul>
            <li>Date: ${typeof appointment === "object" && "schedule" in appointment ? formatDateTime(appointment.schedule).dateOnly : "N/A"}</li>
            <li>Main concern: <span style="font-weight: bold;">${typeof appointment === "object" && "reason" in appointment ? appointment.reason : "N/A"}</span> </li>
            <li>Previous diagnosis: "Not provided"</li>
            <li>Our assessment: "In progress"</li>
            <li>Recommendation: "To be discussed"}</li>
            </ul>
            <h3 style="text-decoration: underline;">Prescription:</h3>
            <p>Medication: </p>
            <p>We encourage you to review the findings with your initial physician for further clarification.</p>
        `,
        "EmergencyVisit": `
            <h1 style="text-align: center;">Emergency Visit Report</h1>
            <h2 style="text-align: center;">HealthCare Solutions</h2>
            <p style="text-align: center;">Phone: (04)0987654321 | Address: Miami Blvd #300</p>
            <hr/>
            <p>Attending Physician: <span style="font-weight: bold;">${typeof appointment.primaryPhysician === "object" && "name" in appointment.primaryPhysician ? appointment.primaryPhysician.name : ""} - ${typeof appointment.primaryPhysician === "object" && "specialty" in appointment.primaryPhysician ? appointment.primaryPhysician.specialty : ""}</span></p>
            <p>Patient: <span style="font-weight: bold;">${typeof appointment.userId === "object" && "name" in appointment.userId ? appointment.userId.name : ""}</span> - Gender: <span style="font-weight: bold;">${typeof appointment.userId === "object" && "gender" in appointment.userId ? appointment.userId.gender : ""}</span> - Age: <span style="font-weight: bold;">${age}</span></p>
            <br/>
            <h3 style="text-decoration: underline;">Incident Details:</h3>
            <ul>
            <li>Date: ${typeof appointment === "object" && "schedule" in appointment ? formatDateTime(appointment.schedule).dateOnly : "N/A"}</li>
            <li>Main concern: <span style="font-weight: bold;">${typeof appointment === "object" && "reason" in appointment ? appointment.reason : "N/A"}</span> </li>
            <li>Treatment provided: ""</li>
            </ul>
            <p>Follow-up care may be required. Please adhere to all discharge instructions.</p>
        `,
    }

    return templates[type] || "";
};


export const saveMedicalNoteAndVitalSigns = async(appointment: Appointment, medicalNoteData: MedicalNoteTypes):  Promise<any> => {
    if(!appointment){
        throw new Error("Missing required parameter: appointmentId")
    };

    try{
        console.log("Inserting medical note data:", {
            appointmentId: appointment.appointmentId,
            height: medicalNoteData.height,
            weight: medicalNoteData.weight,
            bloodPressure: medicalNoteData.bloodPressure,
            heartRate: medicalNoteData.heartRate,
            temperature: medicalNoteData.temperature,
            oxygenSaturation: medicalNoteData.oxygenSaturation,
            medicalNoteText: medicalNoteData.medicalNoteText,
        });
        const {data, error} = await supabase
        .from("medicalNote")
        .insert([
            {
                appointmentId: appointment.appointmentId,
                height: medicalNoteData.height,
                weight: medicalNoteData.weight,
                bloodPressure: medicalNoteData.bloodPressure,
                heartRate: medicalNoteData.heartRate,
                temperature: medicalNoteData.temperature,
                oxygenSaturation: medicalNoteData.oxygenSaturation,
                medicalNoteText: medicalNoteData.medicalNoteText,
            },
        ])
        
        if(error){
            console.error("Error saving medical note:", error);
            throw error;
        }

        const {error: updateError} = await supabase
        .from("appointment")
        .update({
            status: "completed",
        })
        .eq("appointmentId", appointment.appointmentId);

        if(updateError){
            console.error("Error updating appointment status:", updateError);
            throw updateError;
        }

        return data;
    }
    catch(error: unknown){
        console.error("Error saving medical note:", error);
        throw error;
    }   
}


export const getPatientsByName =  async(name: string) => {
    const trimName = name.trim();

    if(!trimName){
        return [];
    }
    try{
        const {data, error} = await supabase
        .from("patient")
        .select("*")
        .ilike("name", `%${trimName}%`);
    
        if(error){
            console.error("Error getting patients:", error);
            throw error;
        }
    
        return data || [];
    }
    catch(error: unknown){
        console.error("Error getting patients:", error);
        throw error;
    }
}

export const getPatientMedicalNotes = async (userId: string) => {
    if (!userId) {
        throw new Error("Error: Missing userId.");
    }
    
    try {
        const { data, error } = await supabase
            .from("medicalNote")
            .select(`
                noteId,
                createdAt,
                appointmentId(
                    userId, 
                    reason, 
                    schedule, 
                    primaryPhysician(
                        name, 
                        specialty
                    )
                )
            `)
            .eq("appointmentId.userId", userId);
        
        if (error) {
            console.error("Error getting medical notes:", error);
            throw new Error("Error getting medical notes");
        }
        if (data) {
            // @ts-expect-error: data is an array of MedicalNoteTypes
            const filteredNotes = data.filter(note => note.appointmentId && note.appointmentId.userId === userId);
            return filteredNotes.map(note => ({
                noteId: note.noteId,
                createdAt: note.createdAt,
                // @ts-expect-error: note.appointmentId is an object of type Appointment
                reason: note.appointmentId.reason || "N/A",
                // @ts-expect-error: note.appointmentId is an object of type Appointment
                schedule: note.appointmentId.schedule || "N/A",
                primaryPhysician: {
                    // @ts-expect-error: note.appointmentId.primaryPhysician is an object of type PrimaryPhysician
                    name: note.appointmentId.primaryPhysician.name || "N/A",
                    // @ts-expect-error: note.appointmentId.primaryPhysician is an object of type PrimaryPhysician
                    specialty: note.appointmentId.primaryPhysician.specialty || "N/A",
                },
            }));
        }
    } catch (error: unknown) {
        console.error("Error getting medical notes:", error);
        throw new Error("Error getting medical notes");
    }
};
