import { Link } from "wouter";
import {JobSearch} from "@app/modules/job/JobSearch";
import { AppTitle } from "@app/modules/common/AppTitle";


const HeaderDefault = () => {
  return (
    <header className="w-screen bg-white py-5 px-3 flex items-center">
      <AppTitle />
      <JobSearch className="mx-auto"/>
      <ul className="flex justify-end px-5 gap-6">
        <li className="bg-slate-800 hover:bg-slate-800/90 px-4 py-1 rounded text-white">
          <Link href="/sign-in">Ingresa</Link>
        </li>
        <li className="px-4 py-1 rounded border-2 hover:bg-slate-100">
          <Link href="/sign-up">Regístrate</Link>
        </li>
      </ul>
   </header>
  )
}

export default HeaderDefault;