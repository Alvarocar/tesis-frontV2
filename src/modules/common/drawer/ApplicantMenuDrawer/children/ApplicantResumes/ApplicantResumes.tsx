import useSWR from "swr";
import { useState } from "react";
import { DocumentText } from "iconsax-react";
import { useAuth } from "@app/hooks/useAuth.hook";
import { Button } from "@app/components/ui/button";
import { Skeleton } from "@app/components/ui/skeleton";
import resumeRepository from "@app/repositories/resume.repository";
import { CreateResume } from "@app/modules/common/drawer/ApplicantMenuDrawer/children/CreateResume";

const ApplicantResumes = () => {
  const { token } = useAuth()
  const { data, isLoading } = useSWR(`/my-resumes/${token}`, resumeRepository.getMyResumes.bind(resumeRepository));
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen(oldState => !oldState);

  if (isLoading || !data)
    return (
      <div className="flex flex-col gap-2">
        <Skeleton className="w-1/1 h-20" />
        <Skeleton className="w-1/1 h-20" />
        <Skeleton className="w-1/1 h-20" />
      </div>
    )

    if (data.length > 0)
      return (
        <article className="flex flex-col gap-5">
          <h3 className="font-normal">Aun no tienes una hoja de vida creada</h3>
          <Button onClick={toggle} ><DocumentText /> Crea una nueva</Button>
          <CreateResume open={open} onOpenChange={toggle} />
        </article>
      )

  return (
    <article>
      <h3>Hojas de vida</h3>
    </article>
  );
}

export default ApplicantResumes;
