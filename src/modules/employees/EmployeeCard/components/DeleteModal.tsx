import React from "react";
import { Dialog, DialogContent, DialogTrigger } from "@app/components/ui/dialog";
import { Button } from "@app/components/ui/button";
import useMutate from "@app/hooks/useMutation.hook";
import recruiterRepository from "@app/repositories/recruiter.repository";

interface DeleteModalProps {
  employeeName: string;
  employeeId: number;
  isOpen: boolean;
  onClose: () => void;
  onDeleted?: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ employeeName, isOpen, onClose, employeeId, onDeleted }) => {
  
  const { isLoading, mutate, error } = useMutate(recruiterRepository.deleteRecruiter.bind(recruiterRepository));

  const handleDelete = async () => {
    try {
      const [_, error] = await mutate(employeeId);
      onClose();

      if (!error) {
        onDeleted?.();
      }

    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  }
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <h2 className="font-semibold text-lg">Eliminar Empleado</h2>
        <p className="text-sm text-gray-600 mt-2">
          ¿Está seguro de que desea eliminar permanentemente al empleado {employeeName}? Esta acción no se puede deshacer.
        </p>
        <div className="mt-4 flex justify-end">
          <Button variant="secondary" className="mr-2" onClick={onClose} disabled={isLoading}>
            Cancelar
          </Button>
          <Button onClick={handleDelete} disabled={isLoading} className="bg-red-600 text-white">
            Eliminar
          </Button>
        </div>
        <p className="text-red-600 mt-2">{error && "Error al eliminar el empleado."}</p>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteModal;
