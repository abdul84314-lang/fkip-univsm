"use client";
import React, { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

interface QuillEditorProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export default function QuillEditor({ value, onChange, className }: QuillEditorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<Quill | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    if (!quillRef.current) {
      quillRef.current = new Quill(containerRef.current, {
        theme: "snow",
        modules: {
          toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            ['link', 'blockquote'],
            ['clean']
          ]
        }
      });

      quillRef.current.on("text-change", () => {
        const html = quillRef.current?.root.innerHTML || "";
        // Only trigger onChange if there's actual content (Quill leaves <p><br></p> when empty)
        if (html === "<p><br></p>") {
          onChange("");
        } else {
          onChange(html);
        }
      });
    }
  }, [onChange]);

  // Sync external changes (e.g. form reset or changing editing row)
  useEffect(() => {
    if (quillRef.current && value !== quillRef.current.root.innerHTML) {
      // If value is empty, set it properly
      if (!value) {
        quillRef.current.root.innerHTML = "<p><br></p>";
      } else {
        const selection = quillRef.current.getSelection();
        quillRef.current.clipboard.dangerouslyPasteHTML(value);
        if (selection) {
          quillRef.current.setSelection(selection);
        }
      }
    }
  }, [value]);

  return <div ref={containerRef} className={className} />;
}
