import { RootState } from "@app/store";

export const selectCandidateToken = (state: RootState) =>
  state.applicantSlide.token;

export const selectCandidateName = (state: RootState) =>
  state.applicantSlide.name;

export const selectCandidateEmail = (state: RootState) =>
  state.applicantSlide.email

  export const selectCandidatePassword = (state: RootState) =>
  state.applicantSlide.password;

export const selectCandidateCreationDate = (state: RootState) =>
  state.applicantSlide.creation_date;

export const selectCandidateModificationDate = (state: RootState) =>
  state.applicantSlide.modification_date;

export const selectCandidateId = (state: RootState) =>
  state.applicantSlide.id;

  export const selectCandidateBirthDate = (state: RootState) =>
  state.applicantSlide.birth_date;

export const selectCandidateDirection = (state: RootState) =>
  state.applicantSlide.direction;

export const selectCandidateIdentification = (state: RootState) =>
  state.applicantSlide.identification;

export const selectCandidatePhoneNumber = (state: RootState) =>
  state.applicantSlide.phone_number;


export const selectCandidateDetails = (state: RootState) => ({
  name: state.applicantSlide.name,
  birthDate: state.applicantSlide.birth_date,
  direction: state.applicantSlide.direction,
  identification: state.applicantSlide.identification,
  phoneNumber: state.applicantSlide.phone_number,
  modificationDate: state.applicantSlide.modification_date,
});