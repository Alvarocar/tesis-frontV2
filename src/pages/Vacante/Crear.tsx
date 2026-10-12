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
    <div className="flex min-h-screen flex-col">
      <Header />
      <main
        id="main"
        tabIndex={-1}
        className="grid flex-1 place-items-center px-4 py-10 focus:outline-none"
      >
        <Card className="w-full max-w-2xl">
          <h1 className="mb-6 text-lg font-semibold text-center text-foreground">
            Crear una Vacante
          </h1>
          <VacantForm onSubmit={handleCreate} />
        </Card>
      </main>
    </div>
  );
};

export default CrearVacante;
