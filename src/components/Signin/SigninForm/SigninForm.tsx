import { Form, Input, Typography } from "antd"
import classNames from "classnames/bind"
import { Button } from "@app/components/shared/Button"
import { useEffect } from "react"
import styles from './Signin.module.scss'
import { signinFormRules } from "@app/utils/signin/validations.util"
import { useSigninApplicantMutation } from "@app/store/features/applicant"
import { useNavigate } from "react-router-dom"

const cx = classNames.bind(styles)

const { Item } = Form

const SigninForm = () => {


  const [submit, query] = useSigninApplicantMutation()
  const navigate = useNavigate()
  const handleSubmit = (values) => {
    submit(values)
  }

  useEffect(() => {
    if (query.status === 'fulfilled') {
      navigate({ pathname: '/aspirantes/home' })
    }
  }, [query.status, navigate])

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
        loading={query.isLoading}
        type="primary"
        htmlType="submit"
        className={cx('form__submit')}>
          <Typography.Text>
            Ingresar
          </Typography.Text>
      </Button>
    </Form>
  )
}

export default SigninForm
