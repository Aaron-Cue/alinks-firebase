/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_APIKEY: string
  readonly VITE_APP_AUTHDOMAIN: string
  readonly VITE_APP_PROJECT_ID: string
  readonly VITE_APP_STORAGE_BUCKET: string
  readonly VITE_APP_MESSAGING_SENDERID: string
  readonly VITE_APP_APPID: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
