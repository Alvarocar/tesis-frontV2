import useSWR from "swr"
import { TVacant } from "@app/@types/vacant"
import { Card } from "@app/modules/common/card"
import { Header } from "@app/modules/common/header"
import useMutate from "@app/hooks/useMutation.hook"
import { VacantForm } from "@app/modules/common/VacantForm"
import { DotsLoader } from "@app/modules/common/loader/dotsLoader"
import vacantRepository from "@app/repositories/vacant.repository"

type Props = {
  params: { id: string }
}

const isValidSlug = (jobSlug: string) => Number.isFinite(Number(jobSlug))

const VacantEdit: React.FC<Props> = ({ params }) => {
  const { isLoading, data } = useSWR(isValidSlug(params.id) ? { id: params.id } : undefined, vacantRepository.getVacant.bind(vacantRepository))
  const { mutate } = useMutate(vacantRepository.updateVacant.bind(vacantRepository));

  if (isLoading || !data) return <DotsLoader />;

  const handleSubmit = (data: TVacant) => {
    return mutate(Number(params.id), data);
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
