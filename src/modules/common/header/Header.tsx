import { useAuth } from "@app/hooks/useAuth.hook";
import { HeaderDefault } from "./children/HeaderDefault";
import { HeaderApplicant } from "./children/HeaderApplicant";

const Header = () => {
  const { userType } = useAuth()

  if (!userType || userType === 'recruiter') return <HeaderDefault />

  return <HeaderApplicant />
}

export default Header;