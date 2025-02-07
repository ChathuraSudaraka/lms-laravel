<script setup>
import { ref } from 'vue';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Textarea from 'primevue/textarea';
import Button from 'primevue/button';

const props = defineProps({
    modelValue: Boolean  // renamed from visible to modelValue for v-model convention
});

const emit = defineEmits(['update:modelValue', 'save']);  // renamed from update:visible to update:modelValue

const product = ref({
    name: '',
    stars: 0,
    description: '',
    image: ''
});

const closeModal = () => {
    emit('update:modelValue', false);
};

const saveProduct = () => {
    emit('save', { ...product.value });
    closeModal();
    product.value = {
        name: '',
        stars: 0,
        description: '',
        image: ''
    };
};
</script>

<template>
    <Dialog 
        :visible="modelValue" 
        @update:visible="$emit('update:modelValue', $event)"
        modal 
        header="Create New Product" 
        :style="{ width: '90%', maxWidth: '500px' }"
    >
        <div class="flex flex-col gap-4">
            <div class="field">
                <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                <InputText id="name" v-model="product.name" class="w-full" />
            </div>

            <div class="field">
                <label for="stars" class="block text-sm font-medium text-gray-700 mb-1">Science Stars Required</label>
                <InputNumber id="stars" v-model="product.stars" :min="0" class="w-full" />
            </div>

            <div class="field">
                <label for="image" class="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                <InputText id="image" v-model="product.image" class="w-full" />
            </div>

            <div class="field">
                <label for="description" class="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <Textarea id="description" v-model="product.description" rows="3" class="w-full" />
            </div>
        </div>

        <template #footer>
            <div class="flex justify-end gap-2">
                <Button label="Cancel" severity="secondary" @click="closeModal" />
                <Button label="Save" @click="saveProduct" />
            </div>
        </template>
    </Dialog>
</template>
