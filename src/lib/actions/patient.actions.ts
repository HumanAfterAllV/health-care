"use server"

import { supabase } from "../supabaseClient";
import { parseStringify } from "../utils"

export const createUser = async (user: CreateUserParams) => {
    try {
        if (!user.email || !user.phone || !user.name) {
            throw new Error("Invalid user data");
        }

        const { data, error } = await supabase.from("patient").insert([{
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
        const user = await user.get(userId);
    }
    catch(error){
        console.error('Error getting user:', error);
    }
};