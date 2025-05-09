import { useState } from "react";
import { Building } from "iconsax-react";
import {  GraduationCap, PenBox, Trash2 } from "lucide-react";
import { TResume } from "@app/@types/resume";
import { StudyForm } from "./children/StudyForm";
import { Dialog, DialogContent } from "@app/components/ui/dialog";
import { useDeleteStudy } from "./useDeleteStudy";

type Props = {
  studies?: TResume.IEducation[],
}

const Studies: React.FC<Props> = ({
  studies = [],
}) => {
  const [study, setStudy] = useState<TResume.IEducation | undefined>();
  const [open, setOpen] = useState(false);

  const toggle = (value?: boolean) => setOpen(prev => typeof value === 'boolean' ? value : !prev);

  const handleStudy = (study?: TResume.IEducation) => {
    setStudy(study);
    toggle()
  }

  const { deleteStudy, isLoading: isDeleting } = useDeleteStudy();

  return (
    <>
      <article>
        <header className="flex">
          <div className="flex flex-1 gap-2 text-lg font-medium mb-2 flex gap-2 items-center">
            <GraduationCap className="w-5 h-5 my-auto" /> Educación
          </div>
          <button onClick={() => handleStudy()} className="rounded-lg border border-gray-400 p-2">
            Agregar Educación
          </button>
        </header>
        <ul className="max-w-full w-[40rem] mx-auto my-6 flex flex-col gap-4">
          {studies.map(study => (
            <li 
              key={study.id}
              className="p-5 border border-gray-400 rounded-lg flex"
              >
                <section className="flex-1">
                  <h1 className="font-medium">{study.title}</h1>
                  <span className="text-gray-500 flex gap-2">
                    <Building className="h-5 w-5" /> {study.institute}
                  </span>

                </section>
                <aside className="flex flex-col gap-2">
                  <span>
                    {study.startDate} - {study.keepStudy ? 'Actual' : study.endDate}
                  </span>
                  <section className="flex justify-end gap-4">
                    <button onClick={() => handleStudy(study)} className="">
                      <PenBox />
                    </button>
                    <button disabled={isDeleting} onClick={() => study.id && deleteStudy(study.id)}>
                      <Trash2 />
                    </button>
                  </section>
                </aside>
            </li>
          ))}
        </ul>
      </article>
      <Dialog open={open} onOpenChange={toggle}>
        <DialogContent onOpenAutoFocus={e => e.preventDefault()} className="max-w-[40rem]" >
          <StudyForm
            study={study}
            onFinish={toggle}
          />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default Studies;
