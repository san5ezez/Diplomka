import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { initializeApp } from 'firebase/app'

import PrimeVue from 'primevue/config'
import 'primevue/resources/themes/lara-dark-indigo/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'

const firebaseConfig = {
  apiKey: 'AIzaSyBbN0Z_LrqKBg__7--QlS46UHUq1F4zn-Y',
  authDomain: 'diploma-46b46.firebaseapp.com',
  projectId: 'diploma-46b46',
  storageBucket: 'diploma-46b46.appspot.com',
  messagingSenderId: '392626291560',
  appId: '1:392626291560:web:3d4c7b27e5af4f61f3ccdd'
}

initializeApp(firebaseConfig)
const app = createApp(App)

app.use(PrimeVue)
app.use(router)

app.mount('#app')
