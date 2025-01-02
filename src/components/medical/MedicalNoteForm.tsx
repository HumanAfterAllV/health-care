/**
 * *Important Note*
 * TODO Correct alignment and positioning of components
 */

"use client";

import TextAlign from "@tiptap/extension-text-align";
import Highlight from '@tiptap/extension-highlight';
import Placeholder from '@tiptap/extension-placeholder';
import Image from "@tiptap/extension-image";
import Color from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import { useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import {Underline as Under} from "@tiptap/extension-underline";


import { useMedicalNote } from "@/hooks/useNoteContext";

import { Form } from "../ui/form";
import SignsVitalForm from "./SignsVitalForm";
import MainNote from "./MainNote";
import RecentNotes from "./RecentNotes";


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
                HTMLAttributes: {class: 'bg-[#48dab3]' }
            }),
            Placeholder.configure({
                placeholder: "Right your note here...",
            }),
            Color,
        ],
        content:`
        <h1>Note</h1>
        <p>Right your note here...</p>
        `,
                    
        editorProps:{
            attributes: {
                class: 'prose prose-sm max-w-none focus:outline-none min-h-[200px]'
            }
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
    
    return(
        <Form {...form}>
            <form  onSubmit={form.handleSubmit(onSubmit)} className="relative min-h-screen bg-background z-40">
                <div className="flex">
                    <div className="flex flex-1 ml-[90px]">
                        <div className="group fixed left-0 top-0 h-screen w-1 hover:w-[300px] transition-all duration-300 ease-in-out bg-background border-r z-20">
                            <div className="absolute top-1/2 -translate-y-1/2 left-1 opacity-40 group-hover:opacity-0 transition-opacity duration-300 rotate-90 text-xs text-muted-foreground whitespace-nowrap">
                                Signos Vitales →
                            </div>
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-[300px] h-full overflow-hidden">
                                <SignsVitalForm/>
                            </div>
                        </div>
                        <div className="flex-1 mx-auto px-4 w-full max-w-3xl py-8">
                            <MainNote editor={editor}/>
                        </div >
                        <div className="group fixed right-0 top-0 h-screen w-1 hover:w-[300px] transition-all duration-300 ease-in-out bg-background border-l z-20">
                            <div className="absolute top-1/2 -translate-y-1/2 right-1 opacity-40 group-hover:opacity-0 transition-opacity duration-300 -rotate-90 text-xs text-muted-foreground whitespace-nowrap">
                                ← Recent Notes
                            </div>
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-[300px] overflow-hidden">
                                <RecentNotes />
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </Form>
    )
}