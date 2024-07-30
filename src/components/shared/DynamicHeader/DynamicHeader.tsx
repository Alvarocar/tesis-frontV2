import { useSelector } from "react-redux"
import { HeaderPublic } from "../HeaderPublic"
import { selectCandidateToken } from "@app/store/features/applicant/applicant.selector"
import { ApplicantHeader } from "../ApplicantHeader"
import { isEmpty } from "lodash"

const DynamicHeader = () => {
const candidateToken = useSelector(selectCandidateToken)

  if (candidateToken != null && !isEmpty(candidateToken)) {
    return <ApplicantHeader />
  }

  return <HeaderPublic />
}

export default DynamicHeader
