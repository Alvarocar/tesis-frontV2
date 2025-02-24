import useSWR from "swr";
import resumeRepository from "@app/repositories/resume.repository";
import { useAuth } from "./useAuth.hook";

export const useGetResumes = () => {
  const { token } = useAuth()
  return useSWR(`/my-resumes/${token}`, resumeRepository.getMyResumes.bind(resumeRepository));
}