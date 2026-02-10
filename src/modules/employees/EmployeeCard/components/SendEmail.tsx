import React from "react";
import { Dialog, DialogContent, DialogTrigger } from "@app/components/ui/dialog";
import recruiterRepository from "@app/repositories/recruiter.repository";
import useMutate from "@app/hooks/useMutation.hook";
import { toast } from "@app/util/toast";
import { Button } from "@app/components/ui/button";
import { Typography } from "@app/components/ui/typography";

interface SendEmailProps {
  email: string;
  hasAccount: boolean;
  onChangeOpen?: (open: boolean) => void;
  open?: boolean;
  onSent?: () => void;
}

const SendEmail: React.FC<SendEmailProps> = ({ email, hasAccount, open = false, onChangeOpen, onSent }) => {
  const { mutate, isLoading } = useMutate(
    recruiterRepository.sendInvitationEmail.bind(recruiterRepository)
  );

  const handleSendEmail = async () => {
    try {
      const [_, error] = await mutate(email);
      if (error) {
        toast.failed("Error", "No se pudo enviar el correo. Inténtalo de nuevo más tarde.");
      } else {
        toast.successful(
          "Correo enviado",
          `Se ha enviado un correo a ${email} con las instrucciones para ${
            hasAccount
              ? "reestablecer su contraseña"
              : "crear una contraseña y acceder al sistema"
          }.`
        );
        onSent?.();
      }
    } finally {
      onChangeOpen && onChangeOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onChangeOpen}>
      <DialogContent>
        <Typography.H4>Se enviara un correo al usuario para {hasAccount ? "reestablecer su contraseña" : "crear una contraseña y acceder al sistema"}.</Typography.H4>
        <p>
          {hasAccount
            ? `¿Está seguro de que desea generar una nueva contraseña para el usuario ${email}?`
            : `¿Está seguro de que desea enviar un correo de invitación al usuario ${email}?`}
        </p>
        <div className="mt-4 flex justify-end">
          <Button
            variant="secondary"
            className="mr-2"
            onClick={() => onChangeOpen && onChangeOpen(false)}
            disabled={isLoading}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSendEmail}
            disabled={isLoading}
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            Confirmar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SendEmail;
