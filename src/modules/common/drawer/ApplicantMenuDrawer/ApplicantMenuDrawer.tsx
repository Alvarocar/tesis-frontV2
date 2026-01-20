import { useState } from "react";
import { HambergerMenu, Home, Setting2 } from "iconsax-react";
import { ICandidate } from "@app/@types/applicant";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from "@app/components/ui/drawer";
import { ApplicantResumes } from "./children/ApplicantResumes";
import { ApplicantHeader } from "./children/ApplicantHeader";
import { OptionDrawerLink } from "../OptionDrawerLink";
import { Typography } from "@app/components/ui/typography";

type Props = {
  applicant?: ICandidate;
};

const ApplicantMenuDrawer: React.FC<Props> = () => {
  const [open, setOpen] = useState(false);
  return (
    <Drawer open={open} onOpenChange={setOpen} direction="left">
      <DrawerTrigger asChild>
        <button type="button" aria-label="menu-de-opciones" className="pr-2">
          <HambergerMenu />
        </button>
      </DrawerTrigger>
      <DrawerContent className="w-fit">
        <DrawerTitle className="hidden">
          Menu de opciones del Candidato
        </DrawerTitle>
        <DrawerDescription className="hidden">
          Opciones del Candidato para crear hojas de vida
        </DrawerDescription>
        <aside className="h-screen w-2 p-4 w-fit">
          <ApplicantHeader />
          <hr className="my-4" />
          <article>
            <OptionDrawerLink
              to="/"
              aria-label="ir a página principal"
            >
              <>
                <Home size="18" />
                <Typography.H5 className="flex-1 text-start">
                  Página principal
                </Typography.H5>
              </>
            </OptionDrawerLink>
            <ApplicantResumes onClickResume={() => setOpen(false)} />
            <OptionDrawerLink
              to="/aspirante/configuracion"
              aria-label="ir a configuración"
            >
              <>
              <Setting2 size="18" />
              <Typography.H5 className="flex-1 text-start">
                Configuración
              </Typography.H5>
              </>
            </OptionDrawerLink>
          </article>
        </aside>
      </DrawerContent>
    </Drawer>
  );
};

export default ApplicantMenuDrawer;
