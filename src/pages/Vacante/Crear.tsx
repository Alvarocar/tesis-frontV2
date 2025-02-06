import { Card } from "@app/modules/common/card";
import useMutate from "@app/hooks/useMutation.hook";
import { VacantForm } from "@app/modules/common/VacantForm";
import vacantRepository from "@app/repositories/vacant.repository";
import { Header } from "@app/modules/common/header";

const CrearVacante = () => {
  const { mutate } = useMutate(
    vacantRepository.createVacant.bind(vacantRepository)
  );
  return (
    <>
      <Header />
      <div className="h-screen grid place-items-center">
        <Card className="w-[40rem]">
          <main>
            <h1 className="text-lg font-semibold text-center">
              Crear una Vacante
            </h1>
            <VacantForm onSubmit={mutate} />
          </main>
        </Card>
      </div>
    </>
  );
};

export default CrearVacante;
