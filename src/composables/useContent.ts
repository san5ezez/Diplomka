import {
  getDocs,
  addDoc,
  doc,
  collection,
  type DocumentData,
  deleteDoc,
  updateDoc
} from 'firebase/firestore'
import { db } from '@/firebases'
import { ref, computed } from 'vue'
import { useUser } from './useUser'
import * as firebase from 'firebase/storage'
import { getStorage, uploadBytes } from 'firebase/storage'

export const useContent = () => {
  const content = ref()
  const contentList = ref([] as DocumentData)
  const newContent = ref({
    count: 0 as any,
    price: 0 as any,
    category: "" as any,
    desc: "" as any,
    id: Date.now().toString(),
    author: '' as any,
    image: '' as any
  })

  // const yourDatabase = 'contentAdil'
  const yourDatabase = 'contentSasha'
  // const yourDatabase = 'contentBekzhan'

  const loading = ref({
    content: false,
    contentList: false,
    newContent: false
  })

  async function getAllContent() {
    loading.value.contentList = true
    contentList.value.length = 0
    try {
      const querySnapshot = await getDocs(collection(db, yourDatabase))
      querySnapshot.forEach((doc) => {
        const compressive = {
          firebaseId: doc.id,
          ...doc.data()
        }
        contentList.value.push(compressive)
      })
      loading.value.contentList = false
    } catch (error) {
      console.error(error)
    }
  }

  async function getContentById(id: string) {
    loading.value.content = true
    try {
      const querySnapshot = await getDocs(collection(db, yourDatabase))
      content.value = querySnapshot.docs
        .map((doc) => doc.data())
        .find((item: any) => item.id === id)
      loading.value.content = false
    } catch (error) {
      console.error(error)
    }
  }

  async function addContent() {
    const { userToObject } = useUser()
    loading.value.newContent = true
    try {
      if (newContent.value && userToObject.value) {
        newContent.value.author = userToObject.value
        await addDoc(collection(db, yourDatabase), newContent.value)
        loading.value.newContent = false
      }
    } catch (error) {
      console.error(error)
    }
  }

  async function deleteDocById(firebaseId: string) {
    loading.value.content = true
    try {
      await deleteDoc(doc(db, yourDatabase, firebaseId))
      loading.value.content = false
    } catch (error) {
      console.error(error)
    }
  }

  async function uploadImage(file: any) {
    console.log(file)
    const storage = getStorage()
    console.log(storage)
    const storageRef = firebase.ref(storage, 'hobbies/' + file.name)
    console.log(storageRef)

    uploadBytes(storageRef, file)
      .then(() => {
        console.log('Файл успешно загружен!')

        firebase
          .getDownloadURL(storageRef)
          .then((downloadURL) => {
            newContent.value.image = downloadURL
          })
          .catch((error) => {
            console.error('Ошибка получения ссылки на загруженный файл:', error)
          })
      })
      .catch((error) => {
        console.error('Ошибка загрузки файла:', error)
      })
  }

  // async function updateDocById(firebaseId:any) {
  //   loading.value.content = true
  //   try {
  //     await updateDoc(doc(db, 'content', firebaseId), editContent.value)
  //     console.log(editContent.value)
  //     loading.value.content = false
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }

  async function load() {
    await getAllContent()
  }

  return {
    content,
    contentList,
    loading,
    newContent,
    getAllContent,
    getContentById,
    addContent,
    deleteDocById
    // updateDocById
  }
}
