<script setup lang="ts">
import Card from 'primevue/card';
import Button from 'primevue/button'
</script>

<template>
    <div class="card flex align-items-center justify-content-center">
        <Card style="width: 25em">
            <template #header>
                <img alt="user header" src=".//peidge.jpg" />
            </template>
            <template #title> Chat GPT </template>
            <template #content>
                <p class="m-0">
                    ChatGPT — чат-бот с искусственным интеллектом, разработанный компанией OpenAI и способный работать в
                    диалоговом режиме, поддерживающий запросы на естественных языках. Система способна отвечать на вопросы,
                    генерировать тексты на разных языках, включая русский, относящиеся к различным предметным областям.
                </p>
            </template>
            <template #footer>
                <!-- <Button icon="pi pi-check" label="Save" />
                <Button icon="pi pi-times" label="Cancel" severity="secondary" style="margin-left: 0.5em" /> -->
            </template>
        </Card>
    </div>
</template>

<style></style>