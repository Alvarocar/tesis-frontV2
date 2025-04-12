/// <reference types="vite/client" />

declare global {
  namespace NodeJS {
    interface ImportMeta {
      TESIS_HOST_API: string;
      TESIS_APP_NAME: string;
    }
  }
}