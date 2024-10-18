import React, { useState } from "react";
import { Button, Modal, Typography } from "antd";
import classNames from "classnames/bind";
import { ExperienceForm } from "../ExperienceForm";
import { IExperience } from "@app/@types/resume.types";
import styles from "./ExperienceList.module.scss";
import { useSelector } from "react-redux";
import { selectResumeExperiences } from "@app/store/features/applicantResume/applicantResume.selector";
import { ExperienceItem } from "./children/ExperienceItem";

const cx = classNames.bind(styles);

const newExperience: IExperience = {
  start_date: '',
  end_date: undefined,
  id: undefined,
  company: '',
  description: '',
  keep_working: false,
  rol: '',
}


const ExperienceList: React.FC = () => {
  const [selectedEducation, setSelectedEducation] = useState<IExperience>(newExperience)
  const experiences = useSelector(selectResumeExperiences)
  const [open, setOpen] = useState(false)


  const handleOpenModal = (value: IExperience) => {
    setSelectedEducation(value)
    setOpen(true)
  }
  return (
    <article className={cx("experience")}>
      <Typography.Title level={3}>Experiencias</Typography.Title>
      <ul className={cx('experience__list')}>
        {experiences?.map(exp => <ExperienceItem onEdit={handleOpenModal} key={exp.id} value={exp} />)}
      </ul>
      <Button 
        type="primary"
        onClick={() => handleOpenModal(newExperience)}>
        <Typography.Text>Agregar nueva experiencia</Typography.Text>
      </Button>
      <Modal 
        open={open} 
        onCancel={() => setOpen(false)}
        onClose={() => setOpen(false)}
        destroyOnClose
        footer={null}
        >
          <ExperienceForm value={selectedEducation} onSubmit={() => setOpen(false)}/>
      </Modal>
    </article>
  );
};

export default ExperienceList;
