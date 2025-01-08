import { Blocks } from "lucide-react";
import { TResume } from "@app/@types/resume";

type Props = {
  skills?: TResume.ISkill[];
}

const Skills: React.FC<Props> = ({
  skills,
}) => {
  return (
    <section>
      <header className="flex">
        <div className="flex flex-1 items-center gap-2">
          <Blocks className="w-5 h-5" />
          <h3 className="text-lg font-medium">Habilidades</h3>
        </div>
        <button className="rounded-lg border border-gray-400 p-2">
          Agregar / Editar Habilidad
        </button>
      </header>
      <ul>
        {skills?.map(skill => (
          <li className="capitalize mx-auto max-w-[30rem] px-2 py-2 border-b-2 border-gray-400" key={skill.id}>
            {skill.name}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Skills;
