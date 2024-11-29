"use client";

/* import { useMedicalNote } from "./MedicalNoteContext";
 */
/* import SubmitButton from "../SubmitButton";
 */import PatientInfo from "./PatientInfo";
 import MedicalNoteText from "./MedicalNoteText";
import PatientHistory from "./PatientHistory";


export default function MedicalNoteForm(): JSX.Element {

    return(
        <div className="flex h-screen bg-gradient-to-br from-teal-100 to-blue-100 p-4 space-x-4">
            <PatientInfo />
            <MedicalNoteText />
            <PatientHistory />
        </div>
    )
}