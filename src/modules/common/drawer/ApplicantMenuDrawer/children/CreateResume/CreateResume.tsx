import { Button } from "@app/components/ui/button";
import { Dialog, DialogContent } from "@app/components/ui/dialog";
import useMutate from "@app/hooks/useMutation.hook";
import { Form } from "@app/modules/common/form";
import resumeRepository from "@app/repositories/resume.repository";
import { stubUndefined } from "@app/util/stub";
import { DocumentText } from "iconsax-react";
import { Controller, useForm } from "react-hook-form";
import { useLocation } from "wouter";
import { Label } from "@app/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@app/components/ui/select";
import { VacantJobType } from "@app/enums/vacant.enum";

type Props = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

/** Sentinel para "sin definir"; el Select no admite string vacio. */
const NONE = 'none';

type FormData = {
  title: string;
  workModality?: VacantJobType | typeof NONE;
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
      workModality: undefined,
    },
  });

  const send = async (data: FormData) => {
    // El sentinel `NONE` es solo para el Select; la API recibe undefined
    // (que el backend guarda como NULL).
    const [resp, error] = await mutate({
      ...data,
      workModality: data.workModality === NONE ? undefined : data.workModality,
    });
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
            <Controller
              name="workModality"
              control={control}
              render={({ field }) => (
                <div className="mt-4">
                  <Label className="mb-2">Modalidad de trabajo</Label>
                  <Select value={field.value ?? NONE} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona una modalidad" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={NONE}>Sin definir</SelectItem>
                      {Object.values(VacantJobType).map(option => (
                        <SelectItem key={option} value={option}>{option}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <span className="text-gray-500 text-xs">Podras cambiarla mas adelante.</span>
                </div>
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
