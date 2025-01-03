import { Button } from "@app/components/ui/button";
import { Dialog, DialogContent } from "@app/components/ui/dialog";
import useMutate from "@app/hooks/useMutation.hook";
import { Form } from "@app/modules/common/form";
import resumeRepository from "@app/repositories/resume.repository";
import { stubUndefined } from "@app/util/stub";
import { DocumentText } from "iconsax-react";
import { Controller, useForm } from "react-hook-form";
import { useLocation } from "wouter";

type Props = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

type FormData = {
  title: string;
};

const { InputField } = Form;

const CreateResume: React.FC<Props> = ({
  open = false,
  onOpenChange = stubUndefined,
}) => {

  const { error, mutate, isLoading } = useMutate(resumeRepository.createResume.bind(resumeRepository))
  const [, setLocation] = useLocation()
  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      title: "",
    },
  });

  const send = async (data: FormData) => {
    const [resp, error] = await mutate(data);
    if (error) return;
    setLocation(`/aspirante/${resp?.id}`)    
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <form onSubmit={handleSubmit(send)}>
          <legend className="font-medium text-lg">Crear una hoja de vida</legend>
          <span className="text-gray-500 text-xs">Este nombre no se vera en la hoja de vida, solo es para diferenciarla del resto.</span>
          <fieldset className="p-4">
            <Controller
              name="title"
              control={control}
              rules={{
                required: "Campo requerido",
                max: {
                  value: 30,
                  message:
                    "El nombre de la hoja de vida no puede tener mas de 30 caracteres",
                },
                min: {
                  value: 5,
                  message:
                    "El nombre de la hoja de vida al menos debe tener 5 caracteres",
                },
              }}
              render={({ formState: { errors }, field }) => (
                <InputField
                  {...field}
                  label="Nombre de la hoja de vida"
                  error={errors.title}
                />
              )}
            />
          </fieldset>
          {error?.message && <p className="text-red-500">{error.message}</p>}
          <footer className="flex px-4 justify-center">
            <Button disabled={isLoading} ><DocumentText /> Crear</Button>
          </footer>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateResume;
