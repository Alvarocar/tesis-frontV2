import { toast as toastHook } from "@app/hooks/use-toast";

export const toast = {
  successful: (title?: string, description?: string) => {
   toastHook({
     title,
     description,
     className: 'border-x-0 border-t-0 border-b-2 border-green-300',
     variant: "default",
     duration: 1000,
   }) 
  },
  
  failed: (title?: string, description?: string) => {
   toastHook({
     title,
     description,
     variant: "destructive",
     duration: 1500,
   }) 
  }
}