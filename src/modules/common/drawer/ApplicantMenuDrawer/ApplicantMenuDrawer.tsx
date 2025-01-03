import { HambergerMenu } from "iconsax-react";
import { Drawer, DrawerContent, DrawerDescription, DrawerTitle, DrawerTrigger } from "@app/components/ui/drawer";
import { ApplicantResumes } from "./children/ApplicantResumes";
import { ApplicantHeader } from "./children/ApplicantHeader";
import { ICandidate } from "@app/@types/applicant";

type Props = {
  applicant?: ICandidate 
}

const ApplicantMenuDrawer: React.FC<Props> = () => {

  return (
    <Drawer direction="left"  >
      <DrawerTrigger asChild>
        <button
          type="button"
          aria-label="menu-de-opciones"
          className="pr-2"        
        ><HambergerMenu /></button>
      </DrawerTrigger>
      <DrawerContent className="w-fit" >
        <DrawerTitle className="hidden">Menu de opciones del Candidato</DrawerTitle>
        <DrawerDescription className="hidden">Opciones del Candidato para crear hojas de vida</DrawerDescription>
        <aside className="h-screen w-2 p-4 w-fit">
          <ApplicantHeader />
          <hr className="my-4" />
          <article>
            <ApplicantResumes />
          </article>
        </aside>
      </DrawerContent>
    </Drawer>
  )
}

export default ApplicantMenuDrawer;
