import { BriefcaseIcon, Building, PenBox } from "lucide-react";
import { TResume } from "@app/@types/resume";

type Props = {
  experiences?: TResume.IExperience[];
}

const Experiences: React.FC<Props> = ({
  experiences = [],
}) => {
  return (
    <article>
      <header className="flex">
        <div className="flex flex-1 gap-2 text-lg font-medium mb-2 flex gap-2 items-center">
          <BriefcaseIcon className="w-5 h-5 my-auto" /> Experiencia
        </div>
        <button className="rounded-lg border border-gray-400 p-2">
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
                    {experience.start_date} - {experience.keep_working ? 'Actual' : experience.end_date}
                  </span>
                  <button className="w-fit mx-auto">
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
  )
}

export default Experiences;
