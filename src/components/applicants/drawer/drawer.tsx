import React, { useState } from "react"
import { Drawer as AntDrawer } from "antd"
import { HambergerMenu } from "iconsax-react"
import { useSelector } from "react-redux"
import { selectCandidateName } from "@app/store/features/applicant/applicant.selector"

const Drawer = () => {

  const [open, setOpen] = useState(false)

  const name = useSelector(selectCandidateName)

  const handleClick = () => {
    setOpen(op => !op)
  }

  return (
    <React.Fragment>
      <button className="btn-icon" onClick={() => handleClick()}>
        <HambergerMenu size={32} color="white" />
      </button>
      <AntDrawer
        placement="left"
        title={`Perfil de ${name}`}
        onClose={handleClick}
        open={open}
      >

      </AntDrawer>
    </React.Fragment>
  )
}

export default Drawer
