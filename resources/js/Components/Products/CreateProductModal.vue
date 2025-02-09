<script setup>
import { ref } from 'vue';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Textarea from 'primevue/textarea';
import Button from 'primevue/button';
import FileUpload from 'primevue/fileupload';
import Image from 'primevue/image';

const props = defineProps({
    modelValue: Boolean  // renamed from visible to modelValue for v-model convention
});

const emit = defineEmits(['update:modelValue', 'save']);  // renamed from update:visible to update:modelValue

const product = ref({
    name: '',
    stars: 0,
    description: '',
    image: null,
    imagePreview: null
});

const onFileSelect = (event) => {
    const file = event.files[0];
    if (file) {
        product.value.image = file;
        // Create preview URL
        product.value.imagePreview = URL.createObjectURL(file);
    }
};

const onFileRemove = () => {
    product.value.image = null;
    product.value.imagePreview = null;
};

const closeModal = () => {
    emit('update:modelValue', false);
    // Clean up preview URL
    if (product.value.imagePreview) {
        URL.revokeObjectURL(product.value.imagePreview);
    }
    product.value = {
        name: '',
        stars: 0,
        description: '',
        image: null,
        imagePreview: null
    };
};

const saveProduct = () => {
    // Create FormData to handle file upload
    const formData = new FormData();
    formData.append('name', product.value.name);
    formData.append('stars', product.value.stars);
    formData.append('description', product.value.description);
    if (product.value.image) {
        formData.append('image', product.value.image);
    }
    
    emit('save', formData);
    closeModal();
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
                <label class="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
                <FileUpload
                    mode="basic"
                    :auto="true"
                    accept="image/*"
                    :maxFileSize="1000000"
                    @upload="onFileSelect"
                    @remove="onFileRemove"
                    :customUpload="true"
                    chooseLabel="Choose Image"
                />
                <small class="text-gray-500">Max file size: 1MB</small>
                
                <div v-if="product.imagePreview" class="mt-3">
                    <Image
                        :src="product.imagePreview"
                        alt="Product Preview"
                        preview
                        :pt="{
                            image: { class: 'w-full max-h-[200px] object-cover rounded-lg' }
                        }"
                    />
                </div>
            </div>

            <div class="field">
                <label for="description" class="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <Textarea id="description" v-model="product.description" rows="3" class="w-full" />
            </div>
        </div>

        <template #footer>
            <div class="flex justify-end gap-2">
                <Button label="Cancel" severity="secondary" @click="closeModal" />
                <Button 
                    label="Save" 
                    @click="saveProduct"
                    :disabled="!product.name || !product.image"
                />
            </div>
        </template>
    </Dialog>
</template>

<style scoped>
:deep(.p-fileupload-basic) {
    width: 100%;
}
:deep(.p-button.p-fileupload-choose) {
    width: 100%;
}
</style>
