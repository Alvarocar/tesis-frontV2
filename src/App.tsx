import { Suspense } from "react"
import { AuthProvider } from "./context/auth";
import { DotsLoader } from "./modules/common/loader/dotsLoader";
import { CustomRouter } from "./router/router";
import { routesSchema } from "./router/routes.schema";


function App() {  return (
    <div className="h-screen bg-slate-100">
      <AuthProvider>
        <Suspense fallback={<DotsLoader />}>
            <CustomRouter schema={routesSchema} />
        </Suspense>
      </AuthProvider>
    </div>
  )
}

export default App
