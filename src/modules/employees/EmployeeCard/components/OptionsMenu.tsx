import React from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@app/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";

interface OptionsMenuProps {
  onSendEmail: () => void;
  onDelete: () => void;
}

const OptionsMenu: React.FC<OptionsMenuProps> = ({ onSendEmail, onDelete }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="text-gray-600 hover:text-black focus:outline-none">
          <MoreVertical />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[150px] bg-white shadow-xl rounded">
        <DropdownMenuItem onClick={onSendEmail}>Generar contraseña</DropdownMenuItem>
        <DropdownMenuItem onClick={onDelete} className="text-red-600">
          Eliminar Empleado
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default OptionsMenu;
