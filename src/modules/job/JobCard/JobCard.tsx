import { Link } from "wouter";
import classNames from "classnames";
import { TJobPreview } from "@app/@types/jobs";
import { Card } from "@app/modules/common/card";
import { Buildings, Clock, DollarCircle } from "iconsax-react";

type Props = {
  className?: string;
  job: TJobPreview;
};

const currencyFormat = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' })

const JobCard: React.FC<Props> = ({ className, job }) => {
  return (
    <Card className={classNames("w-80  min-h-56 h-fit", className)}>
      <h4 className="font-semibold">{job.title}</h4>
      <article>
        <ul className="flex flex-col gap-3">
          <li className="flex gap-2 items-center">
            <Buildings size={20} />
            <p>{job.company}</p>
          </li>
          <li className="flex gap-2 items-center">
            <DollarCircle size={20} />
            <p>{currencyFormat.format(job.salaryOffer)}</p>
          </li>
          <li className="flex gap-2 items-center">
          <Clock size={20} />
          <p>{job.jobType}</p>
          </li>
        </ul>
        <section className="mt-6">
          <Link href={`/empleo/${job.id}`} className="px-5 py-2 text-white rounded-lg bg-zinc-900 hover:bg-zinc-900/90" >Ver detalle</Link>
        </section>
      </article>
    </Card>
  );
};

export default JobCard;
