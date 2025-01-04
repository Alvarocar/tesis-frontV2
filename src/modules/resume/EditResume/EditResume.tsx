import { PersonalInfoForm } from "./children/PersonalInfoForm";

const EditResume = () => {
  return (
    <main className="my-5 mx-5 lg:mx-auto p-5 border border-gray-300 rounded-md max-w-[60rem]">
      <h1 className="text-xl font-semibold">Editar Hoja de vida</h1>
      <p className="text-gray-500">Actualiza tu información personal/profesional</p>
      <hr className="my-4" />
      <PersonalInfoForm />
      <hr className="my-4" />
    </main>
  )
}

export default EditResume;
