import { User } from "iconsax-react";
import { Button } from "@app/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@app/components/ui/dropdown-menu";
import { useAuth } from "@app/hooks/useAuth.hook";

const AccountOptionsDropDown = () => {

  const { removeAuthToken } = useAuth()

  return (
    <DropdownMenu dir="ltr" >
      <DropdownMenuTrigger asChild>
        <Button aria-label="opciones de usuario"><User /></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end"  className="w-40">
        <DropdownMenuLabel>Opciones</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
        <DropdownMenuItem onClick={() => removeAuthToken()} >
            Cerrar sesión
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AccountOptionsDropDown;
