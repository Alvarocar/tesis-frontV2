import { TResume } from "@app/@types/resume";
import { PersonalInfoForm } from "./children/PersonalInfoForm";
import { ResumeDescriptionForm } from "./children/ResumeDescriptionForm";

type Props = {
  resume: TResume;
}

const EditResume: React.FC<Props> = ({ resume }) => {

  return (
    <main className="my-5 mx-5 lg:mx-auto p-5 border border-gray-300 rounded-md max-w-[60rem]">
      <h1 className="text-xl font-semibold">Editar Hoja de vida</h1>
      <p className="text-gray-500">Actualiza tu información personal/profesional</p>
      <hr className="my-4" />
      <PersonalInfoForm />
      <hr className="my-4" />
      <ResumeDescriptionForm description={resume.about_me} />
    </main>
  )
}

export default EditResume;
