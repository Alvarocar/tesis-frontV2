import useSWR from "swr";
import { ApplicantMenuDrawer } from "@app/modules/common/drawer/ApplicantMenuDrawer";
import { AccountOptionsDropDown } from "../AccountOptionsDropDown";
import { useAuth } from "@app/hooks/useAuth.hook";
import applicantRepository from "@app/repositories/applicant.repository";
import {JobSearch} from "@app/modules/job/JobSearch";
import { AppTitle } from "@app/modules/common/AppTitle";


const HeaderApplicant = () => {
  const { token } = useAuth()
  useSWR(token, applicantRepository.getApplicant.bind(applicantRepository))
  return (
    <header className="w-screen bg-zinc-200 py-5 px-3 flex items-center">
      <ApplicantMenuDrawer />
      <AppTitle />
      <JobSearch className="mx-auto" />
      <ul className="flex justify-end px-5 gap-6">
        <li className="px-4 py-1 rounded text-white">
          <AccountOptionsDropDown />
        </li>
      </ul>
   </header>
  )
}

export default HeaderApplicant;