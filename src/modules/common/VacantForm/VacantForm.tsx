import DOMPurify from "dompurify";
import { Controller, useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@app/components/ui/select";
import { Button } from "@app/components/ui/button";
import { Label } from "@app/components/ui/label";
import { TVacant } from "@app/@types/vacant";
import { Form } from "../form";

const { InputField, RichText } = Form;

type FormData = TVacant;

type Props = {
  vacant?: TVacant;
  onSubmit?: (data: FormData) => Promise<[unknown, Error | undefined]>;
};

const moneyFormat = Intl.NumberFormat('es-CO')

const VacantForm: React.FC<Props> = ({ vacant, onSubmit }) => {
  const { handleSubmit, register, control, formState } = useForm<FormData>({
    defaultValues: {
      title: vacant?.title,
      description: vacant?.description,
      jobType: vacant?.jobType,
      salary: vacant?.salary,
    },
  });

  const send = (data: FormData) => {
    onSubmit?.(data);
  };

  return (
    <form onSubmit={handleSubmit(send)}>
      <fieldset className="flex flex-col gap-4">
        <InputField
          label="Nombre del Cargo"
          error={formState.errors.title}
          {...register("title", { required: "Campo Requerido" })}
        />
        <Controller
          name="jobType"
          control={control}
          rules={{
            required: "Campo Requerido",
          }}
          render={({ field }) => (
            <div>
              <Label>Selecciona el tipo de contrato</Label>
              <Select
                name="jobType"
                value={field.value}
                onValueChange={field.onChange}
              >
                <SelectTrigger>
                  <SelectValue
                    onBlur={field.onBlur}
                    ref={field.ref}
                    placeholder="Seleccionar Tipo de contrato"
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Remoto">
                    Remoto
                  </SelectItem>
                  <SelectItem value="Hibrido">Híbrido</SelectItem>
                  <SelectItem value="Presencial">Presencial</SelectItem>
                </SelectContent>
              </Select>
              {formState.errors.jobType && (
                <p className="text-red-400">
                  {formState.errors.jobType.message}
                </p>
              )}
            </div>
          )}
        />
        <Controller
          name="salary"
          control={control}
          rules={{ 
            required: true,
          }}
          render={({ field }) => (
            <InputField
              label="Salario"
              {...field}
              value={field.value ? moneyFormat.format(field.value) : ''}
              onChange={({ target }) => {
                field.onChange(Number(target.value.replace(/\D/g, '')))
              }}
              error={formState.errors.salary}
            />
          )}
        />
        <Controller
          name="description"
          control={control}
          rules={{
            validate: {
              isRequired: (value) => {
                return DOMPurify.sanitize(value, { ALLOWED_TAGS: [] }).trim()
                  .length === 0
                  ? "Campo requerido"
                  : undefined;
              },
            },
          }}
          render={({ field, fieldState: { error } }) => (
            <div ref={field.ref}>
              <RichText value={field.value} onChange={field.onChange} />
              {error && <p className="text-red-400">{error.message}</p>}
            </div>
          )}
        />
      </fieldset>
      <footer className="flex justify-center py-4">
        <Button>Guardar </Button>
      </footer>
    </form>
  );
};

export default VacantForm;
