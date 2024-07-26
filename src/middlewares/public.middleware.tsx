import { selectCandidateToken } from "@app/store/features/applicant/applicant.selector"
import { useSelector } from "react-redux"
import { isEmpty } from "lodash"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

export const PublicMiddleware: React.FC<{ children?: React.ReactNode, userType: 'applicant' | 'recluter' }> = ({ children, userType }) => {
  const token = useSelector(selectCandidateToken)
  const navigate = useNavigate()

  useEffect(() => {
    if (typeof token === 'string' && !isEmpty(token)) {
      if (userType === 'applicant') {
        navigate({ pathname: '/aspirantes/home' })
      } else {
        navigate({ pathname: '/recluter/home' })
      }
    }
  }, [token, navigate, userType])

  return (
    <>
      {children}
    </>
  )
}