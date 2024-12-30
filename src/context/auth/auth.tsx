import Cookies from "js-cookie";
import { useReducer } from "react";
import { TAuthAction, TAuthContext } from "@app/@types/auth";
import { AuthContext } from "./auth.context";

const authReducer = (state: TAuthContext, action: TAuthAction): TAuthContext => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: true };
    case 'SET_AUTH':
      return { ...state, isAuth: action.payload.isAuth, userType: action.payload.userType, isLoading: false };
    case 'SET_TOKEN':
      return { ...state, isLoading: true };
    case 'REMOVE_TOKEN':
      return { ...state, isAuth: false, userType: undefined, isLoading: false };
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
  
  return (
    <AuthContext.Provider value={[state, dispatch]}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
