<template>
    <div class="card flex justify-content-center">
        <Button label="Добавити карточку" icon="pi pi-id-card" @click="visible = true"></button>
        <Dialog v-model:visible="visible" modal header="Header" :style="{ width: '50rem' }"
            :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
            <div class="card">
                <Editor v-model="newContent.desc" editorStyle="height: 153px" />
                <Button label="sub_red" @click=""></Button>
            </div>
            <div class="flex-auto">
                <label for="stacked-buttons" class="font-bold block mb-2"> Стоймость: </label>
                <InputNumber v-model="value1" inputId="stacked-buttons" showButtons mode="currency" currency="KZT" />
            </div>
        </Dialog>
    </div>
</template>
<script setup lang="ts">
const value1 = ref(20);
import { useContent } from '@/composables/useContent';
import Button from 'primevue/button';
import InputNumber from 'primevue/inputnumber';
import Dialog from 'primevue/dialog';
import Editor from 'primevue/editor';
import { ref } from "vue";
const visible = ref(false);
const value = ref('');
const { newContent } = useContent()
</script>
<style></style>