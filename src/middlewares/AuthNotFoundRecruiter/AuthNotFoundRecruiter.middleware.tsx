import React from "react";
import { useAuth } from "@app/hooks/useAuth.hook";
import { NotFound } from "@app/modules/common/error/NotFound";
import { DotsLoader } from "@app/modules/common/loader/dotsLoader";
import { TMiddlewareComponent } from "@app/@types/middleware";

const AuthNotFoundRecruiter: TMiddlewareComponent = ({ children, ...rest }) => {
  const { isLoading, userType } = useAuth();

  if (isLoading) return <DotsLoader />

  if (userType !== 'recruiter') return <NotFound />

  return React.cloneElement(children, rest);
}

export default AuthNotFoundRecruiter;
