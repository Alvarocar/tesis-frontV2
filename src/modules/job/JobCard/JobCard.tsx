import classNames from "classnames";
import { Edit, ExternalLink } from "lucide-react";
import { Buildings, Clock, DollarCircle } from "iconsax-react";
import { Link } from "@app/modules/common/router/Link";
import { useAuth } from "@app/hooks/useAuth.hook";
import { Card } from "@app/modules/common/card";
import { TJobPreview } from "@app/@types/jobs";

type Props = {
  className?: string;
  job: TJobPreview;
};

const currencyFormat = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
});

const JobCard: React.FC<Props> = ({ className, job }) => {
  const { userType } = useAuth();

  return (
    <Card className={classNames("w-80  min-h-56 h-fit relative", className)}>
      {job.editable ? (
        <Link
          className="border rounded-lg p-[0.5rem] absolute right-4 top-10"
          to={`/vacante/${job.id}`}
        >
          <Edit size={16} />
        </Link>
      ) : null}
      <h4 className="font-semibold">{job.title}</h4>
      <article>
        <ul className="flex flex-col gap-3">
          <li className="flex gap-2 items-center">
            <Buildings size={20} />
            <p>{job.company}</p>
          </li>
          <li className="flex gap-2 items-center">
            <DollarCircle size={20} />
            <p>
              {job.salaryOffer
                ? currencyFormat.format(job.salaryOffer)
                : "A convenir"}
            </p>
          </li>
          <li className="flex gap-2 items-center">
            <Clock size={20} />
            <p>{job.jobType}</p>
          </li>
        </ul>
        <section className="mt-6">
          <Link
            href={`/empleo/${job.id}`}
            className="px-5 py-2 rounded-lg flex gap-2 border-2"
          >
            <ExternalLink /> Ver detalle
          </Link>
        </section>
      </article>
    </Card>
  );
};

export default JobCard;
