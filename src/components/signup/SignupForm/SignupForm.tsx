import PropTypes from 'prop-types'
import { Form, Input } from 'antd'
import { signupFormRules } from '@app/utils/singup/validations.utils'
import { Button } from '@app/components/shared/Button'
import styles from "./SignupForm.module.scss"
import { useState } from 'react'
import classNames from 'classnames/bind'

const { Item } = Form

const cx = classNames.bind(styles)

const SignupForm: React.FC<{ onSubmit: (data: any) => void }> = ({
  onSubmit,
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const handleSubmit = async (data: any) => {
    try {
      setIsLoading(true)
      if (typeof onSubmit === "function") {
        await onSubmit(data)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form
      layout='vertical'
      requiredMark="optional"
      onFinish={handleSubmit}
      className={cx("SignupForm")}
    >
      <Item label="Nombre" name="name" rules={signupFormRules.name}>
        <Input />
      </Item>
      <Item label="Email" name="email" rules={signupFormRules.email}>
        <Input />
      </Item>
      <Item label="Contraseña" name="password" rules={signupFormRules.password}>
        <Input.Password />
      </Item>
      <Item
        dependencies={["password"]}
        label="Confirmar Contraseña"
        name="confirmPassword"
        rules={signupFormRules.confirmPassword}>
        <Input.Password />
      </Item>
      <Button
        loading={isLoading}
        type="primary"
        htmlType="submit"
        className={cx('SignupForm__submit')}>
        Registrarme
      </Button>
    </Form>
  )
}

export default SignupForm