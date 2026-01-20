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
          <Typography.H4>
            Bienvenido {data?.firstName + " " + (data?.lastName ?? "")}
          </Typography.H4>
          <hr className="my-4" />
          <nav>
            <ul className="flex flex-col gap-4">
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
