import { api } from "./axios";

const prefix = "v1/applicants";

const SIGN_UP = (payload: any) => {
  return api.post(`${prefix}/sign-up`, payload);
};

export const APPLICANT_API = {
  SIGN_UP,
};
