import { RootState } from "@app/store";

export const selectCurrentResume = (state: RootState) => 
  state.applicantResumeSlice.currentResume;

export const selectResumeId = (state: RootState) => 
  state.applicantResumeSlice.currentResume?.id;

export const selectResumeTitle = (state: RootState) => 
  state.applicantResumeSlice.currentResume?.title;

export const selectResumeAboutMe = (state: RootState) => 
  state.applicantResumeSlice.currentResume?.about_me;

export const selectResumeModificationDate = (state: RootState) => 
  state.applicantResumeSlice.currentResume?.modification_date;

export const selectResumeExperiences = (state: RootState) => 
  state.applicantResumeSlice.currentResume?.experiences;

export const selectResumeEducations = (state: RootState) => 
  state.applicantResumeSlice.currentResume?.educations;

export const selectResumePersonalReferences = (state: RootState) => 
  state.applicantResumeSlice.currentResume?.personal_references;

export const selectResumeLaboralReferences = (state: RootState) => 
  state.applicantResumeSlice.currentResume?.laboral_references;

export const selectResumeLanguages = (state: RootState) => 
  state.applicantResumeSlice.currentResume?.languages;

export const selectResumeSkills = (state: RootState) => 
  state.applicantResumeSlice.currentResume?.skills;

export const selectResumeApplicant = (state: RootState) => 
  state.applicantResumeSlice.currentResume?.applicant;