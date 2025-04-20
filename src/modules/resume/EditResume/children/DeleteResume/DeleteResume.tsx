import { Trash } from "lucide-react";
import { Button } from "@app/components/ui/button";
import { Typography } from "@app/components/ui/typography";
import { useResumeContext } from "@app/context/resume.context";
import { ConfirmDeleteResume } from "./children/ConfirmDeleteResume";
import { useState } from "react";

interface Props {
  className?: string;
}

const DeleteResume: React.FC<Props> = ({ className }) => {
  const { resume_id } = useResumeContext()
  const [open, setOpen] = useState(false)
  return (
    <div className={className}>
      <section className="flex items-center justify-between">
        <section>
          <Typography.H5>Eliminar Hoja de Vida</Typography.H5>
          <Typography noMargin>Con esta opcion podras eliminar la hoja de vida actual.</Typography>
        </section>
        <section>
          <Button onClick={() => setOpen(true)} variant="destructive"><Trash /></Button>
        </section>
      </section>
      <ConfirmDeleteResume resumeId={resume_id} open={open} onOpenChange={setOpen} />
    </div>
  )
}

export default DeleteResume;
