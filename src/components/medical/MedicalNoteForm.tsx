"use client";

import { useEditor } from "@tiptap/react";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from '@tiptap/extension-highlight';
import Placeholder from '@tiptap/extension-placeholder';
import Image from "@tiptap/extension-image";
import Color from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";

import {Underline as Under} from "@tiptap/extension-underline";
import { StarterKit } from "@tiptap/starter-kit";

import { Form } from "../ui/form";

import { useMedicalNote } from "@/hooks/MedicalNoteContext";

import PatientInfo from "./PatientInfo";
import MedicalNoteText from "./MedicalNoteText";
/* import PatientHistory from "./PatientHistory"; */
import SubmitButton from "../SubmitButton";


export default function MedicalNoteForm(): JSX.Element {
    const { form, onSubmit, loading } = useMedicalNote();

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: { levels: [1, 2, 3] },
                bulletList: {HTMLAttributes: {class: 'list-disc pl-4'}},
                horizontalRule: {HTMLAttributes: {class: 'my-4'}},
            }),
            TextStyle,
            Color,
            Image.configure({
                inline: true
            }),
            TextAlign.configure({
                types: ['heading', 'paragraph'],}),
            Under,
            Highlight.configure({
                HTMLAttributes: {class: 'bg-teal-200'}
            }),
            Placeholder.configure({
                placeholder: 'Type something...',
            }),
            
        ],
        editorProps: {
            attributes: {
                class: 'flex flex-col px-4 py-3 justify-start w-full h-full focus:outline-teal-500 overflow-auto font-family: inter;',
            },
        },
        /* content: localStorage.getItem('content') || '', */
        editable: true,
    
        onUpdate: ({ editor }) => {
            const content = editor.getHTML();
            console.log('content:', content);
            form.setValue("medicalNoteText", { html: content } );
        },
        immediatelyRender: false,
        autofocus: true,
    });

    const watchText = form.watch("medicalNoteText");
    console.log("Current note text:", watchText);   
    
    return(
        <Form {...form}>
            <form  onSubmit={form.handleSubmit(onSubmit)} className="flex h-screen bg-gradient-to-br from-teal-100 to-blue-100 p-4 space-x-4">
                <PatientInfo editor={editor}/>
                <div className="flex flex-col h-full">
                    <MedicalNoteText editor={editor}/>
                    <div className="mt-2">
                        <SubmitButton isLoading={loading}>
                            Save
                        </SubmitButton>
                    </div>
                </div>
               {/*  <PatientHistory /> */}
            </form>
        </Form>
    )
}