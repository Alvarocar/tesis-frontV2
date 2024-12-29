import { Card } from '@app/modules/common/card'
import { Link } from 'wouter'
import { SignupForm } from '../signupForm'

const SignupCard = () => {
  return (
    <Card className='flex gap-2'>
      <aside className='hidden md:grid border-r-2 py-5 px-16 content-center gap-y-6'>
        <h3 className='text-2xl font-bold font-medium'>¿Ya tienes una cuenta?</h3>
        <Link className='justify-self-center bg-sky-600 p-4 text-white rounded' href='/sign-in'>Ingresa aquí</Link>
      </aside>
      <main className='py-5 px-16'>
        <SignupForm />
      </main>
    </Card>
  )
}

export default SignupCard