import { ApplicantHeader } from "@app/components/shared/ApplicantHeader"
import React from "react"

const ApplicantTemplate: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <React.Fragment>
      <ApplicantHeader />
      {children}
      <footer></footer>
    </React.Fragment>
  )
}

export default ApplicantTemplate
