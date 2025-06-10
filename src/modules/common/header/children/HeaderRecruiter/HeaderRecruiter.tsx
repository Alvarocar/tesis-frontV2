import { RecruiterMenuDrawer } from "@app/modules/common/drawer/RecruiterMenuDrawer";
import { AccountOptionsDropDown } from "../AccountOptionsDropDown";
import {JobSearch} from "@app/modules/job/JobSearch";
import { AppTitle } from "@app/modules/common/AppTitle";

const HeaderRecruiter = () => {
  return (
    <header className="w-screen bg-white py-5 px-3 flex items-center">
      <section className="flex-1 pl-2 flex gap-2 items-center">
        <RecruiterMenuDrawer />
        <AppTitle />
        <JobSearch className="mx-auto" />
        <ul className="flex justify-end px-5 gap-6">
        <li className="px-4 py-1 rounded text-white">
          <AccountOptionsDropDown />
        </li>
      </ul>
      </section>
    </header>
  )
}

export default HeaderRecruiter;
