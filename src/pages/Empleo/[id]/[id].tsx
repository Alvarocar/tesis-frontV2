import { NotFound } from "@app/modules/common/error/NotFound"

type Props = {
  params: { jobSlug: string }
}

const JobById: React.FC<Props> = ({ params }) => {
  if (!Number.isFinite(params.jobSlug)) return <NotFound />
  return <div>Hola</div>
}

export default JobById;
