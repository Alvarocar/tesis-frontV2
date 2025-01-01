import { AlertCircle, ChevronLeft, Home } from 'lucide-react'
import { Button } from "@app/components/ui/button"
import { Card } from '../../card';

const GenericError = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <main className="pt-6 text-center">
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-red-100 p-3">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            ¡Ups! Algo salió mal
          </h1>
          
          <p className="text-gray-600 mb-6">
            Lo sentimos, ha ocurrido un error al procesar tu solicitud. Por favor, intenta nuevamente o regresa al inicio.
          </p>
        </main>

        <footer className="flex flex-col justify-center sm:flex-row gap-3">
          <Button 
            variant="outline" 
            className="w-full sm:w-auto"
            onClick={() => window.history.back()}
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Regresar
          </Button>
          
          <Button 
            className="w-full sm:w-auto"
            onClick={() => window.location.href = '/'}
          >
            <Home className="w-4 h-4 mr-2" />
            Ir al inicio
          </Button>
        </footer>
      </Card>
    </div>
  )
}

export default GenericError;
