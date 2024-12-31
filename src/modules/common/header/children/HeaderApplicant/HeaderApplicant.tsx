import { Link } from "wouter";
import { ENV } from "@app/constants";
import { ApplicantMenuDrawer } from "@app/modules/common/drawer/ApplicantMenuDrawer";
import { AccountOptionsDropDown } from "../AccountOptionsDropDown";

const HeaderApplicant = () => {
  return (
    <header className="w-screen bg-zinc-200 py-5 px-3 flex items-center">
      <ApplicantMenuDrawer />
      <h4>
        <Link href="/">
          {ENV.APP_NAME}
        </Link>
      </h4>
      <ul className="flex flex-1 justify-end px-5 gap-6">
        <li className="px-4 py-1 rounded text-white">
          <AccountOptionsDropDown />
        </li>
      </ul>
   </header>
  )
}

export default HeaderApplicant;