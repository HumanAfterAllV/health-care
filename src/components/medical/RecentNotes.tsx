"use client";

import { useState, useEffect } from "react";
import {  CalendarIcon, Clock, User, Stethoscope } from "lucide-react";

import { getPatientMedicalNotes } from "@/lib/actions/doctor.actions";
import { formatDateTime } from "@/lib/utils";
import { useMedicalNote } from "@/hooks/useNoteContext"

import { Card, CardContent } from "../ui/card"

export default function RecentNotes(): JSX.Element {
    
    const { appointment } = useMedicalNote();

    const [notes, setNotes] = useState<Array<{ noteId: string, createdAt: Date }>>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const userId = typeof appointment.userId === "object" && "userId" in appointment.userId ? appointment.userId.userId : undefined;
    
    useEffect(() => {
        const fetchNotes = async () => {
            try{
                if (userId) {
                    const data = await getPatientMedicalNotes(userId);
                    if (data) {
                        setNotes(data);
                    } else {
                        setError("No medical notes found");
                    }
                } else {
                    setError("User ID is not available");
                }
            }
            catch(e: unknown){
                console.error(e);
                setError("An error occurred while fetching the medical notes");
            }
            finally{
                setLoading(false);
            }
        }
        fetchNotes();
    },[userId])

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return(
        <Card className="p-4 h-screen overflow-y-auto rounded-3xl bg-white z-[50]">
            <h2 className="text-2xl font-medium mb-4">Recent Notes</h2>
            <div className="grid grid-cols-1 gap-4">
                {notes.map((note, index) => (
                    <Card key={index} className="bg-purple-600 text-white">
                        <CardContent className="p-4 grid gap-4">
                            <div className="grid grid-cols-2 gap-2">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <CalendarIcon className="h-4 w-4" />
                                    <span>{formatDateTime(note.createdAt).dateOnly}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Clock className="h-4 w-4" />
                                    <span>{formatDateTime(note.createdAt).timeOnly}</span>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-start justify-between">
                                    <h3 className="font-medium leading-none">{(note as { reason?: string }).reason ?? "N/A"}</h3>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <User className="h-4 w-4" />
                                <span>Dr.{(note as { primaryPhysician?: { name: string } }).primaryPhysician?.name ?? "N/A"}</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-[16px_1fr] gap-2 text-sm text-muted-foreground">
                                <Stethoscope className="h-4 w-4" />
                                <p className="line-clamp-2">{(note as {primaryPhysician?: {specialty: string}}). primaryPhysician?.specialty ?? "N/A"}</p>
                            </div>

                        </CardContent>
                    </Card>
                ))}
                {!notes.length && <div>No notes found</div>}
            </div>
        </Card>
    )
}