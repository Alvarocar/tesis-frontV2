import DOMPurify from "dompurify";
import { useEffect, useMemo, useState } from "react";
import { Buildings } from "iconsax-react";
import { Link, useLocation } from "wouter";
import { ArrowLeft, Clock, DollarSign, Send } from "lucide-react";
import { Dialog, DialogContent } from "@app/components/ui/dialog";
import useMutate from "@app/hooks/useMutation.hook";
import { Button } from "@app/components/ui/button";
import { useAuth } from "@app/hooks/useAuth.hook";
import { TResume } from "@app/@types/resume";
import { TJob } from "@app/@types/jobs";
import CvList from "../CvList/CvList";
import applicationRepository from "@app/repositories/application.repository";
import useSWR from "swr";
import jobRepository from "@app/repositories/job.repository";
import { ApplyingStatus } from "../ApplyingStatus";
import { toast } from "@app/util/toast";
import { withViewTransition } from "@app/util/viewTransition";
import { rememberLastViewedJob } from "@app/util/viewTransition/jobTransition";

type Props = {
  job: TJob;
  onApplyed?: VoidFunction;
};

const currencyFormat = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
});

const JobDetail: React.FC<Props> = ({ job, onApplyed }) => {
  const [, setLocation] = useLocation();
  const { isAuth, userType } = useAuth();
  const [open, setOpen] = useState(false);
  const { mutate, isLoading } = useMutate(
    applicationRepository.apply.bind(applicationRepository)
  );
  const { data: isApplied = false, isLoading: isLoadingAppliedFetch, mutate: mutateIsApplied } = useSWR(
    userType === "applicant" ? { jobId: job.id } : undefined,
    jobRepository.isApplied.bind(jobRepository)
  );

  // Hand the current job id off to the list view so the matching card can
  // re-apply the view-transition-name on the way back.
  useEffect(() => {
    rememberLastViewedJob(job.id);
  }, [job.id]);

  const goBackToList = () => {
    withViewTransition(() => setLocation("/"));
  };

  const handlePreApply = () => {
    if (!isAuth) return setLocation("/sign-in");

    if (userType === "employee" || userType === "admin")
      return withViewTransition(() => setLocation(`/procesos/${job.id}`))

    setOpen(true);
  };

  const handleApply = async (resume: TResume.Overview) => {
    try {
      await mutate(job.id, resume.id);
      mutateIsApplied(true);
      setOpen(false);
      toast.successful("Aplicación exitosa");
      onApplyed?.();
    } catch (e) {
      console.error("Error:", e);
    }
  };

  const description = useMemo(
    () => DOMPurify.sanitize(job.description),
    [job.description]
  );
  return (
    <div style={{ maxWidth: "45rem" }} className="mx-auto ">
      <header>
        <button
          type="button"
          onClick={goBackToList}
          className="flex items-center gap-2 py-4 text-muted align-middle transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded"
        >
          <ArrowLeft size={20} aria-hidden="true" /> Volver a empleos
        </button>
      </header>
      <main
        style={{ viewTransitionName: `job-card-${job.id}` }}
        className="border-2 rounded-lg p-6"
      >
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
            {isApplied ? (
              <span>Ya aplicaste</span>
            ) : (
              <Button disabled={isLoading || isLoadingAppliedFetch} onClick={() => handlePreApply()}>
                <Send /> {userType === 'employee' || userType === 'admin' ? 'Ver Postulaciones' : 'Aplicar'}
              </Button>
            )}
          </div>
        </section>
        <section className="mt-4 border p-4 rounded-lg" about="salario">
          <p className="flex gap-2 text-gray-400">
            <DollarSign size={20} /> Salario
          </p>
          <p className="font-medium">
            {job.salaryOffer
              ? currencyFormat.format(job.salaryOffer)
              : "A Convenir"}
          </p>
        </section>
        <section
          className="my-4 border p-4 rounded-lg"
          about="tipo de contrato"
        >
          <p className="flex gap-2 text-gray-400">
            <Clock /> Tipo
          </p>
          <p className="font-medium">{job.jobType}</p>
        </section>
        <article
          className="border-t-2 py-2 unset-tailwind"
          dangerouslySetInnerHTML={{ __html: description }}
        />
        <footer className="p-4 border-t-2 flex flex-row-reverse">
          {isApplied ? (
            <span>Ya aplicaste</span>
          ) : (
            <Button disabled={isLoading || isLoadingAppliedFetch} onClick={() => handlePreApply()}>
              <Send /> {userType === 'employee' || userType === 'admin' ? 'Ver Postulaciones' : 'Aplicar'}
            </Button>
          )}
        </footer>
      </main>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          {isLoading ?
          <div className="min-h-32 flex items-center justify-center">
            <ApplyingStatus />
          </div> 
          :
          <CvList onSelect={handleApply} />
          }
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default JobDetail;
