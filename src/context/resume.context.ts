import { createContext, useContext } from "react";
import { TResume } from "@app/@types/resume";

type TResumeContext = {
  refresh: () => Promise<any>;
  resume_id: number;
  resume?: TResume
}

export const ResumeContext = createContext<TResumeContext>({
  refresh: () => Promise.resolve(),
  resume_id: 0,
  resume: undefined,
})

export const useResumeContext = () => {
  const ctx = useContext(ResumeContext);
  return ctx;
}
