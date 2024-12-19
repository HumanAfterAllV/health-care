"use client";

import { useState, useEffect } from "react";

import { useMedicalNote } from "@/hooks/MedicalNoteContext"

import { Card, CardHeader, CardTitle, CardContent } from "../ui/card"

import { getPatientMedicalNotes } from "@/lib/actions/doctor.actions";
import { formatDateTime } from "@/lib/utils";
import {  CalendarIcon } from "lucide-react";


export default function PatientHistory(): JSX.Element {
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
                    setNotes(data);
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

    console.log(notes);
    return(
        <Card className="h-[650px] overflow-auto shadow-lg rounded-2xl bg-[#e8ebfe]">
            <CardHeader className="bg-blue-900 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                    <CalendarIcon className="h-5 w-5"/>
                    Previous Notes
                </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
                {notes.map((note, index) => (
                    <div key={note.noteId} className={`mb-4 last:mb-0 p-4 rounded-lg text-white ${
                        index % 2 === 0 ? 'bg-green-400' : 'bg-green-500'
                    }`}>
                        <div className="text-sm flex items-center gap-2">
                            <CalendarIcon className="h-4 w-4" />
                            {note.createdAt ? formatDateTime(note.createdAt).dateTime : "N/A"}
                        </div> 
                    </div>
                ))}
            </CardContent>
      </Card>
    )
}