import {
  EditorContent,
  useEditor,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const extensions = [StarterKit];

type Props = {
  value?: string;
  onChange?: (value: string) => void;
}

const RichText: React.FC<Props> = ({
  value,
  onChange,
}) => {
  const editor = useEditor({
    extensions,
    content: value,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    }
  })

  return (
    <EditorContent className="text-rich bg-white overflow-y-scroll border-2" editor={editor}/>
  );
};

export default RichText;
