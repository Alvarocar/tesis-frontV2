import { Form, Input } from "antd"
import classNames from "classnames/bind"
import { Button } from "@app/components/shared/Button"
import { useState } from "react"
import styles from './Signin.module.scss'
import { signinFormRules } from "@app/utils/signin/validations.util"

const cx = classNames.bind(styles)

const { Item } = Form

const SigninForm = () => {

  const [isLoading] = useState(false)

  const handleSubmit = () => {

  }

  return (
    <Form
      layout='vertical'
      requiredMark="optional"
      onFinish={handleSubmit}
      className={cx("form")}
    >
      <Item label="Email" name="email" rules={signinFormRules.email}>
        <Input />
      </Item>
      <Item label="Contraseña" name="password" rules={signinFormRules.password}>
        <Input.Password />
      </Item>
      <Button
        loading={isLoading}
        type="primary"
        htmlType="submit"
        className={cx('form__submit')}>
        Registrarme
      </Button>
    </Form>
  )
}

export default SigninForm
