import { Header } from "@app/modules/common/header";
import { SigninCard } from "@app/modules/signin/signinCard";

const Signin = () => {
  return (
    <>
      <Header hideSearch />
      <div className="w-screen h-screen grid place-content-center">
        <SigninCard />
      </div>
    </>
  )
}

export default Signin;
