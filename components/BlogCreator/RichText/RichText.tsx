import "quill/dist/quill.snow.css";
import { useQuill } from "react-quilljs";
import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";

interface RichTextProps {
  name: string;
  initialValue?: string;
}

const RichText = forwardRef(({ name, initialValue = '' }: RichTextProps, ref) => {
  const { quillRef, quill } = useQuill({
    placeholder: "Содржина",
  });

  const inputRef = useRef<HTMLInputElement>(null);

  // Expose the Quill instance to the parent component via ref
  useImperativeHandle(ref, () => ({
    getQuill: () => quill,
  }), [quill]);

  useEffect(() => {
    if (quill) {
      quill.root.innerHTML = initialValue; // Set initial value
      quill.on("text-change", () => {
        if (inputRef.current) {
          inputRef.current.value = quill.root.innerHTML;
        }
      });
    }
  }, [quill, initialValue]);

  return (
    <div className="flex flex-col w-full h-128 rounded-xl border placeholder-grey">
      <div ref={quillRef} className="max-h-full overflow-hidden rounded-xl" />
      <input type="hidden" name={name} ref={inputRef} />
    </div>
  );
});

export default RichText;