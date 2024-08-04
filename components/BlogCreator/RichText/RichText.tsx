"use client";

import "quill/dist/quill.snow.css"; // Add css for snow theme
import { useQuill } from "react-quilljs";
import { useEffect, useRef } from "react";

interface RichTextProps {
  name: string;
}

export default function RichText({ name }: RichTextProps) {
  const placeholder = "Содржина";

  const { quillRef, quill } = useQuill({
    placeholder,
  });

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (quill) {
      quill.on("text-change", () => {
        if (inputRef.current) {
          inputRef.current.value = quill.root.innerHTML;
        }
      });
    }
  }, [quill]);

  return (
    <div className="flex flex-col w-full h-128 rounded-xl border placeholder-grey">
      <div ref={quillRef} className="max-h-full overflow-hidden rounded-xl" />
      <input type="hidden" name={name} ref={inputRef} />
    </div>
  );
}
