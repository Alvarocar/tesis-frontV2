import React, { useState } from "react"
import { Button, Modal, Typography } from "antd"
import classNames from "classnames/bind"
import { LanguageForm } from "../LanguageForm"
import styles from './LanguageList.module.scss'

const cx = classNames.bind(styles)

const LanguageList: React.FC = () => {

  const [open, setOpen] = useState(false)

  return (
    <article className={cx('languages')}>
      <Typography.Title level={3}>Lenguajes</Typography.Title>
      <Button 
        type="primary"
        onClick={() => setOpen(true)}
      >
        <Typography.Text>Agregar Lenguaje</Typography.Text>
      </Button>
      <Modal
          open={open}
          onClose={() => setOpen(false)}
          onCancel={() => setOpen(false)}
          footer={null}
        >
          <LanguageForm />
        </Modal>
    </article>
  )
}

export default LanguageList
