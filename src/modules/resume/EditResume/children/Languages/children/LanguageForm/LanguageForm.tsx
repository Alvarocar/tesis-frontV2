import useSWR from "swr";
import { useMemo } from "react";
import { useParams } from "wouter";
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { TResume } from "@app/@types/resume";
import { Button } from "@app/components/ui/button";
import { Label } from "@app/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@app/components/ui/select";
import { Skeleton } from "@app/components/ui/skeleton";
import { Slider } from "@app/components/ui/slider";
import { LanguageNameFactory } from "@app/constants/resume.constant";
import useMutate from "@app/hooks/useMutation.hook";
import languagesRepository from "@app/repositories/languages.repository";
import resumeRepository from "@app/repositories/resume.repository";
import { stubUndefined } from "@app/util/stub";

type Props = {
  languages?: TResume.ILanguage[];
  onClose?: VoidFunction;
};

type FormData = {
  languages?: TResume.ILanguage[];
}

const LanguageForm: React.FC<Props> = ({ languages = [], onClose = stubUndefined }) => {
  const { data, isLoading } = useSWR(
    "/languages/all",
    languagesRepository.getAll.bind(languagesRepository)
  );
  const params = useParams<{ cvSlug : number }>();
  const { mutate, isLoading: isLoadingMutation } = useMutate(resumeRepository.patchLanguages.bind(resumeRepository))

  const { handleSubmit, setValue, getValues, watch } = useForm<FormData>({
    defaultValues: {
      languages,
    }
  })
  
  const localLanguages = watch('languages')
  
  const filteredLanguages = useMemo(() =>{
    if (!data) return []
    return data.filter(lng => {
      const index = localLanguages?.findIndex(myLng => lng.name.toLowerCase() === myLng.name.toLowerCase()); 
      return index === -1;
    })
  }, [data, localLanguages])

  const send = async (data: FormData) => {
    const [, error] = await mutate({ resumeId: params.cvSlug, languages: data.languages ?? [] })
    if (error) return;
    onClose();
  }


  return (
    <form onSubmit={handleSubmit(send)}>
      <legend className="text-lg font-medium">
        Agregar / Editar Lenguaje
      </legend>
      <section className="p-4 flex flex-col gap-2 items-center">
        <Label>Selecciona el lenguaje</Label>
        <Select value={''} onValueChange={(name) => {
          const current = getValues('languages') ?? [];
          setValue('languages', [...current, { name, level: 1 }])
        }}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Seleccionar Lenguaje" />
          </SelectTrigger>
          <SelectContent>
            {filteredLanguages?.map((lng) => (
              <SelectItem onClick={() => {
                
              }} key={lng.id} value={lng.name}>
                {lng.name}
              </SelectItem>
            ))}
            {isLoading ? <Skeleton className="h-8" /> : null}
            {filteredLanguages.length === 0 ? <span>No hay lenguajes disponibles</span> : null} 
          </SelectContent>
        </Select>
      </section>
      <ul>
        {localLanguages?.map((lng, index) => (
          <li className="flex gap-4 px-20 pb-2 border-b-2 border-zinc-400">
            <span className="flex-1 flex flex-col justify-center">{lng.name}</span>
            <div className="w-48 flex flex-col gap-2 justify-center">
              <span className="text-center">{LanguageNameFactory.get(lng.level)}</span>
              <Slider                
                max={4}
                min={1}
                value={[lng.level]}
                onValueChange={([value]) => {
                const mutable = localLanguages;
                mutable[index] = { ...mutable[index], level: value };
                setValue('languages', mutable);
              }}
              />
            </div>
            <button type="button" onClick={() => {
              setValue('languages', localLanguages.filter(curr => lng.name !== curr.name));
            }}>
              <Trash className="text-red-400" />
            </button>
          </li>
        ))}
      </ul>
      <footer className="px-2 pt-5 flex justify-center">
        <Button disabled={isLoadingMutation} type="submit">Guardar</Button>
      </footer>
    </form>
  );
};

export default LanguageForm;
