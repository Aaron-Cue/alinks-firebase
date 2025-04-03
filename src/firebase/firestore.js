import app from './config.js'
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  query,
  where,
  setDoc,
  deleteDoc
} from 'firebase/firestore'

const db = getFirestore(app)
