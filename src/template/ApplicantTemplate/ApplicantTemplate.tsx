import React, { useState } from "react"
import { Spin } from "antd"
import { useDispatch } from "react-redux"
import { ApplicantHeader } from "@app/components/shared/ApplicantHeader"
import { RESET_APPLICANT } from "@app/store/features/applicant/applicant.slice"
import { withAuthSoftApplicant } from "@app/middlewares/authSoft.middelware"

const ApplicantTemplate: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  
  const [isLoading, setIsLoading] = useState(true)

  const dispatch = useDispatch()

  const handleError = () => {
    dispatch(RESET_APPLICANT())
  }

  return (
    <React.Fragment>
      <ApplicantHeader onComplete={() => setIsLoading(false)} onError={handleError} />
      <div style={{
        background: "#111518",
        padding: "20px",
        minHeight: "100vh",
      }}>
        {isLoading ? <Spin /> : children}
      </div>
      <footer></footer>
    </React.Fragment>
  )
}

export default withAuthSoftApplicant(ApplicantTemplate)
