import { useAuth } from "@app/hooks/useAuth.hook";
import { HeaderDefault } from "./children/HeaderDefault";
import { HeaderApplicant } from "./children/HeaderApplicant";
import { HeaderRecruiter } from "./children/HeaderRecruiter";

interface HeaderProps {
  hideSearch?: boolean;
}

const Header = ({ hideSearch }: HeaderProps) => {
  const { userType } = useAuth()

  if (!userType) return <HeaderDefault hideSearch={hideSearch} />

  if (userType === 'recruiter' || userType === 'admin') return <HeaderRecruiter />

  return <HeaderApplicant />
}

export default Header;