<script setup>
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';

defineProps({
    visible: Boolean,
    lesson: Object
});

const emit = defineEmits(['update:visible', 'confirm']);
</script>

<template>
    <Dialog
        :visible="visible"
        modal
        header="Delete Lesson"
        :style="{ width: '30vw' }"
        @update:visible="$emit('update:visible', $event)"
    >
        <p class="text-gray-600">
            Are you sure you want to delete this lesson? This action cannot be undone.
        </p>
        
        <div class="mt-4 p-3 bg-gray-50 rounded-lg">
            <h3 class="font-medium text-gray-900">{{ lesson?.title }}</h3>
            <p class="text-sm text-gray-500 mt-1">{{ lesson?.description }}</p>
        </div>

        <template #footer>
            <Button 
                label="Cancel" 
                @click="$emit('update:visible', false)" 
                text 
            />
            <Button 
                label="Delete" 
                severity="danger" 
                @click="$emit('confirm', lesson)"
            />
        </template>
    </Dialog>
</template>
