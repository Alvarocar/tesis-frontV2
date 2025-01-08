import { useState } from "react";
import { GlobeIcon } from "lucide-react";
import { TResume } from "@app/@types/resume";
import { Dialog, DialogContent } from "@app/components/ui/dialog";
import { LanguageForm } from "./children/LanguageForm";
import { LanguageNameFactory } from "@app/constants/resume.constant";

type Props = {
  languages?: TResume.ILanguage[];
}

const Languages: React.FC<Props> = ({
  languages,
}) => {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen(prev => !prev);

  return (
    <>
      <section>
        <header className="flex">
          <div className="flex flex-1 items-center gap-2">
            <GlobeIcon className="w-5 h-5" />
            <h3 className="text-lg font-medium">Idiomas</h3>
          </div>
          <button onClick={toggle} className="rounded-lg border border-gray-400 p-2">
            Agregar / Editar Idioma
          </button>
        </header>
        <ul>
          {languages?.map(lng => (
            <li className="p-2 mx-auto max-w-[30rem] border-b-2 border-zinc-400 flex gap-2">
              <span className="flex-1">{lng.name}</span>
              <span>{LanguageNameFactory.get(lng.level)}</span>
            </li>
          ))}
        </ul>
      </section>
      <Dialog open={open} onOpenChange={toggle} >
        <DialogContent onOpenAutoFocus={e => e.preventDefault()} className="max-w-[40rem]">
          <LanguageForm languages={languages} onClose={toggle} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Languages;
