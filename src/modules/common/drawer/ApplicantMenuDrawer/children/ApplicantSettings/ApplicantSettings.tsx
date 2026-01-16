import { Typography } from "@app/components/ui/typography";
import { Setting2 } from "iconsax-react";
import { Link } from "wouter";

export const ApplicantSettings = () => {
  return (
    <Link 
      className="flex gap-1 items-center w-full py-2 px-1 mt-4 transition-colors hover:bg-gray-100"
    to="/aspirante/configuracion"
      aria-label="ir a configuración">
      <Setting2 size="18" />
      <Typography.H5 className="flex-1 text-start">Configuración</Typography.H5>
    </Link>
  );
};
