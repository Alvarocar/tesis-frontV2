import { TApplicationVacantOverview } from "@app/@types/vacant";
import { Typography } from "@app/components/ui/typography";
import { formatFeedBack, getAffinityColor } from "@app/util/string";
import classNames from "classnames";
import { Link } from "wouter";

const ProcessCard = ({ process }: { process: TApplicationVacantOverview }) => {

  const feedBack = process.feedBack ?? ""

  return (
    <div className="p-4 rounded bg-white shadow-md">
      <header className="py-2">
        <section className="flex items-center">
          <h2 className="text-lg flex-1"><strong>Postulante:</strong> {process.applicant.firstName} {process.applicant.lastName}</h2>
          <Link className="bg-blue-950 text-white px-4 py-2 rounded" to={`aplicacion/${process.id}`}>Ir al Detalle</Link>
        </section>
        <Typography noMargin className="font-medium text-sm">
          Porcentaje de affinidad:
          <span className={classNames("font-bold mr-2", getAffinityColor(process.affinity))}> {process.affinity} %</span>
        </Typography>
      </header>
      <p className="text-sm line-clamp-6 whitespace-pre-line">{formatFeedBack(feedBack)}</p>
    </div>
  )
}

export default ProcessCard;
