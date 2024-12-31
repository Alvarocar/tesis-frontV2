import { Card } from "@app/modules/common/card";
import classNames from "classnames";
import { Buildings, Clock, DollarCircle } from "iconsax-react";
import { Link } from "wouter";

type Props = {
  className?: string;
};

const JobCard: React.FC<Props> = ({ className }) => {
  return (
    <Card className={classNames("w-80  min-h-56 h-fit", className)}>
      <h4 className="font-semibold">Desarrollador Angular Junior</h4>
      <article>
        <ul className="flex flex-col gap-3">
          <li className="flex gap-2 items-center">
            <Buildings size={20} />
            <p>UMB</p>
          </li>
          <li className="flex gap-2 items-center">
            <DollarCircle size={20} />
            <p>2.500.000</p>
          {/* {salary ? salary : 'A convenir'} */}
          </li>
          <li className="flex gap-2 items-center">
          <Clock size={20} />
          <p>A tiempo completo</p>
          </li>
        </ul>
        <section className="mt-6">
          <Link href='/empleo/1' className="px-5 py-2 text-white rounded-lg bg-zinc-900 hover:bg-zinc-900/90" >Ver detalle</Link>
        </section>
      </article>
    </Card>
  );
};

export default JobCard;
