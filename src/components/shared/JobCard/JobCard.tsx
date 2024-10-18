import { Buildings, Clock, DollarCircle } from "iconsax-react";
import { IJobCard } from "./JobCard.interface"

const JobCard: React.FC<IJobCard> = ({
  title,
  company,
  salary,
  type,
}) => {
  return (
    <article>
      <h4>{title}</h4>
      <section>
        <Buildings size={20} />
        <p>{company}</p>
      </section>
      <section>
        <DollarCircle size={20} />
        {salary ? salary : 'A convenir'}
      </section>
      <section>
        <section>
          <Clock size={20} />
          {type}
        </section>
        <button>
          Ver detalle
        </button>
      </section>
    </article>
  );
}

export default JobCard