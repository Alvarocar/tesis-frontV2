import React from 'react'
import classNames from 'classnames'
import { BriefcaseIcon, X } from 'lucide-react'
import { Button } from '@app/components/ui/button'
import { useJobFilters } from '@app/hooks/useJobFilters'

export const NoJobResult: React.FC<{ className?: string }> = ({ className }) => {
  const { filters: { q }, setFilter } = useJobFilters()
  const hasQuery = Boolean(q)

  return (
    <div
      role="status"
      className={classNames(
        "mx-auto flex max-w-md flex-col items-center justify-center rounded-xl border border-dashed border-border bg-surface p-8 text-center",
        className
      )}
    >
      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-surface-muted">
        <BriefcaseIcon className="h-6 w-6 text-muted" aria-hidden="true" />
      </div>
      <h2 className="text-lg font-semibold text-foreground">
        {hasQuery ? 'Sin resultados' : 'No hay ofertas disponibles'}
      </h2>
      <p className="mt-2 text-sm text-secondary">
        {hasQuery
          ? `No encontramos ofertas para "${q}". Probá con otro término o limpia los filtros.`
          : 'Volvé a intentarlo más tarde o probá con otros filtros.'}
      </p>
      {hasQuery ? (
        <Button
          variant="outline"
          size="sm"
          className="mt-5"
          onClick={() => setFilter('q', '')}
        >
          <X className="h-4 w-4" aria-hidden="true" />
          Limpiar búsqueda
        </Button>
      ) : null}
    </div>
  )
}
