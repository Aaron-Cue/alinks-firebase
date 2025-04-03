import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_APIKEY,
  authDomain: import.meta.env.VITE_APP_AUTHDOMAIN,
  projectId: import.meta.env.VITE_APP_PROJECT_ID,
  storageBucket: import.meta.env.VITE_APP_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_APP_MESSAGING_SENDERID,
  appId: import.meta.env.VITE_APP_APPID
}

const app = initializeApp(firebaseConfig)

export default app



