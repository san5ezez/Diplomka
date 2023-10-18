import { collection, getDocs, addDoc, type DocumentData } from 'firebase/firestore'
import { db, storage } from '@/firebase'
import { getStorage, uploadBytes, getDownloadURL } from 'firebase/storage'
import { ref, computed, watch } from 'vue'
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'

const user = ref()
const userList = ref([] as DocumentData)

const loading = ref({
  user: false,
  userList: false
})

const userRemake = computed(() => {
  if (user.value) {
    return {
      uid: user.value.uid
    }
  }
  return null
})

export const useUser = () => {
  const auth = getAuth()

  function googleRegister() {
    const provider = new GoogleAuthProvider()

    signInWithPopup(auth, provider)
      .then(async (userCredential) => {
        user.value = userCredential.user
        await addUserToMainDatabase()
        getFromMainDatabase()
      })
      .catch((error) => {
        console.error(error)
      })
  }

  async function addUserToMainDatabase() {
    loading.value.user = true
    try {
      if (userRemake.value) {
        await getAllUsers()
        if (!checkUserInDatabase()) {
          await addDoc(collection(db, 'users'), userRemake.value)
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
    return userList.value.some((item: any) => item.uid === userRemake.value?.uid)
  }

  function getFromMainDatabase() {
    await getAllUsers()
    user.value = userList.value.find((item: any) => item.uid === userRemake.value?.uid)
  }

  function updateUserInDatabase() {
    db.collection('users')
      .doc(user.value.uid)
      .update({
        ...user.value
      })
  }

  function googleLogout() {
    auth.signOut()
    user.value = null
  }

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
    userRemake,
    userList
  }
}
