import PropTypes from 'prop-types'
import { Form, Input } from 'antd'
import { rules } from './applicantRules'
import { Button } from '@app/components/shared/Button'
import styles from "./SignupForm.module.scss"

const { Item } = Form

const SignupForm = ({
  onSubmit,
}) => {

  const handleSubmit = (data) => {
    onSubmit && onSubmit(data)
  }

  return (
    <Form
      layout='vertical'
      requiredMark="optional"
      onFinish={handleSubmit}
      className={styles["SignupForm"]}
    >
      <Item label="Nombre" name="name" rules={rules.name}>
        <Input />
      </Item>
      <Item label="Email" name="email" rules={rules.email}>
        <Input />
      </Item>
      <Item label="Password" name="password" rules={rules.password}>
        <Input.Password />
      </Item>
      <Button type="primary" htmlType="submit">
        Registrarme
      </Button>
    </Form>
  )
}

SignupForm.propTypes = {
  onSubmit: PropTypes.func
}

export default SignupForm