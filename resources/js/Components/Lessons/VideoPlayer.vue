<script setup>
import { ref } from 'vue';
import Button from 'primevue/button';

const props = defineProps({
    youtubeId: {
        type: String,
        required: true
    }
});

const getYouTubeEmbedUrl = (videoId) => {
    return `https://www.youtube.com/embed/${videoId}`;
};
</script>

<template>
    <div class="relative group bg-gray-900 rounded-t-lg overflow-hidden">
        <div class="aspect-video relative">
            <iframe 
                :src="getYouTubeEmbedUrl(youtubeId)"
                class="w-full h-full"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
            ></iframe>
        </div>
    </div>
</template>

<style scoped lang="scss">
.group:hover {
    .opacity-0 {
        opacity: 1;
    }
}

:deep(.p-slider) {
    .p-slider-handle {
        background: white;
        border: 2px solid var(--primary-500);
        
        &:hover {
            background: var(--primary-50);
        }
    }
    
    .p-slider-range {
        background: var(--primary-500);
    }
}

:deep(.p-button.p-button-rounded) {
    width: 2.5rem;
    height: 2.5rem;
    
    &.p-button-large {
        width: 4rem;
        height: 4rem;
    }
}

// Fullscreen styles
:fullscreen {
    .video-container {
        width: 100vw;
        height: 100vh;
    }
}
</style>
