import useSWR from "swr";
import { Archive, ElementPlus, HambergerMenu, Home, Profile2User, Setting2 } from "iconsax-react";
import recruiterRepository from "@app/repositories/recruiter.repository";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from "@app/components/ui/drawer";
import { OptionDrawerLink } from "../OptionDrawerLink";
import { useAuth } from "@app/hooks/useAuth.hook";
import { Typography } from "@app/components/ui/typography";

const RecruiterMenuDrawer = () => {
  const { data } = useSWR(
    "/recruiter",
    recruiterRepository.getInfo.bind(recruiterRepository),
  );

  const { userType } = useAuth();

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
          <h2 className="w-80 text-lg font-medium">
            Hola! {data?.firstName} {data?.lastName ?? ""}
          </h2>
          <span className="text-sm text-gray-500">
            Estas son la opciones que tienes disponible
          </span>
          <hr />
          <nav>
            <ul className="flex flex-col">
              <li>
                <OptionDrawerLink to="/" aria-label="pagína principal">
                  <Home size="18" />
                  <Typography.H5 className="flex-1 text-start">
                    Página principal
                  </Typography.H5>
                </OptionDrawerLink>
              </li>
              {userType === "admin" && (
                <li>
                  <OptionDrawerLink
                    to="/empleados"
                    aria-label="gestión de empleados"
                  >
                    <Profile2User size="18" />
                    <Typography.H5 className="flex-1 text-start">
                      Gestión de empleados
                    </Typography.H5>
                  </OptionDrawerLink>
                </li>
              )}
              <li>
                <OptionDrawerLink to="/vacantes" aria-label="mis vacantes">
                  <Archive size="18"/>
                  <Typography.H5 className="flex-1 text-start">
                    Mis Vacantes
                  </Typography.H5>
                </OptionDrawerLink>
              </li>
              <li>
                <OptionDrawerLink
                  to="/vacante/crear"
                  aria-label="crear vacante"
                >
                  <ElementPlus size="18"/>
                  <Typography.H5 className="flex-1 text-start">
                    Crear nueva Vacante
                  </Typography.H5>
                </OptionDrawerLink>
              </li>
{/*               <li>
                <OptionDrawerLink
                  to="/configuracion"
                  aria-label="configuración"
                >
                  <Setting2 size="18" />
                  <Typography.H5 className="flex-1 text-start">
                    Configuración
                  </Typography.H5>
                </OptionDrawerLink>
              </li> */}
            </ul>
          </nav>
        </aside>
      </DrawerContent>
    </Drawer>
  );
};

export default RecruiterMenuDrawer;
