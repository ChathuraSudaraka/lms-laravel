<script setup>
import { defineProps, defineEmits } from 'vue';
import Tag from 'primevue/tag';
import Button from 'primevue/button';
import { isAdmin } from '@/Utils/IsAdmin';
import { isStudent } from '@/Utils/IsStudent';
import { router } from '@inertiajs/vue3';

const props = defineProps({
    lesson: {
        type: Object,
        required: true
    }
});

const emit = defineEmits(['edit', 'delete']);

const handleClick = (event) => {
    // Don't navigate if clicking on action buttons
    if (event.target.closest('.action-buttons')) {
        return;
    }
    
    router.visit(route('console.lessons.view', { id: props.lesson.id }));
};

// Add computed for gradient overlay
const gradientOverlay = 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.1) 100%)';
</script>

<template>
    <div 
        class="bg-white rounded-xl shadow-sm border border-gray-100 p-3 hover:shadow-lg transition-all duration-300 group cursor-pointer" 
        @click="handleClick"
    >
        <div class="aspect-video mb-3 rounded-lg overflow-hidden bg-gray-100 relative group-hover:ring-2 ring-primary-100">
            <!-- Enhanced thumbnail container -->
            <div class="w-full h-full relative">
                <img 
                    :src="lesson.thumbnail" 
                    :alt="lesson.title" 
                    class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                >
                <!-- Gradient overlay -->
                <div 
                    class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    :style="{ background: gradientOverlay }"
                />
            </div>

            <!-- Enhanced play button overlay -->
            <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div class="relative">
                    <!-- Outer circle -->
                    <div class="absolute inset-0 bg-white/30 rounded-full animate-ping" />
                    <!-- Play button with solid icon -->
                    <Button 
                        icon="pi pi-play-fill" 
                        rounded 
                        text
                        class="bg-white hover:bg-primary-50 p-3 transform hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl relative z-10"
                        v-tooltip.top="'Watch Lesson'"
                    >
                        <template #icon>
                            <i class="pi pi-play text-lg" style="font-weight: 900;" />
                        </template>
                    </Button>
                </div>
            </div>

            <!-- Duration badge if available -->
            <div 
                v-if="lesson.duration"
                class="absolute bottom-2 right-2 bg-black/70 px-2 py-1 rounded text-xs text-white font-medium"
            >
                {{ lesson.duration }}
            </div>
        </div>
        <div class="space-y-3 px-1">
            <div>
                <h3 class="font-semibold text-gray-800 line-clamp-2 text-base md:text-lg mb-1 group-hover:text-primary-600">
                    {{ lesson.title }}
                </h3>
                <p class="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                    {{ lesson.description }}
                </p>
            </div>
            <div class="flex flex-wrap items-center gap-1.5">
                <Tag 
                    :value="'Grade ' + lesson.grade" 
                    severity="info" 
                    class="text-xs"
                />
                <Tag 
                    v-for="tag in lesson.tags" 
                    :key="tag" 
                    :value="tag"
                    severity="secondary"
                    class="text-xs"
                />
            </div>
            <div class="flex justify-between items-center pt-2 border-t border-gray-50">
                <span class="text-xs text-gray-500">{{ lesson.createdAt }}</span>
                <div class="flex gap-2 action-buttons" v-if="!isStudent()">
                    <Button 
                        icon="pi pi-pencil" 
                        text 
                        rounded 
                        aria-label="Edit"
                        class="p-button-sm"
                        @click="emit('edit', lesson)"
                    />
                    <Button 
                        v-if="isAdmin()"
                        icon="pi pi-trash" 
                        text 
                        rounded 
                        severity="danger"
                        aria-label="Delete"
                        class="p-button-sm"
                        @click="emit('delete', lesson)"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.p-tag {
    padding: 0.15rem 0.5rem;
}

/* Add smooth transition for image zoom */
.aspect-video {
    overflow: hidden;
}

/* Custom animation for play button ping effect */
@keyframes custom-ping {
    75%, 100% {
        transform: scale(1.5);
        opacity: 0;
    }
}

.animate-ping {
    animation: custom-ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
}

/* Enhance button hover effect */
.p-button.p-button-rounded.p-button-text:hover {
    background: rgba(255, 255, 255, 0.95) !important;
    transform: scale(1.1);
}

/* Add hover effect for the entire card */
.group:hover .aspect-video {
    box-shadow: 0 0 0 2px var(--primary-color);
}

/* Enhance play button icon */
.pi-play {
    margin-left: 2px; /* Slight adjustment for visual centering */
}

/* Make play button more prominent on hover */
.p-button.p-button-rounded.p-button-text:hover .pi-play {
    color: var(--primary-color);
}
</style>
