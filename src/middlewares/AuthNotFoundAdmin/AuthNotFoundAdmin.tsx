import React from "react";
import { useAuth } from "@app/hooks/useAuth.hook";
import { TMiddlewareComponent } from "@app/@types/middleware";
import { NotFound } from "@app/modules/common/error/NotFound";
import { DotsLoader } from "@app/modules/common/loader/dotsLoader";

const AuthNotFoundAdmin: TMiddlewareComponent = ({ children, ...rest }) => {
  const { isLoading, userType } = useAuth();

  if (isLoading) return <DotsLoader />;

  if (userType !== "admin") return <NotFound />;

  return React.cloneElement(children, rest);
}

export default AuthNotFoundAdmin;
