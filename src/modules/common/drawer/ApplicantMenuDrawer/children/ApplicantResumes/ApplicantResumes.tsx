import { Link } from "wouter";
import { useState } from "react";
import { DocumentText } from "iconsax-react";
import { Button } from "@app/components/ui/button";
import { Skeleton } from "@app/components/ui/skeleton";
import { CreateResume } from "@app/modules/common/drawer/ApplicantMenuDrawer/children/CreateResume";
import { ExternalLink } from "lucide-react";
import { useGetResumes } from "@app/hooks/useGetResumes.hook";

const ApplicantResumes = () => {
  
  const { data, isLoading } = useGetResumes()
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

    if (data.length === 0)
      return (
        <article className="flex flex-col gap-5">
          <h3 className="font-normal text-lg">Aun no tienes una hoja de vida creada</h3>
          <Button onClick={toggle} ><DocumentText /> Crea una nueva</Button>
          <CreateResume open={open} onOpenChange={toggle} />
        </article>
      )

  return (
    <article>
      <h3 className="font-normal text-lg mb-4">Hojas de vidas</h3>
      <div className="flex flex-col gap-4">
        {data.map(cv => (
          <section className=" p-2 w-80 border rounded-md border-black" key={cv.id}>
            <header className="border-b-2 border-black mb-1 pb-2 flex" >
              <h4 className="flex-1" >{cv.title}</h4>
              <Link to={`/aspirante/${cv.id}`} aria-label={`ir a la hoja de vida ${cv.title}`}>
                <ExternalLink />
              </Link>
            </header>
            <p className="line-clamp-3">{cv.aboutMe}</p>
          </section>
        ))}
      </div>
      {data.length < 5 ? 
        <footer className="py-4">
          <CreateResume open={open} onOpenChange={toggle} />
          <Button onClick={toggle} ><DocumentText /> Crea una nueva hoja de vida</Button>
        </footer>
        : null
      }
    </article>
  );
}

export default ApplicantResumes;
