import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { useResumeContext } from "@app/context/resume.context";
import resumeRepository from "@app/repositories/resume.repository";
import useMutate from "@app/hooks/useMutation.hook";
import { Button } from "@app/components/ui/button";
import { Input } from "@app/components/ui/input";
import { stubUndefined } from "@app/util/stub";
import { TResume } from "@app/@types/resume";
import { toast } from "@app/util/toast";

type FormData = {
  knowledge: TResume.IKnowledge[]
}

type Props = {
  onFinish?: VoidFunction;
}

const KnowledgeForm: React.FC<Props> = ({ onFinish = stubUndefined }) => {
  const { resume } = useResumeContext();

  const { handleSubmit, watch, control, setValue } = useForm<FormData>({
    defaultValues: {
      knowledge: resume?.knowledge ?? [],
    }
  })

  const { mutate, isLoading } = useMutate(resumeRepository.patchKnowledge.bind(resumeRepository));
  const { refresh, resume_id } = useResumeContext();

  const knowledge = watch('knowledge');
  const [text, setText] = useState('')

  const send = async (payload: FormData) => {
    const [,error] = await mutate({ ...payload, resume_id })
    if(error) return;
    try {
      refresh()
    } finally {
      toast.successful('Actualizado');
      onFinish()
    }
  }

  return (
    <form onSubmit={handleSubmit(send)}>
      <h4 className="text-center font-semibold text-lg mb-2">Crear / Eliminar Conocimientos</h4>
      <ol className="px-20 flex flex-col gap-4">
          <Controller
            name="knowledge"
            control={control}
            render={({ field }) => (
              <div className="flex gap-4">
                <Input ref={field.ref} value={text} onChange={e => setText(e.target.value)} />
                <Button type="button" onClick={() => {
                  const newValue = text.trim();
                  if (newValue.length === 0) return;
                  if (knowledge.findIndex(item => item.name.toLowerCase() === newValue.toLowerCase()) !== -1) return;
                  field.onChange([...knowledge, { name: newValue }])
                  setText('')
                }}>Agregar</Button>
              </div>
            )}
          />
        {knowledge.map(item => (
          <li className="flex pb-2 px-4 border-b-2 border-zinc-500" key={item.name}>
            <p className="flex-1">{item.name}</p>
            <button onClick={() => {
              const newValues = knowledge.filter(k => k.name !== item.name);
              setValue('knowledge', newValues)
            }} aria-label="borrar" type="button"><Trash2 /></button>
          </li>
        ))}
      </ol>
      <footer className="flex justify-center pt-5">
        <Button disabled={isLoading} className="mx-auto" >Guardar</Button>
      </footer>
    </form>
  )
}

export default KnowledgeForm;