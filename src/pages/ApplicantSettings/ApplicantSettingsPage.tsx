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
      <main
        id="main"
        tabIndex={-1}
        className="mx-auto w-full max-w-3xl px-4 py-8 focus:outline-none sm:px-6"
      >
        <h1 className="mb-6 text-2xl font-semibold text-foreground">Configuración de Cuenta</h1>

        <section className="mb-10 rounded-xl border border-border bg-surface p-6 shadow-sm">
          <PersonalInfoForm />
        </section>

        <section className="mb-10 rounded-xl border border-border bg-surface p-6 shadow-sm">
          <Typography.H3 as="h2" className="m-0">Cambio de contraseña</Typography.H3>
          <Typography.Small className="mb-0 mt-1">
            Puedes cambiar tu contraseña haciendo clic en el botón a continuación. Se te enviará un correo con las instrucciones para restablecer tu contraseña.
          </Typography.Small>
          <div className="mt-5 flex justify-center">
            <Button variant="default" onClick={handlePasswordChange}>Cambiar Contraseña</Button>
          </div>
        </section>

        <section className="rounded-xl border border-danger/30 bg-danger/5 p-6">
          <Typography.H3 as="h2" className="m-0 text-danger">Eliminar cuenta</Typography.H3>
          <Typography.Small className="mb-0 mt-1">
            Si deseas eliminar tu cuenta, puedes hacerlo haciendo clic en el botón a continuación. Ten en cuenta que esta acción es irreversible y perderás todos tus datos.
          </Typography.Small>
          <div className="mt-5 flex justify-center">
            <Dialog.Root>
              <Dialog.Trigger asChild>
                <Button variant="destructive">Eliminar Cuenta</Button>
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 z-50 bg-foreground/40" />
                <Dialog.Content
                  className={cn(
                    "fixed left-1/2 top-1/2 z-50 w-11/12 max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-lg bg-surface p-6 shadow-lg"
                  )}
                >
                  <Dialog.Title className="mb-4 text-xl font-semibold">¿Estás seguro de eliminar tu cuenta?</Dialog.Title>
                  <Dialog.Description className="mb-4 text-secondary">
                    Esta acción no se puede deshacer. Si eliminas tu cuenta, perderás todos tus datos.
                  </Dialog.Description>
                  <div className="flex justify-end gap-3">
                    <Dialog.Close asChild>
                      <Button variant="outline">Cancelar</Button>
                    </Dialog.Close>
                    <Button variant="destructive" onClick={handleAccountDeletion}>Confirmar</Button>
                  </div>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          </div>
        </section>
      </main>
    </>
  );
};
