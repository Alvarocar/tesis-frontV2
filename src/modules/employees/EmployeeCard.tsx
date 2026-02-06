import React, { useState } from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "@app/components/ui/button";
import { RecruiterOverview } from "@app/@types/recruiter";
import { Dialog, DialogContent, DialogTrigger } from "@app/components/ui/dialog";
import recruiterRepository from "@app/repositories/recruiter.repository";
import useMutate from "@app/hooks/useMutation.hook";
import { Typography } from "@app/components/ui/typography";
import { toast } from "@app/util/toast";

interface EmployeeCardProps {
  employee: RecruiterOverview;
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({ employee }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { mutate, isLoading } = useMutate(recruiterRepository.sendInvitationEmail.bind(recruiterRepository));

  const handleGeneratePassword = async () => {
    try {
      const [_, error] = await mutate(employee.email);
      if (error) {
        toast.failed('Error', 'No se pudo enviar el correo. Inténtalo de nuevo más tarde.');
      } else {
        toast.successful('Correo enviado', `Se ha enviado un correo a ${employee.email} con las instrucciones para ${employee.hasAccount ? 'reestablecer su contraseña' : 'crear una contraseña y acceder al sistema'}.`);
      }
    }  finally {
      setIsDialogOpen(false);
    }
  };

  return (
    <div className="border p-4 rounded-lg shadow-md max-h-fit">
      <h2 className="text-lg font-semibold">`${employee.firstName} ${employee.lastName}`</h2>
      <p>{employee.email}</p>
      {!employee.hasAccount && (
        <div className="mt-2 flex items-center gap-2">
          <AlertTriangle size={20} className="text-yellow-500" aria-label="El usuario no tiene cuenta." />
          <span className="hidden sm:block text-yellow-500">El usuario no tiene cuenta.</span>
        </div>
      )}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <Typography.Small>Aqui puedes enviar un correo para reestablecer o recuperar la contraseña de este usuario</Typography.Small>
        <DialogTrigger asChild>
          <Button className="mt-4">
            Enviar correo
          </Button>
        </DialogTrigger>
        <DialogContent>
          <p>{employee.hasAccount ? `¿Está seguro de que desea generar una nueva contraseña para ${employee.firstName} ${employee.lastName}?` : `¿Está seguro de que desea reenviar el correo de invitación a ${employee.email}?`}</p>
          <div className="mt-4 flex justify-end">
            <Button variant="secondary" className="mr-2" onClick={() => setIsDialogOpen(false)} disabled={isLoading}>Cancelar</Button>
            <Button onClick={() => {
              handleGeneratePassword();
            }} disabled={isLoading}>Confirmar</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EmployeeCard;