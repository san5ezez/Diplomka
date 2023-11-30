<script setup lang="ts">
import { RouterView } from 'vue-router';
import NavbarComponent from '@/components/layouts/NavbarComponent.vue';
import { useUser } from './composables/useUser';
import { onMounted } from 'vue';
import { Howl, Howler } from 'howler';
import { ref } from "vue";
const isPlaying = ref(false);
const audioFile = ref('https://muzfa.net/mp3/files/interworld-metamorphosis-mp3.mp3');
const audio = ref(null);

const sound = new Howl({
  src: [audioFile.value],
  onend: () => {
    isPlaying.value = false;
  },
});

const togglePlay = () => {
  if (isPlaying.value) {
    sound.pause();
  } else {
    sound.play();
  }
  isPlaying.value = !isPlaying.value;
};

// Обновление файла в ответ на изменение атрибута src
const updateAudioFile = () => {
  sound.unload(); // Очистка предыдущего звука
  sound.load({ src: [audioFile.value] });
};


onMounted(() => {
  getUserFromLocalStorage();
});

const { user, getUserFromLocalStorage } = useUser();


</script>

<template>
  <template v-if="user?.status === 'admin'">
    <AdminPanel />
  </template>

  <NavbarComponent />
  <div>
    <button class="butmusic" @click="togglePlay">{{ isPlaying ? 'Pause' : 'Play' }}></button>
    <audio ref="audio" :src="audioFile" preload="auto"></audio>
  </div>
  <RouterView />
</template>

<style scoped></style>
