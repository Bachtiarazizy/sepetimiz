"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const TipTapRenderer = ({ json }: { json: any }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: json,
    editable: false,
    editorProps: {
      attributes: {
        class: "prose prose-sm sm:prose-base", // Adjust classes as needed
      },
    },
  });

  return <EditorContent editor={editor} />;
};

export default TipTapRenderer;
