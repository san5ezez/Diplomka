<template>
    <div>
        <p-button v-if="!user" @click="googleRegister" label="Войти" icon="pi pi-sign-in" class="login" />
        <p-button v-else @click="googleLogout" label="Выйти" icon="pi pi-sign-out" class="unlogin" />
        <div class="card flex justify-content-center">
            <Button label="Карзина" icon="pi pi-shopping-cart" @click="visible = true" />
            <Dialog v-model:visible="visible" maximizable modal header="Карзина:" :style="{ width: '50rem' }"
                :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
                <template v-for="accaunt in contentList">
                    <CartItem :item="accaunt" />
                </template>
            </Dialog>
        </div>
    </div>
</template>

<script setup lang="ts">
import CartItem from '../components/CartItem.vue'
import Dialog from 'primevue/dialog';
import Button from 'primevue/button'
import PButton from 'primevue/button'
import { useUser } from '../composables/useUser'
const { user, googleRegister, googleLogout } = useUser()
import { ref } from "vue";
import { useContent } from '../composables/useContent'
import { onMounted } from 'vue'

const { contentList, getAllContent } = useContent()

onMounted(() => { getAllContent() })

const visible = ref(false);
</script>
<style>
.login {
    display: flex;
}
</style>