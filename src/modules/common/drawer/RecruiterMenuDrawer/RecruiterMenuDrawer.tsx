import useSWR from "swr";
import { HambergerMenu } from "iconsax-react";
import recruiterRepository from "@app/repositories/recruiter.repository";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from "@app/components/ui/drawer";
import { OptionDrawerLink } from "../OptionDrawerLink";
import { Typography } from "@app/components/ui/typography";

const RecruiterMenuDrawer = () => {
  const { data } = useSWR(
    "/recruiter",
    recruiterRepository.getInfo.bind(recruiterRepository),
  );

  return (
    <Drawer direction="left">
      <DrawerTrigger asChild>
        <button
          type="button"
          aria-label="menu-de-opciones"
          className="pr-2 w-fit"
        >
          <HambergerMenu />
        </button>
      </DrawerTrigger>
      <DrawerContent className="w-min-fit w-[20rem]">
        <DrawerTitle className="hidden">
          Menu de opciones del Candidato
        </DrawerTitle>
        <DrawerDescription className="hidden">
          Opciones del Candidato para crear hojas de vida
        </DrawerDescription>
        <aside className="h-screen p-4 w-full">
          <h2 className="w-80 text-lg font-medium">Hola! {data?.firstName} {data?.lastName ?? ""}</h2>
          <span className="text-sm text-gray-500">Estas son la opciones que tienes disponible</span>
          <hr/>
          <nav>
            <ul className="flex flex-col">
              <li>
                <OptionDrawerLink to="/" aria-label="pagína principal">
                  <>Pagina principal</>
                </OptionDrawerLink>
              </li>
              <li>
                <OptionDrawerLink to="/vacantes" aria-label="mis vacantes">
                  <>Mis Vacantes</>
                </OptionDrawerLink>
              </li>
              <li>
                <OptionDrawerLink
                  to="/vacante/crear"
                  aria-label="crear vacante"
                >
                  <>Crear nueva Vacante</>
                </OptionDrawerLink>
              </li>
            </ul>
          </nav>
        </aside>
      </DrawerContent>
    </Drawer>
  );
};

export default RecruiterMenuDrawer;
