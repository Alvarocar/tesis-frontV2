import React from "react"
import PublicHeader from "@components/header/publicHeader"
import PublicFooter from "@components/footer/publicFooter"

export default (WrappedComponent: React.FC) => {

  const withPublicLayout: React.FC = ({ ...rest }) => {
    return (
      <>
        <PublicHeader />
        <WrappedComponent {...rest} />
        <PublicFooter />
      </>
    )
  }
  return withPublicLayout
}