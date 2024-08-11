import { createSlice } from "@reduxjs/toolkit";
import { ICandidate } from "@app/@types/candidate.types";
import { applicantApi } from ".";
import { applicantResumeApi } from "../applicantResume";

const CANDIDATE_TOKEN = "candidate_token";

const initialState = (): Partial<ICandidate> => {
  return {
    creation_date: undefined,
    email: undefined,
    id: undefined,
    modification_date: undefined,
    name: undefined,
    password: undefined,
    birth_date: undefined,
    direction: undefined,
    token: localStorage.getItem(CANDIDATE_TOKEN) ?? undefined,
  };
};

function resetApplicant(applicant: ICandidate) {
  applicant.creation_date = undefined;
  applicant.email = undefined;
  applicant.id = undefined;
  applicant.modification_date = undefined;
  applicant.name = undefined;
  applicant.password = undefined;
  applicant.token = undefined;
  localStorage.removeItem(CANDIDATE_TOKEN);
}

export const applicantSlice = createSlice({
  name: "applicantSlide",
  initialState: initialState(),
  reducers: {
    RESET_APPLICANT: resetApplicant,
  },
  extraReducers(builder) {
    builder.addMatcher(
      applicantApi.endpoints.createApplicant.matchFulfilled,
      (state, action) => {
        state = action.payload;
        localStorage.setItem(CANDIDATE_TOKEN, state.token as string);
      }
    );

    builder.addMatcher(
      applicantApi.endpoints.signinApplicant.matchFulfilled,
      (state, action) => {
        const { creation_date, email, id, modification_date, name, token } =
          action.payload;
        state.creation_date = creation_date;
        state.email = email;
        state.id = id;
        state.modification_date = modification_date;
        state.name = name;
        state.token = token;
        localStorage.setItem(CANDIDATE_TOKEN, state.token as string);
      }
    );

    builder.addMatcher(
      applicantApi.endpoints.getApplicant.matchFulfilled,
      (state, action) => {
        const { creation_date, email, id, modification_date, name } =
          action.payload;
        state.creation_date = creation_date;
        state.email = email;
        state.id = id;
        state.modification_date = modification_date;
        state.name = name;
      }
    );

    builder.addMatcher(
      applicantApi.endpoints.getApplicant.matchRejected,
      (state) => {
        resetApplicant(state);
      }
    );

    builder.addMatcher(
      applicantResumeApi.endpoints.getResumeById.matchFulfilled,
      (state, action) => {
        const { birth_date, direction, identification, modification_date, name, phone_number } = action.payload.applicant
        state.birth_date = birth_date
        state.direction = direction
        state.identification = identification
        state.modification_date = modification_date
        state.name = name
        state.phone_number = phone_number
      }
    )
  },
});

export const { RESET_APPLICANT } = applicantSlice.actions;
