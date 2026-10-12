import { AlertCircle, ChevronLeft, Home, RotateCw } from 'lucide-react'
import { Button } from "@app/components/ui/button"
import { Card } from '../../card';

type Props = {
  /** Called when the user clicks "Reintentar". Defaults to history.back(). */
  onRetry?: () => void;
  /** Short, specific message that explains what failed. */
  message?: string;
  /** Optional title override. */
  title?: string;
};

const GenericError = ({
  onRetry,
  message = 'Lo sentimos, ha ocurrido un error al procesar tu solicitud. Por favor, intenta nuevamente o regresa al inicio.',
  title = '¡Ups! Algo salió mal',
}: Props) => {
  const handleRetry = () => {
    if (onRetry) return onRetry();
    window.history.back();
  };

  return (
    <div className="flex min-h-[60vh] items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <div className="pt-2 text-center">
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-danger/10 p-3">
              <AlertCircle className="h-8 w-8 text-danger" aria-hidden="true" />
            </div>
          </div>
          <h2 className="mb-2 text-2xl font-semibold text-foreground">{title}</h2>
          <p className="mb-6 text-secondary">{message}</p>
        </div>

        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <Button
            variant="outline"
            className="w-full sm:w-auto"
            onClick={handleRetry}
          >
            <RotateCw className="h-4 w-4" aria-hidden="true" />
            Reintentar
          </Button>

          <Button
            className="w-full sm:w-auto"
            onClick={() => window.location.assign('/')}
          >
            <Home className="h-4 w-4" aria-hidden="true" />
            Ir al inicio
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default GenericError
