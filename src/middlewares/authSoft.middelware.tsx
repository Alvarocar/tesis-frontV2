import { selectCandidateToken } from "@app/store/features/applicant/applicant.selector"
import { useSelector } from "react-redux"
import { isEmpty } from "lodash"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

export const AuthSoft: React.FC<{ children?: React.ReactNode, userType: 'applicant' | 'recluter' }> = ({ children, userType }) => {
  const token = useSelector(selectCandidateToken)
  const navigate = useNavigate()

  useEffect(() => {
    if (token == null || isEmpty(token)) {
      if (userType === 'applicant') {
        navigate({ pathname: '/aspirantes/sign-in' })
      } else {
        navigate({ pathname: '/recluter/sign-in' })
      }
    }
  }, [token, navigate, userType])

  return (
    <>
      {children}
    </>
  )
}