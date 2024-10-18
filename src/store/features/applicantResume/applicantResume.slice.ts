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
    builder.addMatcher(applicantResumeApi.endpoints.patchEducation.matchFulfilled, (state, action) => {
      if (!state.currentResume) return
      state.currentResume.educations = action.payload
    })
    builder.addMatcher(applicantResumeApi.endpoints.patchExperience.matchFulfilled, (state, action) => {
      if (!state.currentResume) return
      state.currentResume.experiences = action.payload
    })
    builder.addMatcher(applicantResumeApi.endpoints.patchLanguages.matchFulfilled, (state, action) => {
      if (!state.currentResume) return
      state.currentResume.languages = action.payload
    })
    builder.addMatcher(applicantResumeApi.endpoints.patchSkill.matchFulfilled, (state, action) => {
      if (!state.currentResume) return
      state.currentResume.skills = action.payload
    })
  }
})
