import { TResume } from "@app/@types/resume";
import { Skeleton } from "@app/components/ui/skeleton";
import { useGetResumes } from "@app/hooks/useGetResumes.hook";
import { useState } from "react";

type Props = {
  onSelect?: (cv: TResume.Overview) => Promise<void>;
}

const CvList: React.FC<Props> = ({
  onSelect,
}) => {
  const { isLoading, data } = useGetResumes();
  const [isApplying, setIsApplying] = useState(false); 

  const handleSelect = async (resume: TResume.Overview) => {
    if (!onSelect) return;
    try {
      setIsApplying(true);
      await onSelect(resume); 
    } finally {
      setIsApplying(false);
    }
  }

  return (
    <article>
      <h2 className="text-xl font-medium text-center">
        Elije la hoja de vida para aplicar.
      </h2>
      <section className="p-6">
        {isLoading ? (
          <Skeleton className="w-full h-10" />
        ) : (
          <ul className="flex flex-col gap-2">
            {data?.map((resume) => (
              <li key={resume.id} className="font-normal hover:bg-stone-100 rounded">
                <button type="button" className="py-2 px-2 w-full text-left" onClick={() => {
                  handleSelect(resume);
                }}>
                  {resume.title}
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </article>
  );
};

export default CvList;
