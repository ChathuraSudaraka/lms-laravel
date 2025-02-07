<script setup>
import { defineProps } from 'vue';
import Tag from 'primevue/tag';
import Button from 'primevue/button';

defineProps({
    lesson: {
        type: Object,
        required: true
    }
});
</script>

<template>
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-3 hover:shadow-lg transition-all duration-300 group">
        <div class="aspect-video mb-3 rounded-lg overflow-hidden bg-gray-100 relative group-hover:ring-2 ring-primary-100">
            <img :src="lesson.thumbnail" :alt="lesson.title" class="w-full h-full object-cover">
            <div class="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Button 
                    icon="pi pi-play" 
                    rounded 
                    text 
                    class="bg-white p-2 transform scale-90 hover:scale-100 transition-transform"
                />
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
                    :key="tag.code" 
                    :value="tag.name"
                    severity="secondary"
                    class="text-xs"
                />
            </div>
            <div class="flex justify-between items-center pt-2 border-t border-gray-50">
                <span class="text-xs text-gray-500">{{ lesson.createdAt }}</span>
                <div class="flex gap-2">
                    <Button 
                        icon="pi pi-pencil" 
                        text 
                        rounded 
                        aria-label="Edit"
                        class="p-button-sm"
                    />
                    <Button 
                        icon="pi pi-trash" 
                        text 
                        rounded 
                        severity="danger"
                        aria-label="Delete"
                        class="p-button-sm"
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
</style>
