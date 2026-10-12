import { Header } from "@app/modules/common/header";
import { SignupCard } from "@app/modules/signup/signupCard";

const Signup = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header hideSearch />
      <main
        id="main"
        tabIndex={-1}
        className="grid flex-1 place-content-center px-4 py-10 focus:outline-none"
      >
        <SignupCard />
      </main>
    </div>
  )
}

export default Signup;
