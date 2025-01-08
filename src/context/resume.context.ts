import { createContext, useContext } from "react";

type TResumeContext = {
  refresh: () => Promise<any>;
}

export const ResumeContext = createContext<TResumeContext>({
  refresh: () => Promise.resolve(),
})

export const useResumeContext = () => {
  const ctx = useContext(ResumeContext);
  return ctx;
}
