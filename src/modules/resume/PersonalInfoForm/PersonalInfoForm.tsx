import React, { useEffect } from "react"
import classNames from "classnames/bind"
import styles from "./PersonalForm.module.scss"
import { Button, DatePicker, Form, Input, Typography } from "antd"
import { usePatchPersonalInfoMutation } from "@app/store/features/applicant"
import { useForm } from "antd/es/form/Form"
import { IApplicantDetail } from "@app/@types/resume.types"
import { dateToString } from "@app/utils/date.util"
import { RootState } from "@app/store"
import { selectCandidateDetails, selectCandidateName } from "@app/store/features/applicant/applicant.selector"
import { ConnectedProps, connect } from "react-redux"

const cx = classNames.bind(styles)

const isNumbers = new RegExp("^\\d*$")

const mapStateToProps = (state: RootState) => ({
  value: selectCandidateDetails(state),
})

const connector = connect(mapStateToProps)

type Props = ConnectedProps<typeof connector>

const PersonalInfoForm: React.FC<Props> = ({
  value,
}) => {

  const [patch] = usePatchPersonalInfoMutation()
  const [form] = useForm()

  useEffect(() => {
    form.setFieldsValue(value)
  }, [value])

  return (
    <Form
      layout="vertical"
      className={cx('form')}
      onFinish={(values: any) => {
        patch({
          ...values,
          birth_date: values.birth_date ? dateToString(values.birth_date) : values.birth_date,
        })
      }}
      form={form}
    >
      <Typography.Title level={3} style={{ textAlign: "center" }}>Datos Personales</Typography.Title>
      <Form.Item 
        name="name" 
        className={cx('form__names')} 
        label="Nombres y Apellidos" 
        required
        rules={[
          { required: true, message: 'campo requerido' }
        ]}
        >
        <Input type="text" />
      </Form.Item>
      <div className={cx('row', 'row--col-sm')}>
        <Form.Item
          name="identification"
          className={cx('form__identification')} 
          label="Identificación" 
          required
          rules={[
            { required: true, message: 'campo requerido' }
          ]}
          normalize={(value, prevValue) => {
            if (isNumbers.test(value)) {
              return value
            }
            return prevValue
          }}
          >
          <Input 
            type="text"
            pattern="[0-9]*"
            inputMode="numeric"
          />
        </Form.Item>
        <Form.Item
          name="phone_number" 
          className={cx('form__phone')} 
          label="Telefono"
          normalize={(value, prevValue) => {
            if (isNumbers.test(value)) {
              
              return value
            }
            return prevValue
          }}
          >
          <Input 
            type="text"
            pattern="[0-9]*"
            inputMode="numeric"
          />
        </Form.Item>
      </div>
      <div className={cx('row')}>
        <Form.Item name="birth_date" className={cx('form__birth-date')} label="Fecha de nacimiento">
          <DatePicker />
        </Form.Item>
        <Form.Item name="direction"  label="Dirección de residencia">
          <Input className={cx('form__address')} type="text" />
        </Form.Item>
      </div>
      <div className={cx('form__center')}>
        <Button onClick={() => form.submit()} className={cx('form__submit')} type="primary">
          <Typography.Text>Guardar</Typography.Text>
        </Button>
      </div>
    </Form>
  )
}

export default connector(PersonalInfoForm)
