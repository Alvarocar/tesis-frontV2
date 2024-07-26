import { PublicTemplate } from '@app/template/PublicTemplate'
import { SigninForm } from '@app/components/Signin/SigninForm'
import classNames from 'classnames/bind'
import { Card } from 'antd'
import { Link } from 'react-router-dom'
import { PublicMiddleware } from '@app/middlewares/public.middleware'
import styles from './Login.module.scss'

const cx = classNames.bind(styles)

const Login = () => {
  return (
    <PublicMiddleware userType='applicant'>
      <PublicTemplate>
        <div className={cx('sign-in')}>
          <Card
            title="Ingresar como Aspirante"
          >
            <SigninForm />
          </Card>
          <p className={cx('sign-in__msg')}>¿No tienes una cuenta? <Link to='/aspirantes/sign-up' className={cx('sign-in__sign-up')}>Creala aqu&iacute;.</Link></p>
        </div>
      </PublicTemplate>
    </PublicMiddleware>
  )
}

Login.propTypes = {}

export default Login