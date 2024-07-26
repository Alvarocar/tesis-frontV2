import { RootState } from "@app/store";

export const selectCandidateToken = (state: RootState) =>
  state.applicantSlide.token;

export const selectCandidateName = (state: RootState) =>
  state.applicantSlide.name;
