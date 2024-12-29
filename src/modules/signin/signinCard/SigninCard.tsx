import { Link } from "wouter";
import { Card } from "@app/modules/common/card";
import { SigninForm } from "../signinForm";

const SigninCard = () => {
  return (
    <Card className="flex">
      <main className="py-5 px-16">
        <SigninForm />
      </main>
      <aside className="hidden md:grid border-l-2 py-5 px-16 content-center gap-y-6">
        <h3 className="font-semibold text-xl">¿Aun no tienes una cuenta?</h3>
        <Link className="bg-slate-600 text-white p-4 rounded inline-block w-fit mx-auto" href="/sign-up">Crear una cuenta</Link>
      </aside>
    </Card>
  )
}

export default SigninCard;
