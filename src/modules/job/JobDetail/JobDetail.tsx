import { Link, useLocation } from "wouter";
import { useMemo } from "react";
import DOMPurify from "dompurify";
import { TJob } from "@app/@types/jobs";
import { Buildings } from "iconsax-react";
import { useAuth } from "@app/hooks/useAuth.hook";
import { Button } from "@app/components/ui/button";
import { ArrowLeft, Clock, DollarSign, Send } from "lucide-react";
import { useToast } from "@app/hooks/use-toast";

type Props = {
  job: TJob;
};

const currencyFormat = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' });

const JobDetail: React.FC<Props> = ({ job }) => {
  const [, setLocation] = useLocation()
  const { isAuth, userType } = useAuth()
  const { toast } = useToast()

  const handleApply = () => {

    if (!isAuth) return setLocation('/sign-in');

    if (userType === 'recruiter') return toast({
      description: 'Esta acción no es posible realizarla desde su cuenta',
      variant: 'destructive',
      duration: 2000,
    })


  }

  const description = useMemo(() => DOMPurify.sanitize(job.description), [job.description]);
  return (
    <div style={{ maxWidth: "45rem" }} className="mx-auto ">
      <header>
        <Link className="flex gap-2 py-4 text-gray-400 align-middle" to='/'><ArrowLeft size={20} /> Volver a empleos</Link>
      </header>
      <main className="border-2 rounded-lg p-6">
        <section className="flex">
          <div className="flex-1">
            <h1 className="text-2xl font-medium">{job.title}</h1>
            <div className="py-2">
              <span className="flex gap-2 text-gray-500">
              <Buildings size={20} />
              <p>{job.company}</p>
              </span>
            </div>
          </div>
          <div className="px-4 py-1">
            <Button onClick={() => handleApply()}><Send /> Aplicar</Button>
          </div>
        </section>
        <section className="mt-4 border p-4 rounded-lg" about="salario">
          <p className="flex gap-2 text-gray-400" ><DollarSign size={20} /> Salario</p>
          <p className="font-medium">{job.salaryOffer ? currencyFormat.format(job.salaryOffer) : 'A Convenir'}</p>
        </section>
        <section className="my-4 border p-4 rounded-lg" about="tipo de contrato">
          <p className="flex gap-2 text-gray-400" ><Clock /> Tipo</p>
          <p className="font-medium" >{job.jobType}</p>
        </section>
        <article className="border-t-2 py-2 unset-tailwind" dangerouslySetInnerHTML={{ __html: description }} />
        <footer className="p-4 border-t-2 flex flex-row-reverse">
          <Button onClick={() => handleApply()}><Send /> Aplicar ahora</Button>
        </footer>
      </main>
    </div>
  )
}

export default JobDetail;
