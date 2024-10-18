import { useState } from 'react'
import { Button, Modal, Typography } from 'antd'
import classNames from 'classnames/bind'
import { SkillForm } from '../SkillForm'
import styles from './SkillList.module.scss'

const cx = classNames.bind(styles)

const Skill = () => {
  const [open, setOpen] = useState(false)
  
  return (
    <article className={cx('skills')}>
      <Typography.Title level={3}>Habilidades</Typography.Title>
      <Button 
        type="primary"
        onClick={() => setOpen(true)}
      >
        <Typography.Text>Agregar Habilidad</Typography.Text>
      </Button>
      <Modal
          open={open}
          onClose={() => setOpen(false)}
          onCancel={() => setOpen(false)}
          destroyOnClose
          footer={null}
        >
          <SkillForm onSubmit={() => setOpen(false)}/>
        </Modal>
    </article>
  )
}

export default Skill
