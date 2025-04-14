import { BriefcaseIcon, Building, PenBox } from "lucide-react";
import { TResume } from "@app/@types/resume";
import { Dialog, DialogContent } from "@app/components/ui/dialog";
import { useState } from "react";
import { ExperienceForm } from "./children/ExperienceForm";

type Props = {
  experiences?: TResume.IExperience[];
}

const Experiences: React.FC<Props> = ({
  experiences = [],
}) => {
  const [experience, setExperience] = useState<TResume.IExperience | undefined>();
  const [open, setOpen] = useState(false);

  const toggle = (value?: boolean) => setOpen(prev => typeof value === 'boolean' ? value : !prev);

  const handleExperience = (experience?: TResume.IExperience) => {
    setExperience(experience);
    toggle()
  }

  return (
    <>
      <article>
        <header className="flex">
          <div className="flex flex-1 gap-2 text-lg font-medium mb-2 flex gap-2 items-center">
            <BriefcaseIcon className="w-5 h-5 my-auto" /> Experiencia
          </div>
          <button onClick={() => handleExperience()} className="rounded-lg border border-gray-400 p-2">
            Agregar Experiencia
          </button>
        </header>
        <ul className="max-w-full w-[40rem] mx-auto my-6">
          {experiences.map(experience => (
            <li 
              key={experience.id}
              className="p-5 border border-gray-400 rounded-lg flex flex-col gap-5"
              >
              <div className="flex">
                <section className="flex-1">
                    <h1 className="font-medium">{experience.rol}</h1>
                    <span className="text-gray-500 flex gap-2">
                      <Building className="h-5 w-5" /> {experience.company}
                    </span>

                  </section>
                  <aside className="flex flex-col gap-2">
                    <span>
                      {experience.startDate} - {experience.keepWorking ? 'Actual' : experience.endDate}
                    </span>
                    <button onClick={() => handleExperience(experience)} className="w-fit mx-auto">
                      <PenBox />
                    </button>
                  </aside>
              </div>
              <footer>
                  {experience.description}
              </footer>
            </li>
          ))}
        </ul>
      </article>
      <Dialog open={open} onOpenChange={toggle}>
          <DialogContent onOpenAutoFocus={e => e.preventDefault()} className="max-w-[40rem]">
            <ExperienceForm
              experience={experience}
              onFinish={toggle}
            />
          </DialogContent>
      </Dialog>
    </>
  )
}

export default Experiences;
