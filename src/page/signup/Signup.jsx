import styles from "./Signup.module.scss"
import { SignupForm } from "../../components/signup/SignupForm"
import { Card } from "antd"

export const Signup = () => {
  return (
    <div className={styles['sign-up']}>
      <Card
        title="Registrarse como Aspirante"
      >
        <SignupForm />
      </Card>
    </div>
  )
}

Signup.propTypes = {}