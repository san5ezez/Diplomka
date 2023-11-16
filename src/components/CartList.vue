<template>
    <div class="accaunt">
        <CartItem></CartItem>
        <CartItem></CartItem>
        <CartItem></CartItem>
        <CartItem></CartItem>
        <CartItem></CartItem>


    </div>
</template>
<script setup lang="ts">
import CartItem from './CartItem.vue';
</script>
<style>
.accaunt {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 1rem;
}
</style>