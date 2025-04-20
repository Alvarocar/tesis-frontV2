import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@app/components/ui/alert-dialog";
import { useDeleteResume } from "../../useDeleteResume";

interface Props {
  resumeId: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ConfirmDeleteResume: React.FC<Props> = ({ resumeId, open, onOpenChange }) => {
  const { deleteResume, isLoading } = useDeleteResume()

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange} >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Estas seguro de eliminar este Hoja de vida?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no puede ser revertida. la hoja de vida se borrara permanentemente de la aplicación.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction disabled={isLoading} onClick={() => deleteResume(resumeId)} >Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default ConfirmDeleteResume;
