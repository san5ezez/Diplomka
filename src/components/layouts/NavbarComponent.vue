<template>
  <div class="side">
    <div class="container">
      <div class="card">
        <TabMenu v-model:activeIndex="active" :model="items">
          <template #item="{ label, item, props }">
            <router-link v-if="item.route" v-slot="routerProps" :to="item.route" custom>
              <a :href="routerProps.href" v-bind="props.action" @click="($event) => routerProps.navigate($event)">
                <span v-bind="props.icon"></span>
                <span v-bind="props.label">{{ label }}</span>
              </a>
            </router-link>
          </template>
        </TabMenu>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button'
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { ref, onMounted } from 'vue'
import TabMenu from 'primevue/tabmenu'
import Sidebar from 'primevue/sidebar'
import InputMask from 'primevue/inputmask'
import InputText from 'primevue/inputtext'
import Image from 'primevue/image'
import { useRouter, useRoute } from 'vue-router'
import Dialog from 'primevue/dialog'
import Dropdown from 'primevue/dropdown'
import InputNumber from 'primevue/inputnumber'
import Calendar from 'primevue/calendar'
import ColorPicker from 'primevue/colorpicker'
import RadioButton from 'primevue/radiobutton'
import Slider from 'primevue/slider'
import FileUpload from 'primevue/fileupload'
import PButton from 'primevue/button'
import { useUser } from '@/composables/useUser'



const active = ref(0)
const items = ref([
  {
    label: 'Товары',
    icon: 'pi pi-fw pi-home',
    route: '/',
  },
  // {
  //   label: 'Редоктировать',
  //   icon: 'pi pi-fw pi-pencil',
  //   route: '/table',
  // },
  {
    label: 'Профель',
    icon: 'pi pi-fw pi-id-card',
    route: '/profile',
  },
  {
    label: 'Админ-панель',
    icon: 'pi pi-fw pi-id-card',
    route: '/Admin-panel',
  },
  // {
  //   label: '',
  //   icon: 'pi pi-shopping-cart',
  //   route: '/cart',
  // },
])


</script>

<style scoped>
.btn {
  color: black;
  width: 170px;
  padding: 12px 15px;
  background: white;
  color: rgb(83, 111, 111);
  border: 1px solid rgb(83, 111, 111);
}

* {}

.container {
  padding: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
}

.center-content {
  text-align: center;
}

.side_btn {
  color: black;
  width: 170px;
  margin-bottom: 10px;
  padding: 10px 15px;
  background: none;
  color: rgb(83, 111, 111);
  border: 1px solid rgb(83, 111, 111);
}

.side_bar {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
}

.side {
  background-color: white;
}

.custom-button {
  color: black;
  width: 170px;
  margin-bottom: 10px;
  margin-top: 10px;
  padding: 10px 15px;
  background: none;
  color: rgb(255, 255, 255);
  border: 1px solid rgb(83, 111, 111);
}

:deep(p-tabmenu p-component) {
  display: flex;
}

:deep(.p-menuitem-text) {
  margin-right: 100px;
  font-size: 20px;

}
</style>
