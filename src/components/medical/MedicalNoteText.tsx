"use client";

import { ForwardRefExoticComponent, RefAttributes } from "react";

import { useMedicalNote } from "@/hooks/MedicalNoteContext";

import { EditorContent, Editor } from "@tiptap/react";

import { getTemplate } from "@/lib/actions/doctor.actions";

import { Tooltip, TooltipProvider, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Select, SelectContent, SelectGroup, SelectItem, SelectValue, SelectTrigger  } from "../ui/select";
import { Button } from "../ui/button";

import { LucideProps } from 'lucide-react';
import { FileText, Bold, Italic, Underline, List, AlignLeft, AlignCenter, SquareMinus ,AlignRight, Highlighter, Undo, Redo, Heading1, Heading2, Heading3, Brush } from 'lucide-react';

interface ToolBarItem {
    icon: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>;
    action: () => void;
    isActive: boolean;
    tooltip?: string;
}

type EditorType = {
    editor: Editor | null;
};


const ToolBar = ({editor}: EditorType): JSX.Element => {
    if(!editor) return <></>;

    const items: ToolBarItem[] = [
        { icon: Bold, action: () => editor.chain().focus().toggleBold().run(), isActive: editor.isActive('bold'), tooltip: 'Bold' },
        { icon: Italic, action: () => editor.chain().focus().toggleItalic().run(), isActive: editor.isActive('italic'), tooltip: 'Italic' },
        { icon: Underline, action: () => editor.chain().focus().toggleUnderline().run(), isActive: editor.isActive('underline'), tooltip: 'Underline' },
        { icon: List, action: () => editor.chain().focus().toggleBulletList().run(), isActive: editor.isActive('bulletList'), tooltip: 'Bullet List' },
        { icon: AlignLeft, action: () => editor.chain().focus().setTextAlign('left').run(), isActive: editor.isActive({ textAlign: 'left' }), tooltip: 'Align Left' },
        { icon: AlignCenter, action: () => editor.chain().focus().setTextAlign('center').run(), isActive: editor.isActive({ textAlign: 'center' }), tooltip: 'Align Center' },
        { icon: AlignRight, action: () => editor.chain().focus().setTextAlign('right').run(), isActive: editor.isActive({ textAlign: 'right' }), tooltip: 'Align Right' },
        { icon: SquareMinus, action: () => editor.chain().focus().setHorizontalRule().run(), isActive: editor.isActive('strike'), tooltip: 'Strike' },
        { icon: Heading1, action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(), isActive: editor.isActive('heading', { level: 1 }), tooltip: 'Heading 1' },
        { icon: Heading2, action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(), isActive: editor.isActive('heading', { level: 2 }), tooltip: 'Heading 2' },
        { icon: Heading3, action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(), isActive: editor.isActive('heading', { level: 3 }), tooltip: 'Heading 3' },
        { icon: Highlighter, action: () => editor.chain().focus().toggleHighlight().run(), isActive: editor.isActive('highlight'), tooltip: 'Highlight' },
        { 
            icon: Brush, 
            action: () => {
              const currentColor = editor.getAttributes('textStyle').color;
              const newColor = currentColor === '#0d9488' ? '#000000' : '#0d9488'; 
              editor.chain().focus().setColor(newColor).run();
            }, 
            isActive: editor.getAttributes('textStyle').color === '#0d9488', 
            tooltip: 'Color' 
        },
        { icon: Undo, action: () => editor.chain().focus().undo().run(), isActive: false, tooltip: 'Undo' },
        { icon: Redo, action: () => editor.chain().focus().redo().run(), isActive: false, tooltip: 'Redo' },
    ]

    return(
        <div className="flex flex-wrap gap-2 p-2 rounded-md shadow-md border items-center overflow-x-auto">
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


export default function MedicalNoteText({ editor }: { editor: Editor | null }): JSX.Element {


    const { appointment } = useMedicalNote();

      const applyTemplate = async(templateType: string) => {
        const template = await getTemplate(templateType, appointment);
        if (editor) {
            editor.commands.setContent(template);
        }
    };

    return (
        <Card className="flex h-full flex-1 flex-col shadow-lg bg-white">
            <CardHeader className="p-4 flex flex-row gap-1 items-center">
                <FileText width={24} height={24} className="mr-1"/>
                <CardTitle className="text-2xl">New Medical Note</CardTitle>
                <Select onValueChange={(value) => applyTemplate(value)}>
                    <SelectTrigger className="w-[180px] border-gray-400 pl-2">
                        <SelectValue placeholder="Select template"/>
                    </SelectTrigger>
                    <SelectContent className="shad-select-content">
                        <SelectGroup>
                            <SelectItem className="hover:bg-gray-100" value="Consultation">Consultation</SelectItem>
                            <SelectItem className="hover:bg-gray-100" value="RoutineCheckUp">Routine CheckUp</SelectItem>
                            <SelectItem className="hover:bg-gray-100" value="FollowUp">Follow Up</SelectItem>
                            <SelectItem className="hover:bg-gray-100" value="SecondOpinion">Second Option</SelectItem>
                            <SelectItem className="hover:bg-gray-100" value="EmergencyVisit">Emergency</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
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
                            style={{whiteSpace: "pre-line"}}
                            className="absolute inset-0 rounded-md cursor-text"
                        />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

