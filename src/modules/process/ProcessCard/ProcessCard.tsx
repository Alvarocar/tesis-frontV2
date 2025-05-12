import { TApplicationVacantOverview } from "@app/@types/vacant";
import { formatFeedBack } from "@app/util/string";
import { Link } from "wouter";

const ProcessCard = ({ process }: { process: TApplicationVacantOverview }) => {

  const feedBack = process.feedBack ?? ""

  return (
    <div className="p-4 rounded bg-white shadow-md">
      <header className="flex justify-between items-center py-2">
        <h2 className="text-lg"><strong>Postulante:</strong> {process.applicant.firstName} {process.applicant.lastName}</h2>
        <Link className="bg-blue-950 text-white px-4 py-2 rounded" to={`aplicacion/${process.id}`}>Ir al Detalle</Link>
      </header>
      <p className="text-sm line-clamp-6 whitespace-pre-line">{formatFeedBack(feedBack)}</p>
    </div>
  )
}

export default ProcessCard;
