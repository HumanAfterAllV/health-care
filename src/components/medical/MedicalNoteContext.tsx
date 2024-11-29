"use client"

import { createContext, useContext, ReactNode} from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { MedicalNoteSchema } from "@/lib/validations";

import { Appointment } from "@/types/supabase.types";

interface MedicalNoteContextType {
    form: ReturnType<typeof useForm<z.infer<typeof MedicalNoteSchema>>>;
    isLoading: boolean;
    onSubmit: (data: z.infer<typeof MedicalNoteSchema>) => Promise<void>;
    appointment: Appointment;
}

const MedicalNoteContext = createContext<MedicalNoteContextType | null>(null);

export const useMedicalNote = () => {
    const context = useContext(MedicalNoteContext)
    if(!context){
        throw new Error("useMedicalNote must be used within a MedicalNoteProvider")
    };

    return context;
};

export const MedicalNoteProvider = ({
    children,
    appointment,
  }: {
    children: ReactNode;
    appointment: Appointment;
  }) => {
    const form = useForm<z.infer<typeof MedicalNoteSchema>>({
        resolver: zodResolver(MedicalNoteSchema),
        defaultValues: {
            height: "",
            weight: "",
            bloodPressure: "",
            heartRate: "",
            temperature: "",
            oxygenSaturation: "",
            pdf: [],
        },
    });
  
    const onSubmit = (data: z.infer<typeof MedicalNoteSchema>) => {
        try{

        }
        catch{

        }
        return data
    };
  
    return (
        <MedicalNoteContext.Provider value={{ form, appointment, onSubmit }}>
            {children}
        </MedicalNoteContext.Provider>
    );
  };