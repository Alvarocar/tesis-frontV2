import { Suspense } from "react"
import { AuthProvider } from "./context/auth";
import { DotsLoader } from "./modules/common/loader/dotsLoader";
import { CustomRouter } from "./router/router";
import { routesSchema } from "./router/routes.schema";
import { ErrorBoundary } from "./modules/common/error/ErrorBoundary";
import { GenericError } from "./modules/common/error/GenericError";
import { Toaster } from "./components/ui/toaster";


function App() {  return (
    <div className="min-h-screen bg-slate-100">
      <AuthProvider>
        <ErrorBoundary fallback={<GenericError />}>
          <Suspense fallback={<DotsLoader />}>
              <CustomRouter schema={routesSchema} />
              <Toaster />
          </Suspense>
        </ErrorBoundary>
      </AuthProvider>
    </div>
  )
}

export default App
