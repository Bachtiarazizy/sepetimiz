"use client";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import "react-quill/dist/quill.bubble.css";

interface PreviewProps {
  value: string;
}

export const Preview = ({ value }: PreviewProps) => {
  const ReactQuill = useMemo(() => dynamic(() => import("react-quill"), { ssr: false }), []);

  return (
    <>
      <style jsx global>{`
        .ql-bubble .ql-editor {
          padding: 0 !important;
          margin: 0 !important;
        }
      `}</style>
      <ReactQuill theme="bubble" value={value} readOnly />
    </>
  );
};
