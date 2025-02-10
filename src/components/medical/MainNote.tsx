"use client";

import Toolbar from "./Toolbar";

import { EditorContent, Editor } from "@tiptap/react";

export default function MainNote({ editor }: { editor: Editor | null }): JSX.Element {

    return (
        <div className="min-h-[calc(100vh-4rem)] max-w-3xl mx-auto group">
            <div className="flex items-center ">
                <Toolbar editor={editor} />
            </div>
            <div className="space-y-8 pt-16 z-10">
            <EditorContent
                placeholder="Write your note here..."
                editor={editor} 
                className="[&>div]:outline-none [&_h1]:text-4xl [&_h1]:font-bold [&_h1]:mb-8 [&_p]:my-1"
            />
            </div>
      </div>
    );
}

