import { TResume } from "@app/@types/resume";
import { ResumeDescriptionForm } from "./children/ResumeDescriptionForm";
import { PersonalInfoForm } from "./children/PersonalInfoForm";
import { Experiences } from "./children/Experiences";
import { Languages } from "./children/Languages";
import { Studies } from "./children/Studies";
import { Skills } from "./children/Skills";


type Props = {
  resume: TResume;
  onUpdate?: VoidFunction;
}

const EditResume: React.FC<Props> = ({ resume }) => {

  return (
    <main className="my-5 mx-5 lg:mx-auto p-5 border border-gray-300 rounded-md max-w-[60rem]">
      <h1 className="text-xl font-semibold">Editar Hoja de vida</h1>
      <p className="text-gray-500">Actualiza tu información personal/profesional</p>
      <hr className="my-4" />
      <PersonalInfoForm />
      <hr className="my-4" />
      <ResumeDescriptionForm description={resume.aboutMe} />
      <hr className="my-4" />
      <Studies studies={resume.educations} />
      <hr className="my-4" />
      <Experiences experiences={resume.experiences} />
      <hr className="my-4" />
      <Skills skills={resume.skills} />
      <hr className="my-4" />
      <Languages languages={resume.languages} />
    </main>
  )
}

export default EditResume;
