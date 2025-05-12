import { useMemo } from "react";
import DOMPurify from "dompurify";
import { TJob } from "@app/@types/jobs";

type Props = {
  vacancy: TJob;
};

const VacancyProcess: React.FC<Props> = ({ vacancy }) => {
  
  const description = useMemo(
    () => DOMPurify.sanitize(vacancy.description),
    [vacancy.description]
  );

  return (
    <div>
      <h1>Proceso de Vacante {vacancy.title}</h1>
      <article
        className="border-t-2 py-2 unset-tailwind"
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </div>
  );
};

export default VacancyProcess;
