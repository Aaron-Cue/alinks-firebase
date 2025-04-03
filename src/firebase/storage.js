import app from './config.js'
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  getBytes
} from 'firebase/storage'

const storage = getStorage(app)
