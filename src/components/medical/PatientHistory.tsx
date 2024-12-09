"use client";

import { useState, useEffect } from "react";

import { useMedicalNote } from "@/hooks/MedicalNoteContext"

import { Card, CardHeader, CardTitle, CardContent } from "../ui/card"

import { getPatientMedicalNotes } from "@/lib/actions/doctor.actions";
import { MedicalNoteTypes } from "@/types/supabase.types";
import { formatDateTime } from "@/lib/utils";
import Link from "next/link";
export default function PatientHistory(): JSX.Element {
    const { appointment } = useMedicalNote();

    const [notes, setNotes] = useState<MedicalNoteTypes[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const userId = typeof appointment.userId === "object" && "userId" in appointment.userId ? appointment.userId.userId : "N/A";
    
    useEffect(() => {
        const fetchNotes = async () => {
            try{
                const data = await getPatientMedicalNotes(userId);
                setNotes(data);
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

    console.log(notes);
    return(
        <Card className="w-1/5 h-full overflow-auto shadow-lg rounded-lg bg-white">
            <CardHeader>
                <CardTitle>Medical Notes</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col space-y-4">
                    <ul>
                        {notes.map((note) => (
                            <li key={note.noteId}>
                                <Link href={`/notes/${note.noteId}`} className="text-blue-500 underline">
                                    {formatDateTime(note.createdAt).dateOnly}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </CardContent>
      </Card>
    )
}