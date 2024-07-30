import React, { useState } from "react"
import { Drawer as AntDrawer, Button, Divider, Modal, Skeleton, Typography } from "antd"
import { HambergerMenu } from "iconsax-react"
import { useSelector } from "react-redux"
import { selectCandidateName } from "@app/store/features/applicant/applicant.selector"
import { Link } from "react-router-dom"
import { useGetMyResumesQuery } from "@app/store/features/applicantResume"
import { ResumeOverviewCard } from "@app/modules/resume/ResumeOverviewCard"
import { ResumeCreateForm } from "@app/modules/resume/ResumeOverviewCard/ResumeCreateForm"

const Drawer = () => {

  const [open, setOpen] = useState(false)
  const { data: resumes, isLoading } = useGetMyResumesQuery()
  const name = useSelector(selectCandidateName)
  const [visibleModalCreate, setVisibleModalCreate] = useState(false)

  const handleClick = () => {
    setOpen(op => !op)
  }

  const handleCreateCV = () => {
    setVisibleModalCreate(true)
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
        <Link to="/aspirantes/cuenta"><Typography.Text style={{ fontSize: "18px" }}>Cuenta</Typography.Text></Link>
        <Divider />
        <Typography.Title level={4} >Hojas de Vida</Typography.Title>
        {isLoading ? <Skeleton active /> : resumes?.map(resume => (
          <ResumeOverviewCard key={resume.id} value={resume} />
        ))}
        {isLoading ? null :
          (resumes!.length > -1 && resumes!.length < 6) &&
          <Button onClick={handleCreateCV} type="primary" block >
            <Typography.Text>Crear Hoja de Vida</Typography.Text>
          </Button>}
      </AntDrawer>
      <Modal
        title={"Crear una hoja de vida"}
        open={visibleModalCreate}
        onClose={() => setVisibleModalCreate(false)}
        onCancel={() => setVisibleModalCreate(false)}
        footer={null}
      >
        <ResumeCreateForm />
      </Modal>
    </React.Fragment>
  )
}

export default Drawer
