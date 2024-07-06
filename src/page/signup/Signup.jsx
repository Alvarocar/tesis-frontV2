import styles from "./Signup.module.scss"
import { SignupForm } from "../../components/signup/SignupForm"
import { Card } from "antd"
import { Subject, catchError, map, mergeMap, retry } from "rxjs"
import { useEffect, useState } from "react"
import { APPLICANT_API } from "@app/api/applicants.api"
import { fromPromise } from "@app/utils/rxjs"
import { useNavigate } from "react-router-dom"
import { PublicTemplate } from "@app/template/PublicTemplate"

const submit$ = new Subject()

export const Signup = () => {
  const navigate = useNavigate();

  const handleSubmit = (payload) => {
    submit$.next(payload)
  }

  const [error, setError] = useState(null)

  useEffect(() => {
    const subscription = submit$.pipe(
      map(value => ({
        email: value.email,
        name: value.name,
        password: value.password,
      })),
      mergeMap(user => fromPromise(APPLICANT_API.SIGN_UP(user))),
      catchError(() => {
        setError("Hubo un error")
      })
    )
      .subscribe(() => {
        navigate("/aspirantes/sign-in")
      })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return (
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
      </div>
    </PublicTemplate>
  )
}

Signup.propTypes = {}