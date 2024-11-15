import { SignupForm } from "../../../components/signup/SignupForm"
import { Card } from "antd"
import { Subject, catchError, map, mergeMap } from "rxjs"
import { useEffect, useRef, useState } from "react"
import classNames from "classnames/bind"
import { APPLICANT_API } from "@app/api/applicants.api"
import { fromPromise } from "@app/utils/rxjs"
import { Link, useNavigate } from "react-router-dom"
import { PublicTemplate } from "@app/template/PublicTemplate"
import { PublicMiddleware } from '@app/middlewares/public.middleware'
import styles from "./Signup.module.scss"

const cx = classNames.bind(styles)

export const Signup = () => {
  const navigate = useNavigate();
  const submit$ = useRef(new Subject())

  const handleSubmit = (payload: any) => {
    submit$.current.next(payload)
  }

  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const subscription = submit$.current.pipe(
      map((value: any) => ({
        email: value.email,
        name: value.name,
        password: value.password,
      })),
      mergeMap(user => fromPromise(APPLICANT_API.SIGN_UP(user))),
      catchError(() => {
        setError("Hubo un error")
        return ""
      })
    )
      .subscribe(() => {
        navigate("/aspirantes/sign-in")
      })

    return () => {
      subscription.unsubscribe()
    }
  }, [navigate])

  return (
    <PublicMiddleware userType='applicant'>
      <PublicTemplate>
        <div className={styles['sign-up']}>
          <Card
            title="Registrarse como Aspirante"
          >
            <SignupForm
              onSubmit={handleSubmit}

            />
            {error}
          </Card>
          <p className={cx('sign-up__msg')}>¿Ya tienes una cuenta? <Link to='/aspirantes/sign-in' className={cx('sign-up__login')}>Ingresa aqu&iacute;.</Link></p>
        </div>
      </PublicTemplate>
    </PublicMiddleware>
  )
}

Signup.propTypes = {}