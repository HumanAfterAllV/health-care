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
import { CalendarCheck2, TriangleAlert } from "lucide-react";
  
interface AppointmentModalProps {
    type: "schedule" | "cancel";
    patient: Patient;
    userId: string | UserDetails[] | UserDetails
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
            <DialogTrigger asChild className="flex space-x-2">
                {type === "schedule" ? (
                    <Button
                        className="hover:bg-gray-100"
                        size="sm"
                        variant="outline"
                        onClick={() => setOpen(true)}
                    >
                        <CalendarCheck2 size={16} className="text-teal-500" />
                    </Button>
                ) : (
                    <Button
                        className="hover:bg-gray-100"
                        size="sm"
                        variant="outline"
                        onClick={() => setOpen(true)}
                    >
                        <TriangleAlert size={16} className="text-red-500"/>
                    </Button>
                )}
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