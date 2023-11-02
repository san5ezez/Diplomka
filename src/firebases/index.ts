import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: 'AIzaSyBbN0Z_LrqKBg__7--QlS46UHUq1F4zn-Y',
  authDomain: 'diploma-46b46.firebaseapp.com',
  projectId: 'diploma-46b46',
  storageBucket: 'diploma-46b46.appspot.com',
  messagingSenderId: '392626291560',
  appId: '1:392626291560:web:3d4c7b27e5af4f61f3ccdd'
}

const app = initializeApp(firebaseConfig)

const db = getFirestore(app)
const storage = getStorage(app)

export { db, storage }
