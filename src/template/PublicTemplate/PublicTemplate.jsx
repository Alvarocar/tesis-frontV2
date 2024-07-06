import React from "react"
import PropTypes from "prop-types"
import { HeaderPublic } from "@app/components/shared/HeaderPublic"

const PublicTemplate = ({ children }) => {
  return (
    <React.Fragment>
      <HeaderPublic />
      {children}
      <footer></footer>
    </React.Fragment>
  )
}

export default PublicTemplate

PublicTemplate.propTypes = {
  children: PropTypes.element,
}