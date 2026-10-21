import useSWR from "swr";
import { TResume } from "@app/@types/resume";
import { ResumeDescriptionForm } from "./children/ResumeDescriptionForm";
import {
  PersonalInfoForm,
  PersonalInfoSkeleton,
} from "./children/PersonalInfoForm";
import { Experiences } from "./children/Experiences";
import { TitleResume } from "./children/TitleResume";
import { WorkModalityForm } from "./children/WorkModality";
import { Languages } from "./children/Languages";
import { Studies } from "./children/Studies";
import { Skills } from "./children/Skills";
import { Knowledge } from "./children/Knowledge";
import { DeleteResume } from "./children/DeleteResume";
import { useAuth } from "@app/hooks/useAuth.hook";
import applicantRepository from "@app/repositories/applicant.repository";

type Props = {
  resume: TResume;
  onUpdate?: VoidFunction;
};

const EditResume: React.FC<Props> = ({ resume }) => {
  const { token } = useAuth();
  const { isLoading } = useSWR(
    token ? token : null,
    applicantRepository.getApplicant.bind(applicantRepository),
  );
  return (
    <div className="p-10 flex flex-col gap-4">
      <main className="lg:mx-auto p-5 border border-gray-300 rounded-md max-w-[60rem]">
        <h1 className="text-xl font-semibold">
          Editar Hoja de vida ({resume.title})
        </h1>
        <p className="text-gray-500">
          Actualiza tu información personal/profesional
        </p>
        <hr className="my-4" />
        <TitleResume />
        <WorkModalityForm />
        {isLoading ? <PersonalInfoSkeleton /> : <PersonalInfoForm />}
        <hr className="my-4" />
        <ResumeDescriptionForm description={resume.aboutMe} />
        <hr className="my-4" />
        <Studies studies={resume.educations} />
        <hr className="my-4" />
        <Experiences experiences={resume.experiences} />
        <hr className="my-4" />
        <Skills skills={resume.skills} />
        <hr className="my-4" />
        <Knowledge knowledge={resume.knowledge} />
        <hr className="my-4" />
        <Languages languages={resume.languages} />
      </main>
      <DeleteResume className="mx-auto p-5 border border-red-300 rounded-md w-full max-w-[43rem]" />
    </div>
  );
};

export default EditResume;
