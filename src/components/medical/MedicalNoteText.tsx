"use client";

import { ForwardRefExoticComponent, RefAttributes, useEffect, useState } from "react";

import { useEditor, EditorContent, Editor } from "@tiptap/react";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from '@tiptap/extension-highlight';
import Placeholder from '@tiptap/extension-placeholder';
import {Underline as Under} from "@tiptap/extension-underline";
import { StarterKit } from "@tiptap/starter-kit";


import { LucideProps } from 'lucide-react';
import { Tooltip, TooltipProvider, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { FileText, Bold, Italic, Underline, List, AlignLeft, AlignCenter, AlignRight, Highlighter, Undo, Redo, Heading1, Heading2, Heading3 } from 'lucide-react';
import { Button } from "../ui/button";

import SubmitButton from "../SubmitButton";


interface ToolBarItem {
    icon: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>;
    action: () => void;
    isActive: boolean;
    tooltip?: string;
}

type ToolBarProps = {
    editor: Editor | null;
};


const ToolBar = ({editor}: ToolBarProps): JSX.Element => {
    if(!editor) return <></>;

    const items: ToolBarItem[] = [
        { icon: Bold, action: () => editor.chain().focus().toggleBold().run(), isActive: editor.isActive('bold'), tooltip: 'Bold' },
        { icon: Italic, action: () => editor.chain().focus().toggleItalic().run(), isActive: editor.isActive('italic'), tooltip: 'Italic' },
        { icon: Underline, action: () => editor.chain().focus().toggleUnderline().run(), isActive: editor.isActive('underline'), tooltip: 'Underline' },
        { icon: List, action: () => editor.chain().focus().toggleBulletList().run(), isActive: editor.isActive('bulletList'), tooltip: 'Bullet List' },
        { icon: AlignLeft, action: () => editor.chain().focus().setTextAlign('left').run(), isActive: editor.isActive({ textAlign: 'left' }), tooltip: 'Align Left' },
        { icon: AlignCenter, action: () => editor.chain().focus().setTextAlign('center').run(), isActive: editor.isActive({ textAlign: 'center' }), tooltip: 'Align Center' },
        { icon: AlignRight, action: () => editor.chain().focus().setTextAlign('right').run(), isActive: editor.isActive({ textAlign: 'right' }), tooltip: 'Align Right' },
        { icon: Heading1, action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(), isActive: editor.isActive('heading', { level: 1 }), tooltip: 'Heading 1' },
        { icon: Heading2, action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(), isActive: editor.isActive('heading', { level: 2 }), tooltip: 'Heading 2' },
        { icon: Heading3, action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(), isActive: editor.isActive('heading', { level: 3 }), tooltip: 'Heading 3' },
        { icon: Highlighter, action: () => editor.chain().focus().toggleHighlight().run(), isActive: editor.isActive('highlight'), tooltip: 'Highlight' },
        { icon: Undo, action: () => editor.chain().focus().undo().run(), isActive: false, tooltip: 'Undo' },
        { icon: Redo, action: () => editor.chain().focus().redo().run(), isActive: false, tooltip: 'Redo' },
    ]

    return(
        <div className="mb-4 flex flex-wrap gap-2 p-2 rounded-md overflow-x-auto">
            <TooltipProvider>
                {items.map(({ icon: Icon, action, isActive, tooltip }, index) => (
                    <Tooltip key={index}>
                        <TooltipTrigger asChild>
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={action}
                                className={`p-2 hover:bg-gray-200 ${isActive ? 'bg-gray-200' : 'bg-white'} flex-shrink-0`}
                            >
                                <Icon className="h-4 w-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent className="shadow-lg bg-white">
                            {tooltip}
                        </TooltipContent>
                    </Tooltip>
                ))}
            </TooltipProvider>
        </div>
    )
}


export default function MedicalNoteText(): JSX.Element {

    const [isLoading, setIsLoading] = useState<boolean>(false);


    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: false,
                bulletList: {HTMLAttributes: {class: 'list-disc pl-4'}},
            }),
            TextAlign.configure({
                types: ['heading', 'paragraph'],}),
            Under,
            Highlight,
            Placeholder.configure({
                placeholder: 'Type something...',
            }),
            
        ],
        content: localStorage.getItem('content') || '',
        editable: true,
        onUpdate: ({ editor }) => {
            const content = editor.getHTML();
            localStorage.setItem('content', content);
        },
        immediatelyRender: false,
      });

      useEffect(() => {
        const saveContent = localStorage.getItem('content');
        if(saveContent) {
            editor?.commands.setContent(saveContent);
        }
      },[editor])


    return (
        <Card className="flex h-full flex-1 flex-col shadow-lg bg-white">
            <CardHeader className="bg-secondary p-4 flex flex-row gap-1 items-center">
                <FileText width={24} height={24} className="mr-1"/>
                <CardTitle className="text-2xl">New Medical Note</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col h-full">
                <ToolBar editor={editor} />
                <div className="flex-1 relative overflow-hidden">
                    <div
                        style={{
                            minHeight: '100%',
                            width: '100%',
                            maxWidth: '100%',
                        }} 
                        className="bg-white mx-auto border shadow-sm rounded-md relative"
                    >
                    <EditorContent 
                        editor={editor} 
                        scrolling="true" 
                        className="absolute inset-0 border rounded-md cursor-text focus:outline-none overflow-auto"/>
                    </div>
                </div>
                <div className="mt-2">
                    <SubmitButton isLoading={isLoading}>
                        Save
                    </SubmitButton>
                </div>
            </CardContent>
        </Card>
    );
}
<style jsx global>{`
  .ProseMirror {
    min-height: 100%;
  }
  .ProseMirror p.is-editor-empty:first-child::before {
    color: #adb5bd;
    content: attr(data-placeholder);
    float: left;
    height: 0;
    pointer-events: none;
  }
  .ProseMirror-focused {
    outline: none;
  }
  .ProseMirror-focused .ProseMirror-gapcursor {
    display: block;
  }
  @keyframes blink {
    0% { opacity: 1; }
    50% { opacity: 0; }
    100% { opacity: 1; }
  }
  .ProseMirror .ProseMirror-gapcursor:after {
    content: "";
    display: inline-block;
    width: 1px;
    height: 1.2em;
    background-color: black;
    animation: blink 1s steps(2, start) infinite;
    vertical-align: text-bottom;
  }
`}</style>

