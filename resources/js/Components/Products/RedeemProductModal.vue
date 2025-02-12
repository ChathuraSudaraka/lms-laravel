<script setup>
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import Tag from 'primevue/tag';
import Image from 'primevue/image';

const props = defineProps({
    visible: Boolean,
    product: Object,
    userStars: {
        type: Number,
        default: 0
    }
});

const emit = defineEmits(['update:visible', 'confirm']);

const getRemainingStars = () => {
    if (!props.product) return 0;
    return props.userStars - props.product.requiredStars;
};
</script>

<template>
    <Dialog
        :visible="visible"
        modal
        header="Redeem Product"
        :style="{ width: '35vw' }"
        :closable="true"
        @update:visible="$emit('update:visible', $event)"
    >
        <!-- Product Preview -->
        <div class="flex gap-4 items-start mb-4">
            <Image 
                :src="product?.image" 
                alt="Product Image" 
                :preview="true"
                imageClass="w-40 h-32 object-cover rounded-lg shadow-sm"
            />
            <div class="flex-1">
                <h3 class="text-lg font-medium text-gray-900">{{ product?.name }}</h3>
                <p class="text-sm text-gray-500 mt-1">{{ product?.description }}</p>
            </div>
        </div>

        <!-- Stars Summary -->
        <div class="bg-gray-50 rounded-lg p-4 space-y-3">
            <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600">Your Stars</span>
                <div class="flex items-center gap-1">
                    <i class="pi pi-star-fill text-yellow-400"></i>
                    <span class="font-medium">{{ userStars }}</span>
                </div>
            </div>
            <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600">Required Stars</span>
                <div class="flex items-center gap-1">
                    <i class="pi pi-minus-circle text-red-400"></i>
                    <span class="font-medium">{{ product?.requiredStars }}</span>
                </div>
            </div>
            <div class="border-t border-gray-200 pt-3 flex justify-between items-center">
                <span class="text-sm font-medium">Remaining Stars</span>
                <Tag :value="getRemainingStars()" 
                     :severity="getRemainingStars() >= 0 ? 'success' : 'danger'" />
            </div>
        </div>

        <!-- Confirmation Message -->
        <p class="mt-4 text-sm text-gray-600">
            Are you sure you want to redeem this product? This action will deduct 
            <span class="font-medium text-primary-600">{{ product?.requiredStars }}</span> stars 
            from your account.
        </p>

        <template #footer>
            <Button 
                label="Cancel" 
                @click="$emit('update:visible', false)" 
                text 
            />
            <Button 
                label="Confirm Redemption" 
                severity="success" 
                :disabled="getRemainingStars() < 0"
                @click="$emit('confirm', product)"
            />
        </template>
    </Dialog>
</template>

<style scoped>
.p-dialog-content {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.p-tag {
    font-weight: 500;
}
</style>
