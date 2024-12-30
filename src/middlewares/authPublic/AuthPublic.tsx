import { Redirect } from "wouter";
import React, { useEffect } from "react"; 
import { useAuth } from "@app/hooks/useAuth.hook";
import { TMiddlewareComponent } from "@app/@types/middleware";
import { DotsLoader } from "@app/modules/common/loader/dotsLoader";

const AuthPublic: TMiddlewareComponent = ({ children,...rest }) => {
  
  const { userType, checkAuth, isLoading, isAuth } = useAuth();

  useEffect(() => {
    if (userType) return;
    checkAuth();
  }, [userType, checkAuth])

  if (isLoading) return <DotsLoader />

  if (isAuth) return <Redirect to='/' />

  return React.cloneElement(children, rest);
}

export default AuthPublic;