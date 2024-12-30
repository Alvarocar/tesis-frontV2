import Cookies from "js-cookie";
import { useEffect, useReducer } from "react";
import { TAuthAction, TAuthContext } from "@app/@types/auth";
import { AuthContext } from "./auth.context";
import { decodeToken } from "@app/util/token";

const authReducer = (state: TAuthContext, action: TAuthAction): TAuthContext => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: true };
    case 'SET_AUTH':
      return { ...state, isAuth: action.payload.isAuth, userType: action.payload.userType, isLoading: false };
    case 'SET_TOKEN':
      return { ...state ,isLoading: true, token: action.payload };
    case 'REMOVE_TOKEN':
      return { ...state, isAuth: false, userType: undefined, isLoading: false, token: undefined };
    default:
      return state;
  }
};

const initialState = {
  isLoading: true,
  isAuth: false,
  userType: undefined,
  token: Cookies.get('token')
}

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  
  useEffect(() => {
    const checkAuth = () => {
      if (!state.token) {
        return dispatch({
          type: "SET_AUTH",
          payload: { isAuth: false, userType: undefined },
        });
      }

      const tokenData = decodeToken(state.token);
      if (tokenData && tokenData.exp > Date.now() / 1000) {
        dispatch({
          type: "SET_AUTH",
          payload: { isAuth: true, userType: tokenData.userType || undefined },
        });
      } else {
        dispatch({
          type: "SET_AUTH",
          payload: { isAuth: false, userType: undefined },
        });
      }
    };
    checkAuth();
  }, [dispatch, state.token]);

  return (
    <AuthContext.Provider value={[state, dispatch]}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
