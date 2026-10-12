import { Link } from "wouter";
import { ASSETS, ENV } from "@app/constants";
import { Typography } from "@app/components/ui/typography";

const AppTitle = () => {
  return (
    <Link
      href="/"
      aria-label={`${ENV.APP_NAME} - Ir al inicio`}
      className="inline-flex items-center gap-2 text-foreground hover:text-foreground"
    >
      <img src={ASSETS.APP} alt="" className="h-8 w-8" />
      <Typography.H4 as="span" className="m-0">
        {ENV.APP_NAME}
      </Typography.H4>
    </Link>
  );
};

export default AppTitle;
