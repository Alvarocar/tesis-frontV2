import React, { useState } from 'react'
import classNames from 'classnames/bind'
import { IEducation } from '@app/@types/resume.types'
import { Button, Modal, Typography } from 'antd'
import EducationForm from '../EducationForm/EducationForm'
import { useSelector } from 'react-redux'
import { selectResumeEducations } from '@app/store/features/applicantResume/applicantResume.selector'
import { EducationItem } from './children/EducationItem'
import styles from './EducationList.module.scss'

const cx = classNames.bind(styles)

const newEducation: IEducation = {
  institute: '',
  keep_study: false,
  start_date: '',
  end_date: undefined,
  title: '',
  id: undefined,
}

const EducationList: React.FC = () => {
  const [selectedEducation, setSelectedEducation] = useState<IEducation>(newEducation)
  const educations = useSelector(selectResumeEducations)
  const [isOpen, setIsOpen] = useState(false)


  const handleOpenModal = (value: IEducation) => {
    setSelectedEducation(value)
    setIsOpen(true)
  }

  return (
    <article className={cx('studies')}>
      <Typography.Title level={3}>Estudios</Typography.Title>
      <ul className={cx('studies__list')}>
        {educations?.map(study => <EducationItem onEdit={handleOpenModal} key={study.id} study={study} />)}
      </ul>
      <Button 
        type="primary"
        onClick={() => handleOpenModal(newEducation)}      
      ><Typography.Text >Agregar nuevo estudio</Typography.Text></Button>
      <Modal
        onCancel={() => setIsOpen(false)}
        onClose={() => setIsOpen(false)}
        destroyOnClose
        footer={null}
        open={isOpen}>
        <EducationForm value={selectedEducation}  onSubmit={() => setIsOpen(false)}/>
      </Modal>
    </article>
  )
}

export default EducationList
