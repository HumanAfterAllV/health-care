"use client"

import { useEffect, useState } from "react";


import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"

import { Button } from "./ui/button";

import { Appointment, Patient } from "@/types/supabase.types";

import AppointmentForm from "./forms/AppointmentForm";
  
interface AppointmentModalProps {
    type: "schedule" | "cancel";
    patient: Patient;
    userId: string;
    appointment?: Appointment;
    title?: string;
    description?: string;
}
export default function AppointmentModal ({type, patient, userId, appointment}: AppointmentModalProps): JSX.Element{
    
    const [open, setOpen] = useState<boolean>(false);
    
    useEffect(() => {
        console.log("AppointmentModal isOpen:", open)
    },[open]);

    return(
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" className={`capitalize ${type === "schedule" && "text-green-500"}`}>
                    {type}
                </Button>
            </DialogTrigger>
            <DialogContent className="shad-dialog sm:max-w-md">
                <DialogHeader className="mb.4 space-y-3">
                    <DialogTitle className="capitalize">{type} Appointment</DialogTitle>
                    <DialogDescription>
                        Please fill in the following details to {type} the appointment.
                    </DialogDescription>
                </DialogHeader>
                <AppointmentForm
                    userId={userId}
                    patient={patient}
                    type={type}
                    appointment={appointment} 
                    setOpen={setOpen}
                />
            </DialogContent>
        </Dialog>            
    )
};