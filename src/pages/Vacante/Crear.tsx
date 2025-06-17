import { Card } from "@app/modules/common/card";
import useMutate from "@app/hooks/useMutation.hook";
import { VacantForm } from "@app/modules/common/VacantForm";
import vacantRepository from "@app/repositories/vacant.repository";
import { Header } from "@app/modules/common/header";
import { TVacant } from "@app/@types/vacant";
import { toast } from "@app/util/toast";
import { useLocation } from "wouter";
import { ROUTES_PATHS } from "@app/constants/routes.constant";

const CrearVacante = () => {
  const { mutate } = useMutate(
    vacantRepository.createVacant.bind(vacantRepository)
  );
  const [_, setLocation] = useLocation()

  const handleCreate = async (vacant: TVacant) => {
    const resp = await mutate(vacant)
    if (resp[1]) {
      toast.failed('Hubo un error al crear la vacante');
    } else {
      toast.successful('Vacante creada exitosamente');
      setLocation(ROUTES_PATHS.HOME)
    }
    return resp;
  }

  return (
    <>
      <Header />
      <div className="h-screen grid place-items-center">
        <Card className="w-[40rem]">
          <main>
            <h1 className="text-lg font-semibold text-center">
              Crear una Vacante
            </h1>
            <VacantForm onSubmit={handleCreate} />
          </main>
        </Card>
      </div>
    </>
  );
};

export default CrearVacante;
