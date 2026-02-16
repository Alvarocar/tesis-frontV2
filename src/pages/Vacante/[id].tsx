import useSWR from "swr"
import { useLocation } from "wouter"
import { TVacant } from "@app/@types/vacant"
import { Card } from "@app/modules/common/card"
import { Header } from "@app/modules/common/header"
import useMutate from "@app/hooks/useMutation.hook"
import { VacantForm } from "@app/modules/common/VacantForm"
import { DotsLoader } from "@app/modules/common/loader/dotsLoader"
import vacantRepository from "@app/repositories/vacant.repository"
import { toast } from "@app/util/toast"
import React, { useState } from "react";

import Modal from "@app/components/Modal"; // Assumes there's an existing Modal component
import { ROUTES_PATHS } from "@app/constants/routes.constant"

type Props = {
  params: { id: string }
}

const isValidSlug = (jobSlug: string) => Number.isFinite(Number(jobSlug))

const VacantEdit: React.FC<Props> = ({ params }) => {
  const { isLoading, data } = useSWR(isValidSlug(params.id) ? { id: params.id } : undefined, vacantRepository.getVacant.bind(vacantRepository))
  const { mutate } = useMutate(vacantRepository.updateVacant.bind(vacantRepository));
  const [isModalOpen, setModalOpen] = useState(false);
  const [, setLocation] = useLocation()

  if (isLoading || !data) return <DotsLoader />;

  const handleSubmit = async (data: TVacant): Promise<[null, Error | undefined]> => {
    const [_, error] = await mutate(Number(params.id), data);
    if (error) {
      toast.failed('Hubo un error al editar la vacante');
      return [null, error];
    } else {
      toast.successful('Vacante editada exitosamente');
      return [null, undefined];
    }
  }

  const onConfirmDelete = async () => {
    try {
      await vacantRepository.archiveVacancy(Number(params.id));
      toast.successful("¡Vacante cerrada exitosamente!");
      setLocation(ROUTES_PATHS.HOME);
    } catch {
      toast.failed("Hubo un error al cerrar esta vacante, intenta nuevamente.");
    } finally {
      setModalOpen(false);
    }
  };

  return (
    <>
      <Header />
      <div>
        <main className="grid place-items-center pt-10">
          <Card className="w-[40rem]">
            <h2>Editar Vacante</h2>
            <VacantForm vacant={data} onSubmit={handleSubmit} />
            {data.editable && (
              <div className="mt-8 p-4 bg-red-50 border-t border-red-300">
                <p className="text-red-600 text-sm mb-4">
                  Esta acción no se puede deshacer. Cerrar esta vacante hará que no sea visible para los candidatos.
                </p>
                <button
                  className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700"
                  onClick={() => setModalOpen(true)}
                >
                  Cerrar vacante
                </button>
              </div>
            )}
          </Card>
        </main>
      </div>

      {isModalOpen && (
        <Modal onClose={() => setModalOpen(false)}>
          <div className="p-6">
            <p>
              Estas apunto de cerrar esta vacante y por ende ya no aparecera para los candidatos.
              ¿Seguro que quieres continuar?
            </p>
            <div className="mt-4 flex justify-end">
              <button
                className="px-4 py-2 text-sm bg-gray-300 mr-2 rounded-md"
                onClick={() => setModalOpen(false)}
              >
                Cancelar
              </button>
              <button
                className="px-4 py-2 text-sm bg-red-600 text-white rounded-md hover:bg-red-700"
                onClick={onConfirmDelete}
              >
                Confirmar
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  )
}

export default VacantEdit;
