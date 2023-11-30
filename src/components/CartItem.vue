<script setup lang="ts">
import Card from 'primevue/card';
import Button from 'primevue/button'

defineProps({
    item: {
        type: Object,
        required: true,
    }
})
import { ref } from 'vue';


</script>

<template>
    <div class="card flex align-items-center justify-content-center">
        <Card style="width: 25em">

            <template #header>
                <p v-html="item?.title"></p>
                <img :src="item?.image" class="custom-image" alt="Image" />
            </template>
            <template #content>
                <p class="m-0" v-html="item?.desc" />
            </template>
            <template #footer>
                <p v-html="item?.desc" />
            </template>
            <template #category>
                {{ item?.category }}
            </template>

        </Card>
    </div>
</template>

<style>
.custom-image {
    width: 390px;
    height: 200px;
    object-fit: cover;
}
</style>

<!-- const newContent = ref({
    count: 0 as any,
    price: 0 as any,
    category: "" as any,
    desc: "" as any,
    id: Date.now().toString(),
    author: '' as any,
    image: '' as any
  }) -->