import useSWR from "swr";
import { HambergerMenu } from "iconsax-react";
import recruiterRepository from "@app/repositories/recruiter.repository";
import { Drawer, DrawerContent, DrawerDescription, DrawerTitle, DrawerTrigger } from "@app/components/ui/drawer";
import { Link } from "../../router/Link";

const RecruiterMenuDrawer = () => {

  const { data } = useSWR('/recruiter', recruiterRepository.getInfo.bind(recruiterRepository));
  
  return (
    <Drawer direction="left"  >
    <DrawerTrigger asChild>
      <button
        type="button"
        aria-label="menu-de-opciones"
        className="pr-2"        
      ><HambergerMenu /></button>
    </DrawerTrigger>
    <DrawerContent className="w-min-fit w-[20rem]" >
      <DrawerTitle className="hidden">Menu de opciones del Candidato</DrawerTitle>
      <DrawerDescription className="hidden">Opciones del Candidato para crear hojas de vida</DrawerDescription>
      <aside className="h-screen w-2 p-4 w-full">
        Bienvenido {data?.name}
        <hr className="my-4" />
        <nav>
          <ul className="flex flex-col gap-4">
            <li>
              <Link to="/vacantes" className="block border-2 py-2 px-4 hover:bg-stone-100">
                Mis Vacantes
              </Link>
            </li>
            <li>
              <Link to="/vacante/crear" className="block border-2 py-2 px-4 hover:bg-stone-100">
                Crear nueva Vacante
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
    </DrawerContent>
  </Drawer>
  );
};

export default RecruiterMenuDrawer;
