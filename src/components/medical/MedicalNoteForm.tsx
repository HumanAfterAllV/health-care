/**
 * *Important Note*
 * TODO Correct alignment and positioning of components
 */

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
import PatientHistory from "./PatientHistory";


export default function MedicalNoteForm(): JSX.Element {
    const { form, onSubmit } = useMedicalNote();

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: { levels: [1, 2, 3] },
                bulletList: {HTMLAttributes: {class: 'list-disc pl-4'}},
                horizontalRule: {HTMLAttributes: {class: 'my-4'}},
            }),
            TextStyle,
            Image.configure({
                inline: true
            }),
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Under,
            Highlight.configure({
                HTMLAttributes: {class: 'bg-[#90E0EF]' }
            }),
            Placeholder.configure({
                placeholder: 'Type something...',
            }),
            Color,
        ],
        editorProps: {
            attributes: {
                class: 'flex flex-col px-4 py-3 justify-start w-full h-full focus:outline-[#00B4D8] overflow-auto font-family: inter',
            },
        },
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
            <form  onSubmit={form.handleSubmit(onSubmit)} className="h-screen overflow-hidden">
                <div className="h-screen grid grid-cols-1 md:grid-cols-[1fr_3fr_1fr] gap-2 ml-8 mr-4">
                    <div className="sticky top-0 self-start overflow-auto h-full p-4">
                        <PatientInfo /* editor={editor} *//>
                    </div>
                    <div className="overflow-auto p-4">
                        <MedicalNoteText editor={editor}/>
                    </div >
                    <div className="sticky top-0 self-start overflow-auto max-h-screen p-4">
                        <PatientHistory />
                    </div>
                </div>
            </form>
        </Form>
    )
}