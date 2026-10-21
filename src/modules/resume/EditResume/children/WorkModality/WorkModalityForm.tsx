import { Briefcase } from "lucide-react";
import { useContext, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { ResumeContext } from "@app/context/resume.context";
import resumeRepository from "@app/repositories/resume.repository";
import useMutate from "@app/hooks/useMutation.hook";
import { Button } from "@app/components/ui/button";
import { Label } from "@app/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@app/components/ui/select";
import { toast } from "@app/hooks/use-toast";
import { VacantJobType } from "@app/enums/vacant.enum";

const OPTIONS = Object.values(VacantJobType);

/** El select no admite string vacio, usamos un sentinel para "sin definir". */
const NONE = 'none';

type FormData = {
  workModality: VacantJobType | typeof NONE;
}

const WorkModalityForm: React.FC = () => {
  const { resume, resume_id } = useContext(ResumeContext)

  const { control, handleSubmit, setValue } = useForm<FormData>({
    defaultValues: {
      workModality: resume?.workModality ?? NONE,
    }
  })

  const { mutate, isLoading } = useMutate((data: FormData) => {
    return resumeRepository.updateWorkModality({
      id: resume_id,
      workModality: data.workModality === NONE ? '' : data.workModality,
    })
  })

  useEffect(() => {
    if (!resume) return;
    setValue('workModality', resume.workModality ?? NONE)
  }, [resume?.workModality])

  const send = async (data: FormData) => {
    const [, error] = await mutate(data)
    if (error) return;
    toast({ title: 'Actualizado' })
  }

  return (
    <form onSubmit={handleSubmit(send)} className="flex gap-2 items-end mb-4">
      <Controller
        name="workModality"
        control={control}
        render={({ field }) => (
          <div className="w-full">
            <Label className="flex items-center gap-2 mb-2">
              <Briefcase className="w-4 h-4" />
              Modalidad de trabajo
            </Label>
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona una modalidad" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={NONE}>Sin definir</SelectItem>
                {OPTIONS.map(option => (
                  <SelectItem key={option} value={option}>{option}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      />
      <Button disabled={isLoading} type="submit">Guardar</Button>
    </form>
  )
}

export default WorkModalityForm;