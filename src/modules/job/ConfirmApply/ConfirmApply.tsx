import { TResume } from "@app/@types/resume";
import { Button } from "@app/components/ui/button";
import { FileText } from "lucide-react";

interface ConfirmApplyProps {
  resume: TResume.Overview;
  onConfirm?: VoidFunction;
  onCancel?: VoidFunction;
}

const ConfirmApply: React.FC<ConfirmApplyProps> = ({ resume, onConfirm, onCancel }) => {
  return (
    <article>
      <div className="p-4 flex items-center justify-center">
        <FileText className="w-6 h-6 text-gray-600"/>
      </div>
      <h4 className="text-lg font-bold text-center">¿Enviar aplicación?</h4>
      <section className="p-4 text-center">
        <span className="font-medium">Hoja de vida: {resume.title}</span>
      </section>
      <footer className="flex justify-center gap-4">
        <Button variant="outline" onClick={onCancel}>Cancelar</Button>
        <Button onClick={onConfirm}>Confirmar</Button>
      </footer>
    </article>
  );
};

export default ConfirmApply;
