"use client";

import { Bold, Italic, Underline, List, AlignLeft, AlignCenter, SquareMinus ,AlignRight, Highlighter, Undo, Redo, Heading1, Heading2, Heading3, Brush} from 'lucide-react';
import { Editor } from "@tiptap/react";

import { getTemplate } from "@/lib/actions/doctor.actions";
import { useMedicalNote } from "@/hooks/useNoteContext";

import { Tooltip, TooltipProvider, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Select, SelectContent, SelectGroup, SelectItem, SelectValue, SelectTrigger  } from "../ui/select";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";

interface ToolBarItem {
    icon: Icon;
    action: () => void;
    isActive: boolean;
    tooltip?: string;
    shortcut?: string;
}

type EditorType = {
    editor: Editor | null;
};


export default function Toolbar({editor}: EditorType): JSX.Element {

    const { appointment } = useMedicalNote();

    if (!editor) return <></>;

    const items: ToolBarItem[] = [
        { icon: Bold, action: () => editor.chain().focus().toggleBold().run(), isActive: editor.isActive('bold'), tooltip: 'Bold'},
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
              const newColor = currentColor === '#48dab3' ? '#000000' : '#48dab3'; 
              editor.chain().focus().setColor(newColor).run();
            }, 
            isActive: editor.getAttributes('textStyle').color === '#48dab3', 
            tooltip: 'Color' 
        },
        { icon: Undo, action: () => editor.chain().focus().undo().run(), isActive: false, tooltip: 'Undo' },
        { icon: Redo, action: () => editor.chain().focus().redo().run(), isActive: false, tooltip: 'Redo' },
    ];

    const selectItem: Array<string> = ["Consultation", "RoutineCheckUp", "FollowUp", "SecondOpinion", "EmergencyVisit"];


    const applyTemplate = async(templateType: string) => {
        const template = await getTemplate(templateType, appointment);
        if (editor) {
            editor.commands.setContent(template);
        }
    };

    return(
        <TooltipProvider delayDuration={300}>
            <div className="fixed top-28 left-1/2 transform -translate-x-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white">
                <div className="flex items-center gap-4 px-2 py-1 rounded-lg bg-background border shadow-lg">
                    <Select onValueChange={(value) => applyTemplate(value)}>
                        <SelectTrigger className="w-[130px] border text-dark-800 rounded-md ml-1">
                            <SelectValue placeholder="Template"/>
                        </SelectTrigger>
                        <SelectContent className="shad-select-content">
                            <SelectGroup>
                                {selectItem.map((item, index) => (
                                    <SelectItem key={index} value={item} className="hover:bg-green-200">
                                        {item}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <Separator orientation="vertical" className="h-6"/>
                    <div className="flex items-center gap-1">
                        {items.map(({ icon: Icon, action, isActive, tooltip }, index) => (
                            <Tooltip key={index}>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={action}
                                        className={`p-2 ml-1 hover:bg-green-200 ${isActive ? 'bg-green-200' : 'bg-white'} flex-shrink-0`}
                                    >
                                        <Icon className="h-4 w-4" />
                                    </Button>

                                </TooltipTrigger>
                                <TooltipContent className="shadow-lg bg-white">
                                    {tooltip}
                                </TooltipContent>
                            </Tooltip>
                        ))}
                    </div>
                </div>
            </div>
        </TooltipProvider>
    )
}
