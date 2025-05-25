import React from 'react'
import classNames from 'classnames'
import { BriefcaseIcon } from 'lucide-react'
import { useJobFilters } from '@app/hooks/useJobFilters'

export const NoJobResult: React.FC<{ className?: string }> = ({ className }) => {
  const { filters: { q } } = useJobFilters()
  return (
    <div className={classNames("flex flex-col items-center justify-center text-center border border-gray-200 rounded-xl p-8 bg-gray-50", className)}>
      <BriefcaseIcon className="w-12 h-12 text-gray-400 mb-4" />
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        No se encontraron ofertas
      </h2>
      <p className="text-gray-600 max-w-sm">
        {q
          ? `No encontramos resultados para “${q}”. Intenta con otro término o revisa tu búsqueda.`
          : `No hay ofertas disponibles en este momento. Vuelve a intentarlo más tarde o prueba con otros filtros.`}
      </p>
    </div>
  )
}