import { Brain } from "lucide-react";
import { TResume } from "@app/@types/resume";
import { Dialog, DialogContent } from "@app/components/ui/dialog";
import { useState } from "react";
import { KnowledgeForm } from "./children/KnowledgeForm";

type Props = {
  knowledge?: TResume.IKnowledge[];
}

const Knowledge: React.FC<Props> = ({
  knowledge,
}) => {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen(prev => !prev)

  return (
    <>
      <section>
        <header className="flex">
          <div className="flex flex-1 items-center gap-2">
            <Brain className="w-5 h-5" />
            <h3 className="text-lg font-medium">Conocimientos</h3>
          </div>
          <button onClick={toggle} className="rounded-lg border border-gray-400 p-2">
            Agregar / Editar Conocimiento
          </button>
        </header>
        <ul>
          {knowledge?.map(item => (
            <li className="capitalize mx-auto max-w-[30rem] px-2 py-2 border-b-2 border-gray-400" key={item.name}>
              {item.name}
            </li>
          ))}
        </ul>
      </section>
      <Dialog open={open} onOpenChange={toggle} >
        <DialogContent onOpenAutoFocus={e => e.preventDefault()} className="max-w-[40rem]">
          <KnowledgeForm  onFinish={toggle} />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Knowledge;