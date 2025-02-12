<script setup>
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';

defineProps({
    visible: Boolean,
    product: Object
});

const emit = defineEmits(['update:visible', 'confirm']);
</script>

<template>
    <Dialog
        :visible="visible"
        modal
        header="Delete Product"
        :style="{ width: '30vw' }"
        :closable="true"
        @update:visible="$emit('update:visible', $event)"
    >
        <p class="text-gray-600">
            Are you sure you want to delete this product? This action cannot be undone.
        </p>
        
        <div class="mt-4 p-3 bg-gray-50 rounded-lg">
            <h3 class="font-medium text-gray-900">{{ product?.name }}</h3>
            <p class="text-sm text-gray-500 mt-1">{{ product?.description }}</p>
            <div class="mt-2 text-sm">
                <span class="text-primary-600 font-medium">{{ product?.totalRedeemed }}</span>
                <span class="text-gray-500"> times redeemed</span>
            </div>
        </div>

        <template #footer>
            <Button 
                label="Cancel" 
                @click="$emit('update:visible', false)" 
                text 
            />
            <Button 
                label="Delete Product" 
                severity="danger" 
                @click="$emit('confirm', product)"
            />
        </template>
    </Dialog>
</template>
