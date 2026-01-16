import { Link } from "wouter";
import { ASSETS, ENV } from "@app/constants";
import { Typography } from "@app/components/ui/typography";

const AppTitle = () => {
  return (
    <Typography.H4>
      <Link href="/" className="inline-flex">
        <img src={ASSETS.APP} alt="App Logo" className="w-8 h-8 mr-2" />
        {ENV.APP_NAME}
      </Link>
    </Typography.H4>
  );
};

export default AppTitle;
