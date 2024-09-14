import React, { useState } from 'react'
import classNames from 'classnames/bind'
import { IEducation } from '@app/@types/resume.types'
import { Button, Modal, Typography } from 'antd'
import EducationForm from '../EducationForm/EducationForm'
import styles from './EducationList.module.scss'
import { LanguageAutoComplete } from '../LanguageAutoComplete'

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
  const [isOpen, setIsOpen] = useState(false)


  const handleOpenModal = (value: IEducation) => {
    setSelectedEducation(value)
    setIsOpen(true)
  }

  return (
    <article className={cx('studies')}>
      <Typography.Title level={3}>Estudios</Typography.Title>
      <Button 
        type="primary"
        onClick={() => handleOpenModal(newEducation)}      
      ><Typography.Text >Agregar nuevo estudio</Typography.Text></Button>
      <Modal
        onCancel={() => setIsOpen(false)}
        onClose={() => setIsOpen(false)}
        footer={null}
        open={isOpen}>
        <EducationForm value={selectedEducation}/>
      </Modal>
    </article>
  )
}

export default EducationList
