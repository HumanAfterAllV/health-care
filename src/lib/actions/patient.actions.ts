"use server"

import { supabase } from "../supabaseClient";
import { parseStringify } from "../utils"
import { v4 as uuidv4 } from "uuid";

export const createUser = async (user: CreateUserParams) => {
    try {
        if (!user.email || !user.phone || !user.name) {
            throw new Error("Invalid user data");
        }

        const userId = uuidv4(); 

        const { data, error } = await supabase.from("patient").insert([{
            userId,
            name: user.name,
            email: user.email,
            phone: user.phone,
        }]).select()

        if(error){
            throw error;
        }

        if (!data) {
            throw new Error("No data returned from supabase");
        }
        return parseStringify(data[0]);
    } catch (error: any) {
        console.error('Error creating user:', error);
        if (error && error?.code === "23505") {
            try {
                const { data: existingUser, error: listError } = await supabase.from("patient").select("*").eq("email", user.email);
                if(listError){
                    throw listError;
                }
                
                return existingUser[0];
            } catch (listError: any) {
                console.error('Error listing existing user:', listError);
                throw listError;
            }
        } else {
            throw error;
        }
    }
};

export const getUser = async (userId: string) => {
    try{
        const {data, error} = await supabase.from("patient").select("*").eq("userId", userId).single();

        if(error){
            throw error;
        }

        if(!data){
            throw new Error("No data returned from supabase");
        }

        return parseStringify(data);
    }
    catch(error){
        console.error('Error getting user:', error);
        throw error;
    }
};

export const registerPatient = async (params: RegisterUserParams) => {
    const {identificationDocument, ...patient} = params;
    try{ 
        const {data: existingPatient, error: existingPatientError} = await supabase
        .from("patient")
        .select("userId")
        .eq("email", patient.email)
        .single();

        if(existingPatientError){
            throw existingPatientError;
        }

        let fileUrl = null;
        if(identificationDocument instanceof File){
            console.log(`Uploading file...: ${identificationDocument.name}`);
            const filePath = `patient-document/${patient.userId}/${uuidv4()}-${identificationDocument.name}`;
            console.log(`File path: ${filePath}`);
            const {data: fileData, error: uploadError} = await supabase
            .storage
            .from("healthcare_storage")
            .upload(filePath, identificationDocument);

            console.log(`File data: ${{fileData, uploadError}}`);

            if(uploadError){
                throw new Error(`Error uploading file: ${uploadError.message}`);
        
            }
            fileUrl = supabase.storage.from("healthcare_storage").getPublicUrl(filePath).data?.publicUrl;
            console.log(`File URL: ${fileUrl}`);

            if (!fileUrl) {
                throw new Error("Failed to generate public URL for uploaded file.");
            }
        }

        let result; 
        if(existingPatient){
            const {data, error} = await supabase
            .from("patient")
            .update([{
                ...patient,
                identificationDocumentUrl: fileUrl,
            }]).eq("userId", existingPatient.userId).select();

            if(error || !data || data.length === 0){
                throw new Error("No data returned from supabase");
            }

            result = data[0];
        }
        else{
            const {data, error} = await supabase.from("patient").insert([{
                ...patient,
                identificationDocumentUrl: fileUrl,
            }]).select();

            if(error || !data || data.length === 0){
                throw new Error("No data returned from supabase");
            }
    
            result = data[0];
        }

        return result;

    }
    catch(error){
        console.error('Error registering patient:', error);
        throw error;
    }

};

