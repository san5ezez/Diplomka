<template>
    <div class="accaunt">
        <template v-for="accaunt in contentList">
            <CartItem :item="accaunt" />
        </template>
    </div>
</template>
<script setup lang="ts">
import CartItem from './CartItem.vue';
import { useContent } from '../composables/useContent'
import { onMounted } from 'vue'


const { contentList, getAllContent } = useContent()

onMounted(() => { getAllContent() })

</script>
<style>
.butmusic {
    background-color: rgb(14, 117, 4);
    color: white;
    padding: 1.5px;
    margin-left: 5.5px;
}

.accaunt {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 1rem;
}
</style>