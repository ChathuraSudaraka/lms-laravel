<script setup>
import Button from "primevue/button";

defineProps({
    hasActiveFilters: Boolean
});

const emit = defineEmits(['create']);
</script>

<template>
    <div class="text-center py-12">
        <i class="pi pi-video text-4xl text-gray-400 mb-4"></i>
        <h3 class="text-xl font-semibold text-gray-700 mb-2">No lessons found</h3>
        <p class="text-gray-500 mb-4">
            {{ hasActiveFilters ? 'Try adjusting your filters' : 'Start by creating your first lesson' }}
        </p>
        <Button 
            label="Create Lesson" 
            icon="pi pi-plus"
            @click="$emit('create')"
            severity="secondary"
            text
        />
    </div>
</template>
