import { Header } from "@app/modules/common/header";
import { SigninCard } from "@app/modules/signin/signinCard";

const Signin = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header hideSearch />
      <main
        id="main"
        tabIndex={-1}
        className="grid flex-1 place-content-center px-4 py-10 focus:outline-none"
      >
        <SigninCard />
      </main>
    </div>
  )
}

export default Signin;
