import React, { useEffect } from 'react'
import { IEducation } from '@app/@types/resume.types'
import { Button, Checkbox, DatePicker, Form, Input, Typography } from 'antd'
import classNames from 'classnames/bind'
import styles from './EducationForm.module.scss'

const cx = classNames.bind(styles)

const EducationForm: React.FC<{ value: IEducation }> = ({ value }) => {

  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue(value)
  }, [value])

  return (
    <Form
      layout='vertical'
      form={form}
    >
      <Form.Item name='id' noStyle></Form.Item>
      <Form.Item name='resumeId' noStyle></Form.Item>
      <Typography.Title level={3}>Agregar/Editar Estudio</Typography.Title>
      <Form.Item
        name='title'
        label='Titulo obtenido'
      >
        <Input type='text' />
      </Form.Item>
      <Form.Item 
        name='institute'
        label='Instituo en donde estudiaste'
        >
          <Input type='text' />
        </Form.Item>
      <Form.Item
        name='keep_study'
      >
        <Checkbox><Typography.Text>¿Aun sigue estudiando?</Typography.Text></Checkbox>
      </Form.Item>
      <div className={cx('row')}>
        <Form.Item
          name='start_date'
          label='Fecha de ingreso'
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          name='end_date'
          label='Fecha de finalización'
        >
          <DatePicker />
        </Form.Item>
      </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button type='primary' >
            <Typography.Text>Guardar</Typography.Text>
          </Button>
        </div>
    </Form>
  )
}

export default EducationForm