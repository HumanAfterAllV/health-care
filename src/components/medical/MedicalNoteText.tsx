"use client";

import { ForwardRefExoticComponent, RefAttributes, useEffect, useState } from "react";

import { useEditor, EditorContent, Editor} from "@tiptap/react";
import  TextAlign from "@tiptap/extension-text-align";
import Highlight from '@tiptap/extension-highlight'
import { Underline as Under} from "@tiptap/extension-underline"
import { StarterKit } from "@tiptap/starter-kit";

import { LucideProps } from "lucide-react";
import { Tooltip, TooltipProvider, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { FileText ,Bold, Italic, Underline, List, AlignLeft, AlignCenter, AlignRight, Highlighter, Undo, Redo, Heading1, Heading2, Heading3 } from "lucide-react";
import { Button } from "../ui/button";

import SubmitButton from "../SubmitButton";
import Skeleton from "../Skeleton";


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
    if(!editor) return <Skeleton className="h-8 w-8" />;

    const items: ToolBarItem[] = [
        { icon: Bold, action: () => editor.chain().focus().toggleBold().run(), isActive: editor.isActive('bold'), tooltip: 'Bold' },
        { icon: Italic, action: () => editor.chain().focus().toggleItalic().run(), isActive: editor.isActive('italic'), tooltip: 'Italic' },
        { icon: Underline, action: () => editor.chain().focus().toggleUnderline().run(), isActive: editor.isActive('underline'), tooltip: 'Underline' },
        { icon: List, action: () => editor.chain().focus().toggleBulletList().run(), isActive: editor.isActive('bulletList'), tooltip: 'Bullet List' },
        { icon: AlignLeft, action: () => editor.chain().focus().setTextAlign('left').run(), isActive: editor.isActive({ textAlign: 'left' }), tooltip: 'Align Left' },
        { icon: AlignCenter, action: () => editor.chain().focus().setTextAlign('center').run(), isActive: editor.isActive({ textAlign: 'center' }), tooltip: 'Align Center' },
        { icon: AlignRight, action: () => editor.chain().focus().setTextAlign('right').run(), isActive: editor.isActive({ textAlign: 'right' }), tooltip: 'Align Right' },
        { icon: Heading1, action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(), isActive: editor.isActive({ heading: { level: 1 } }), tooltip: 'Heading 1' },
        { icon: Heading2, action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(), isActive: editor.isActive({ heading: { level: 2 } }), tooltip: 'Heading 2' },
        { icon: Heading3, action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(), isActive: editor.isActive({ heading: { level: 3 } }), tooltip: 'Heading 3' },
        { icon: Highlighter, action: () => editor.chain().focus().toggleHighlight().run(), isActive: editor.isActive('highlight'), tooltip: 'Highlight' },
        { icon: Undo, action: () => editor.chain().focus().undo().run(), isActive: false, tooltip: 'Undo' },
        { icon: Redo, action: () => editor.chain().focus().redo().run(), isActive: false, tooltip: 'Redo' },
    ]

    return(
        <div className="mb-4 flex flex-wrap gap-2 p-2 bg-gray-100 rounded-md">
            <TooltipProvider>
                {items.map(({ icon: Icon, action, isActive, tooltip }, index) => (
                    <Tooltip key={index}>
                        <TooltipTrigger asChild>
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={action}
                                className={`p-2 hover:bg-gray-200 ${isActive ? 'bg-gray-200' : 'bg-white'}`}
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
    const editor = useEditor({
        extensions: [
            StarterKit,
            TextAlign.configure({
                types: ['heading', 'paragraph'],}),
            Under,
            Highlight,
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


    const [isLoading, setIsLoading] = useState<boolean>(false);
    return (
        <Card className="flex h-full flex-1 flex-col shadow-lg bg-white">
            <CardHeader className="bg-secondary p-4 flex flex-row gap-1 items-center">
                <FileText width={24} height={24} className="mr-1"/>
                <CardTitle className="text-2xl">New Medical Note</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col h-full">
                <ToolBar editor={editor} />
                <div className="flex flex-col h-full flex-1">
                    <EditorContent editor={editor} className="h-full flex-1 mb-4 p-4 border rounded-md cursor-text focus:outline-none" />
                    <SubmitButton isLoading={isLoading}>
                        Save Note
                    </SubmitButton>
                </div>
            </CardContent>
        </Card>
    );
}