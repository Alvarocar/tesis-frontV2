import { useAuth } from "@app/hooks/useAuth.hook";
import { HeaderDefault } from "./children/HeaderDefault";
import { HeaderApplicant } from "./children/HeaderApplicant";
import { HeaderRecruiter } from "./children/HeaderRecruiter";

const Header = () => {
  const { userType } = useAuth()

  if (!userType) return <HeaderDefault />

  if (userType === 'recruiter' || userType === 'admin') return <HeaderRecruiter />

  return <HeaderApplicant />
}

export default Header;