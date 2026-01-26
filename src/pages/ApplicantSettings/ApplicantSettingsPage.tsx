import React from 'react';
import { useToast } from '@app/hooks/use-toast';
import PersonalInfoForm from '@app/modules/resume/EditResume/children/PersonalInfoForm/PersonalInfoForm';
import * as Dialog from '@radix-ui/react-dialog';
import { Button } from '@app/components/ui/button';
import { cn } from '@app/lib/utils';
import { Header } from '@app/modules/common/header';
import { Typography } from '@app/components/ui/typography';
import applicantRepository from '@app/repositories/applicant.repository';
import { useLocation } from 'wouter';
import { ROUTES_PATHS } from '@app/constants/routes.constant';
import { useAuth } from '@app/hooks/useAuth.hook';

export const ApplicantSettingsPage: React.FC = () => {
  const { toast } = useToast();
  const [, navigate] = useLocation();
  const { removeAuthToken } = useAuth();

  const handlePasswordChange = async () => {
    try {
      await applicantRepository.resetPassword();

      toast({ title: "Correo enviado", description: "Se ha enviado un correo para cambiar tu contraseña." });

    } catch (error: unknown) {
      toast({ title: "Error", description: (error as Error)?.message ?? "Ocurrió un error inesperado. Intenta nuevamente más tarde." });
    }
  };

  const handleAccountDeletion = async () => {
    try {
      await applicantRepository.deleteAccount()

      toast({
        title: "Cuenta eliminada",
        description: "Tu cuenta ha sido eliminada exitosamente."
      });
      navigate(ROUTES_PATHS.HOME);
      removeAuthToken();
    } catch (error) {
      toast({ title: "Error", description: "Ocurrió un error inesperado al intentar eliminar la cuenta." });
    }
  };

  return (
    <>
    <Header />
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Configuración de Cuenta</h1>

      {/* Formulario de datos personales */}
      <div className="mb-8">
        <PersonalInfoForm />
      </div>

      {/* Botón para cambiar contraseña */}
      <Typography.H3>Cambio de contraseña</Typography.H3>
      <Typography.Small className="mb-4">
        Puedes cambiar tu contraseña haciendo clic en el botón a continuación. Se te enviará un correo con las instrucciones para restablecer tu contraseña.
      </Typography.Small>
      <div className="mt-10 mb-4 flex justify-center items-center">
        <Button variant="default" onClick={handlePasswordChange}>Cambiar Contraseña</Button>
      </div>

      {/* Botón para eliminar cuenta y su modal */}
      <Typography.H3 className='text-red-500'>Eliminar cuenta</Typography.H3>
      <Typography.Small className="mb-4">
        Si deseas eliminar tu cuenta, puedes hacerlo haciendo clic en el botón a continuación. Ten en cuenta que esta acción es irreversible y perderás todos tus datos.
      </Typography.Small>
      <div>
        <Dialog.Root>
          <div className='flex justify-center items-center'>
            <Dialog.Trigger asChild>
              <Button className='mt-10' variant="destructive">Eliminar Cuenta</Button>
            </Dialog.Trigger>
          </div>
          <Dialog.Portal>
            <Dialog.Overlay className="bg-black bg-opacity-50 fixed inset-0 z-50" />
            <Dialog.Content
              className={cn(
                "fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg",
                "w-11/12 max-w-lg"
              )}
            >
              <Dialog.Title className="text-xl font-semibold mb-4">¿Estás seguro de eliminar tu cuenta?</Dialog.Title>
              <Dialog.Description className="mb-4">
                Esta acción no se puede deshacer. Si eliminas tu cuenta, perderás todos tus datos.
              </Dialog.Description>
              <div className="flex justify-end space-x-4">
                <Dialog.Close asChild>
                  <Button variant="default">Cancelar</Button>
                </Dialog.Close>
                <Button variant="destructive" onClick={handleAccountDeletion}>Confirmar</Button>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </div>
    </>
  );
};
