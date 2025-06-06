import { ENV } from "@app/constants";
import { RecruiterMenuDrawer } from "@app/modules/common/drawer/RecruiterMenuDrawer";
import { AccountOptionsDropDown } from "../AccountOptionsDropDown";
import {JobSearch} from "@app/modules/job/JobSearch";

const HeaderRecruiter = () => {
  return (
    <header className="w-screen bg-white py-5 px-3 flex items-center">
      <section className="flex-1 pl-2 flex gap-2 items-center">
        <RecruiterMenuDrawer />
        <h2>
          {ENV.APP_NAME}
        </h2>
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
