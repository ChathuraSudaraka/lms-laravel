<script setup>
import Button from 'primevue/button';
import Tag from 'primevue/tag';
import { isStudent } from "@/Utils/IsStudent";
import { isAdmin } from "@/Utils/IsAdmin";

const props = defineProps({
    lesson: {
        type: Object,
        required: true
    }
});

const emit = defineEmits(['edit', 'delete']);
</script>

<template>
    <div class="p-4 md:p-6">
        <div class="flex justify-between items-start gap-4 mb-4">
            <div>
                <h1 class="text-xl md:text-2xl font-semibold text-gray-900 mb-2">
                    {{ lesson.title }}
                </h1>
                <div class="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                    <span>{{ lesson.views }} views</span>
                    <span>•</span>
                    <span>{{ lesson.duration }}</span>
                    <span>•</span>
                    <span>{{ lesson.createdAt }}</span>
                </div>
            </div>
            <div class="flex gap-2" v-if="!isStudent()">
                <Button 
                    icon="pi pi-pencil" 
                    rounded 
                    outlined 
                    aria-label="Edit"
                    @click="$emit('edit')" 
                />
                <Button 
                    v-if="isAdmin()"
                    icon="pi pi-trash" 
                    rounded 
                    outlined 
                    severity="danger"
                    aria-label="Delete"
                    @click="$emit('delete')" 
                />
            </div>
        </div>

        <div class="flex flex-wrap items-center gap-2 mb-4">
            <Tag :value="'Grade ' + lesson.grade" severity="info" />
            <Tag 
                v-for="tag in lesson.tags" 
                :key="tag" 
                :value="tag"
                severity="secondary" 
            />
        </div>
    </div>
</template>
