import { Blocks } from "lucide-react";

const Skills = () => {
  return (
    <section>
      <header className="flex">
        <div className="flex flex-1 items-center gap-2">
          <Blocks className="w-5 h-5" />
          <h3 className="text-lg font-medium">Habilidades</h3>
        </div>
        <button className="rounded-lg border border-gray-400 p-2">
          Agregar Habilidad
        </button>
      </header>
    </section>
  );
}

export default Skills;
