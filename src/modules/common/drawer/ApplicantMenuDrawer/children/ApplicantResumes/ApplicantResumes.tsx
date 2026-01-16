import { Link } from "wouter";
import { useState } from "react";
import classNames from "classnames";
import { ArrowUp2, DocumentText } from "iconsax-react";
import { Button } from "@app/components/ui/button";
import { Skeleton } from "@app/components/ui/skeleton";
import { CreateResume } from "@app/modules/common/drawer/ApplicantMenuDrawer/children/CreateResume";
import { ExternalLink } from "lucide-react";
import { useGetResumes } from "@app/hooks/useGetResumes.hook";
import { Typography } from "@app/components/ui/typography";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@app/components/ui/collapsible";

type Props = {
  onClickResume: (id: number) => void;
};

const ApplicantResumes: React.FC<Props> = ({ onClickResume }) => {
  const { data, isLoading } = useGetResumes();
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const toggle = () => setOpen((oldState) => !oldState);
  const toggleExpanded = () => setExpanded((oldState) => !oldState);

  if (isLoading || !data)
    return (
      <div className="flex flex-col gap-2">
        <Skeleton className="w-1/1 h-20" />
        <Skeleton className="w-1/1 h-20" />
        <Skeleton className="w-1/1 h-20" />
      </div>
    );

  if (data.length === 0)
    return (
      <article className="flex flex-col gap-5">
        <h3 className="font-normal text-lg">
          Aun no tienes una hoja de vida creada
        </h3>
        <Button onClick={toggle}>
          <DocumentText /> Crea una nueva
        </Button>
        <CreateResume open={open} onOpenChange={toggle} />
      </article>
    );

  return (
    <article>
      <Collapsible open={expanded} onOpenChange={setExpanded}>
        <CollapsibleTrigger asChild>
          <button className="flex items-center w-full gap-2 mb-4 py-2 px-1 transition-colors hover:bg-gray-100">
            <DocumentText size="18" />
            <Typography.H5 className="flex-1 text-start">
              Hojas de vidas
            </Typography.H5>
            <ArrowUp2
              size="16"
              className={classNames("transition-transform", {
                "rotate-180": expanded,
              })}
            />
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent className="">
          <div className="flex flex-col gap-4">
            {data.map((cv) => (
              <section
                className=" p-2 w-80 border-black border-b-2"
                key={cv.id}
              >
                <header className=" mb-1 pb-2 flex">
                  <h4 className="flex-1 font-semibold">{cv.title}</h4>
                  <Link
                    onClick={() => onClickResume(cv.id)}
                    to={`/aspirante/${cv.id}`}
                    aria-label={`ir a la hoja de vida ${cv.title}`}
                  >
                    <ExternalLink />
                  </Link>
                </header>
                <p className="line-clamp-3">{cv.aboutMe}</p>
              </section>
            ))}
          </div>
          {data.length < 5 ? (
            <footer className="py-4">
              <CreateResume open={open} onOpenChange={toggle} />
              <Button onClick={toggle}>
                <DocumentText /> Crea una nueva hoja de vida
              </Button>
            </footer>
          ) : null}
        </CollapsibleContent>
      </Collapsible>
    </article>
  );
};

export default ApplicantResumes;
