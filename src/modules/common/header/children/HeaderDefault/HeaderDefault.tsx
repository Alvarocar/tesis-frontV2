import { Link } from "wouter";
import { ENV } from "@app/constants";

const HeaderDefault = () => {
  return (
    <header className="w-screen bg-zinc-200 py-5 px-3 flex items-center">
      <h4>
        <Link href="/">
          {ENV.APP_NAME}
        </Link>
      </h4>
      <ul className="flex flex-1 justify-end px-5 gap-6">
        <li className="bg-indigo-400 px-4 py-1 rounded text-white">
          <Link href="/sign-in">Ingresa</Link>
        </li>
        <li className="bg-stone-400 px-4 py-1 rounded text-white">
          <Link href="/sign-up">Regístrate</Link>
        </li>
      </ul>
   </header>
  )
}

export default HeaderDefault;