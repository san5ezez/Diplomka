<script setup lang="ts">
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



</script>