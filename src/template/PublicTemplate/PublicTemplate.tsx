import React from "react"
import PropTypes from "prop-types"
import { DynamicHeader } from "@app/components/shared/DynamicHeader"
import { Header } from "@app/modules/common/Header"

const PublicTemplate: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <React.Fragment>
      <DynamicHeader />
      {children}
      <footer></footer>
    </React.Fragment>
  )
}

export default PublicTemplate

PublicTemplate.propTypes = {
  children: PropTypes.element,
}