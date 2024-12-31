import React from "react";
import { Redirect } from "wouter";
import { useAuth } from "@app/hooks/useAuth.hook";
import { DotsLoader } from "@app/modules/common/loader/dotsLoader";
import { TMiddlewareComponent } from "@app/@types/middleware";

const AuthPublicApplicant: TMiddlewareComponent = ({ children, ...rest }) => {
  const { isLoading, isAuth } = useAuth();

  if (isLoading) return <DotsLoader />

  if (isAuth) return <Redirect to='/' />

  return React.cloneElement(children, rest);
}

export default AuthPublicApplicant;
