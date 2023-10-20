import { collection, getDocs, addDoc, getDoc, doc, setDoc } from 'firebase/firestore'
import { db } from '@/firebase'
import { watch } from 'vue'
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { user, loading, newUserToObject, userList } from './useUser'

export const useUser = () => {
  const auth = getAuth()

  // войти с помощью окна гугл
  function googleRegister() {
    const provider = new GoogleAuthProvider()

    signInWithPopup(auth, provider)
      .then(async (userCredential) => {
        user.value = userCredential.user

        await addUserToMainDatabase()
        await getFromMainDatabase()
      })
      .catch((error) => {
        console.error(error)
      })
  }

  async function addUserToMainDatabase() {
    loading.value.user = true
    try {
      if (newUserToObject.value) {
        await getAllUsers()
        if (!checkUserInDatabase()) {
          await addDoc(collection(db, 'users'), newUserToObject.value)
        } else {
          console.error('User already in database')
        }
      }
      loading.value.user = false
    } catch (error) {
      console.error(error)
    }
  }

  async function getAllUsers() {
    loading.value.userList = true
    try {
      const querySnapshot = await getDocs(collection(db, 'users'))
      querySnapshot.forEach((doc) => {
        userList.value.push(doc.data())
      })
      loading.value.userList = false
    } catch (error) {
      console.error(error)
    }
  }

  function checkUserInDatabase() {
    return userList.value.some((item: any) => item.uid === newUserToObject.value?.uid)
  }

  async function getFromMainDatabase() {
    await getAllUsers()
    user.value = userList.value.find((item: any) => item.uid === user.value?.uid)
  }

  async function updateUserInDatabase() {
    if (user.value) {
      try {
        const userDocRef = doc(db, 'users', user.value.uid)
        const existingUserDoc = await getDoc(userDocRef)
        if (existingUserDoc.exists()) {
          const userData = existingUserDoc.data()
          const updatedData = {
            ...userData,
            ...user.value
          }
          await setDoc(userDocRef, updatedData)
        }
      } catch (error) {
        console.error(error)
      }
    }
  }

  function googleLogout() {
    auth.signOut()
    user.value = null
  }

  // это надо не всем
  // для постоянной связи сервиса с базой данных
  watch(user.value, async (newValue) => {
    if (newValue) {
      await updateUserInDatabase()
    }
  })

  return {
    user,
    loading,
    googleRegister,
    googleLogout,
    getAllUsers,
    newUserToObject,
    userList
  }
}
