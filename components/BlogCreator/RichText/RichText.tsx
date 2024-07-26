"use client";

import "quill/dist/quill.snow.css"; // Add css for snow theme
import { useQuill } from "react-quilljs";

export default function RichText() {
  const placeholder = "Содржина";

  const { quillRef } = useQuill({
    placeholder,
    formats: [] // Added this to remove console error
  });

  return (
    <div className="flex flex-col w-full h-128 rounded-xl border placeholder-grey">
      <div ref={quillRef} className="max-h-full overflow-hidden rounded-xl" />
    </div>
  );
}
