
export type TAuthContext = {
  isAuth: boolean;
  isLoading: boolean;
  userType?: 'applicant' | 'recruiter' | 'admin';
  token?: string;
}

export type TAuthAction =
| { type: 'SET_LOADING' }
| { type: 'SET_AUTH', payload: { isAuth: boolean, userType: TAuthContext['userType'] } }
| { type: 'SET_TOKEN', payload: string }
| { type: 'REMOVE_TOKEN' };
