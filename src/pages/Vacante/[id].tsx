import useSWR from "swr"
import { TVacant } from "@app/@types/vacant"
import { Card } from "@app/modules/common/card"
import { Header } from "@app/modules/common/header"
import useMutate from "@app/hooks/useMutation.hook"
import { VacantForm } from "@app/modules/common/VacantForm"
import { DotsLoader } from "@app/modules/common/loader/dotsLoader"
import vacantRepository from "@app/repositories/vacant.repository"
import { toast } from "@app/util/toast"

type Props = {
  params: { id: string }
}

const isValidSlug = (jobSlug: string) => Number.isFinite(Number(jobSlug))

const VacantEdit: React.FC<Props> = ({ params }) => {
  const { isLoading, data } = useSWR(isValidSlug(params.id) ? { id: params.id } : undefined, vacantRepository.getVacant.bind(vacantRepository))
  const { mutate } = useMutate(vacantRepository.updateVacant.bind(vacantRepository));

  if (isLoading || !data) return <DotsLoader />;

  const handleSubmit = async (data: TVacant) => {
    const [_, error] = await mutate(Number(params.id), data);
    if (error) {
      toast.failed('Hubo un error al editar la vacante');
    } else {
      toast.successful('Vacante editada exitosamente');
    }
  }

  return (
    <>
      <Header />
      <div>
        <main className="grid place-items-center pt-10">
          <Card className="w-[40rem]">
            <h2>Editar Vacante</h2>
            <VacantForm vacant={data} onSubmit={handleSubmit} />
          </Card>
        </main>
      </div>
    </>
  )
}

export default VacantEdit;
