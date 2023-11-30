<template>
    <div class="card flex justify-content-center">
        <Button label="Добавити карточку" icon="pi pi-id-card" @click="visible = true"></button>
        <Dialog v-model:visible="visible" modal header="Добавление карточки" :style="{ width: '50rem' }"
            :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
            <!-- <div class="Inputtextdd">
                <InputText type="text" v-model="newContent.category" />
            </div> -->
            <div class="card">
                <Editor v-model="newContent.desc" editorStyle="height: 153px" />
            </div>
            <div class="flex-auto">
                <label for="stacked-buttons" class="font-bold block mb-2"> Стоймость: </label>
                <InputNumber v-model="newContent.price" inputId="stacked-buttons" showButtons mode="currency"
                    currency="KZT" />
            </div>
            <form class="inputwrapper" enctype="multipart/form-data">
                <input id="inputfile" class="input inputfile" name="images" type="file" accept=".jpg, .png"
                    @input="onUpload($event)" />
                <label for="inputfile" class="inputfile-button">
                    <span class="inputfile-icon-wrapper">
                        <img class="inputfile-icon" src="../assets/uploadImage.png" alt="Выбрать файл" width="25" />
                    </span>
                    <span class="inputfile-button-text"> Загрузи картинку</span>
                </label>
            </form>
            <Button label="Создать" @click="addContent"></Button>
        </Dialog>
    </div>
</template>
<script setup lang="ts">
import { useContent } from '@/composables/useContent';
import Button from 'primevue/button';
import { ref } from "vue";
import InputNumber from 'primevue/inputnumber';
import Dialog from 'primevue/dialog';
import Editor from 'primevue/editor';
import { newContent } from '@/composables/useContent';
import { addContent } from '@/composables/useContent';
const { newContent, addContent, uploadImage } = useContent()
const visible = ref(false);

async function onUpload(e) {
    const image = e.target.files[0]
    await uploadImage(image)
};

</script>

<style scoped>
.input__wrapper {
    width: 100%;
    position: relative;
    margin: 15px;
    text-align: center;
}



.inputfile {
    opacity: 0;
    visibility: hidden;
    position: absolute;
}

.Inputtextdd {
    padding: 10px;
}
</style> 