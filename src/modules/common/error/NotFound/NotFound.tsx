import { Link } from "wouter";
import { Home } from "iconsax-react";

const NotFound = () => {
  const handleBack = () => {
    window.history.back();
  }

  return (
    <div className="min-h-screen grid place-content-center">
      <main>
        <h1 className="text-9xl font-bold tracking-widest text-center drop-shadow-xl">404</h1>
        <h3 className="text-center text-lg font-semibold">Pagina no encontrada</h3>
        <p>No pudimos encontrar la pagina que estas buscando</p>
        <section className="flex gap-4 p-4">
          <Link className='bg-blue-500 text-white flex gap-2 px-4 py-2 w-fit rounded-md' to='/'>
            <Home /> Ir a la Pagina principal
          </Link>
          <button className="bg-zinc-100 border-2 px-4 py-2 rounded-sm" onClick={handleBack} >Ir Atrás</button>
        </section>
      </main>
    </div>
  )
}

export default NotFound;
