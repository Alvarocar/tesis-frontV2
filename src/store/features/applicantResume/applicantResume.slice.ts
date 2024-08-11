import { createSlice } from "@reduxjs/toolkit";
import { applicantResumeApi } from ".";
import { IResumeDetail } from "@app/@types/resume.types";

interface IApplicantResumeSlice {
  currentResume?: IResumeDetail
}

const initialState: IApplicantResumeSlice = {
  currentResume: undefined,
}

export const applicantResumeSlice = createSlice({
  name: 'applicantResumeSlice',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addMatcher(applicantResumeApi.endpoints.getResumeById.matchFulfilled, (state, action) => {
      state.currentResume = action.payload
    })
    builder.addMatcher(applicantResumeApi.endpoints.patchAboutMe.matchFulfilled, (state, action) => {
      if (!state.currentResume) return
      state.currentResume.about_me = action.payload.about_me
    })
  }
})
