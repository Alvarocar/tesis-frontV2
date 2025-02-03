import { useLocation } from "wouter"

export const useRedirect = () => {
  const [,setLocation] = useLocation();

  const redirect = (path: string) => {
    setLocation(path);
  }

  return { redirect }
}