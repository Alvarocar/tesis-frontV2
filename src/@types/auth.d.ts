
export type TAuthContext = {
  isAuth: boolean;
  isLoading: boolean;
  userType?: 'applicant' | 'employee' | 'admin';
  token?: string;
  reValidate: () => void;
}
