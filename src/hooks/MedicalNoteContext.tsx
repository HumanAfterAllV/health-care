"use client"

import { createContext, useContext, ReactNode, useState} from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { saveMedicalNoteAndVitalSigns } from "@/lib/actions/doctor.actions";

import { MedicalNoteSchema } from "@/lib/validations";

import { Appointment } from "@/types/supabase.types";


import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface MedicalNoteContextType {
    form: ReturnType<typeof useForm<z.infer<typeof MedicalNoteSchema>>>;
    loading: boolean;
    onSubmit: (data: z.infer<typeof MedicalNoteSchema>) => Promise<void>;
    appointment: Appointment;
    isOpen: boolean;
    openModal: (options: ModalOptions) => void;
    closeModal: () => void;
}

interface ModalOptions {
    title: string;
    content: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const MedicalNoteContext = createContext<MedicalNoteContextType | null>(null);

export const useMedicalNote = () => {
    const context = useContext(MedicalNoteContext)
    if(!context){
        throw new Error("useMedicalNote must be used within a MedicalNoteProvider")
    };

    return context;
};

export const MedicalNoteProvider = ({children, appointment,}: {children: ReactNode; appointment: Appointment;}) => {
    const router = useRouter();

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [modalOptions, setModalOptions] = useState<ModalOptions | null>(null);
    const [ loading, setLoading] = useState<boolean>(false);

    const openModal = (options: ModalOptions) => {
        setModalOptions(options);
        setIsOpen(true);
    }

    const closeModal = () => {
        setIsOpen(false);
        setModalOptions(null);
    }

    const form = useForm<z.infer<typeof MedicalNoteSchema>>({
        resolver: zodResolver(MedicalNoteSchema),
        defaultValues: {
            height: "",
            weight: "",
            bloodPressure: "",
            heartRate: "",
            temperature: "",
            oxygenSaturation: "",
            medicalNoteText: { html: "" },
        },
    });
    
    const onSubmit = async (data: z.infer<typeof MedicalNoteSchema>) => {
        setLoading(true);
        console.log('data:', data);
        console.log('appointment:', appointment);
        console.log('medicalNoteText:', data.medicalNoteText);
        try {

            if (!data.medicalNoteText || data.medicalNoteText === null || data.medicalNoteText === undefined) {
                throw new Error("El editor está vacío. Por favor, escribe una nota médica antes de guardar.");
              }          

            const medicalNoteData = {
                ...data,
                appointmentId: appointment.appointmentId,
                height: data.height,
                weight: data.weight,
                bloodPressure: data.bloodPressure,
                heartRate: data.heartRate,
                temperature: data.temperature,
                oxygenSaturation: data.oxygenSaturation,
                medicalNoteText: data.medicalNoteText,
            };
    
            const result = await saveMedicalNoteAndVitalSigns(appointment, medicalNoteData);    
            console.log('Medical note saved successfully:', result);

            if(result === null){
                console.log(`Redirecting to /admin/note/${appointment.appointmentId}/success`);
                router.push(`/admin/note/${appointment.appointmentId}/success`);
                form.reset();
            }

        } catch (error: unknown) {
            console.error('Error saving medical note:', error);
            alert(error);
        }
        finally{
            setLoading(false);
        }
    };
    return (
        <MedicalNoteContext.Provider value={{ form, appointment, onSubmit, isOpen, openModal, closeModal, loading}}>
            {children}
            {modalOptions && (
                <Dialog open={isOpen} onOpenChange={closeModal}>
                    <DialogContent className="shad-dialog sm:max-w-md">
                        <DialogHeader className="mb.4 space-y-3">
                            <DialogTitle className="capitalize">{modalOptions.title}</DialogTitle>
                            <DialogDescription>{modalOptions.content}</DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <Button className="bg-teal-500 hover:bg-teal-300 text-white" onClick={() => {modalOptions.onConfirm(); closeModal();}}>Confirm</Button>
                            {modalOptions.onCancel && (
                                <Button className="bg-red-600 hover:bg-red-500 text-white" onClick={() => {modalOptions.onCancel(); closeModal();}}>Cancel</Button>
                            )}
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}
        </MedicalNoteContext.Provider>
    );
  };