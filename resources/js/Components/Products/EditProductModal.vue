<script setup>
import { ref, watch } from 'vue';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import InputNumber from 'primevue/inputnumber';
import FileUpload from 'primevue/fileupload';
import Image from 'primevue/image';

const props = defineProps({
    visible: Boolean,
    product: {
        type: Object,
        required: true,
        default: () => ({
            name: '',
            description: '',
            image: '',
            requiredStars: 0,
            inventory: 0
        })
    }
});

const emit = defineEmits(['update:visible', 'save']);

const editedProduct = ref({
    name: '',
    description: '',
    image: '',
    requiredStars: 0,
    inventory: 0
});

// Watch for product changes to update form
watch(() => props.product, (newProduct) => {
    if (newProduct) {
        editedProduct.value = { ...newProduct };
    }
}, { immediate: true });

// Add a watch for visibility changes
watch(() => props.visible, (newValue) => {
    if (newValue && props.product) {
        editedProduct.value = { ...props.product };
    }
});

const updateProduct = () => {
    emit('save', editedProduct.value);
    emit('update:visible', false);
};

const onImageUpload = (event) => {
    const file = event.files[0];
    // In a real app, you would upload this to your server
    // For now, we'll just create a temp URL
    editedProduct.value.image = URL.createObjectURL(file);
};
</script>

<template>
    <Dialog 
        :visible="visible" 
        modal 
        header="Edit Product" 
        :style="{ width: '50vw' }"
        :closable="true"
        @update:visible="$emit('update:visible', $event)"
    >
        <div class="space-y-4">
            <!-- Product Image -->
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
                <div class="flex gap-4 items-start">
                    <Image 
                        :src="editedProduct.image" 
                        alt="Product Image" 
                        :preview="true"
                        imageClass="w-32 h-24 object-cover rounded"
                    />
                    <FileUpload
                        mode="basic"
                        :auto="true"
                        accept="image/*"
                        :maxFileSize="1000000"
                        @upload="onImageUpload"
                        chooseLabel="Change Image"
                    />
                </div>
            </div>

            <!-- Name -->
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <InputText 
                    v-model="editedProduct.name" 
                    placeholder="Product name"
                    class="w-full" 
                />
            </div>

            <!-- Description -->
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <Textarea 
                    v-model="editedProduct.description" 
                    rows="3" 
                    class="w-full"
                />
            </div>

            <!-- Required Stars -->
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Required Stars</label>
                <InputNumber 
                    v-model="editedProduct.requiredStars"
                    :min="0"
                    :max="1000"
                    class="w-full"
                />
            </div>

            <!-- Inventory -->
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Inventory</label>
                <InputNumber 
                    v-model="editedProduct.inventory"
                    :min="0"
                    showButtons
                    class="w-full"
                />
            </div>
        </div>

        <template #footer>
            <Button label="Cancel" @click="$emit('update:visible', false)" text />
            <Button label="Save Changes" @click="updateProduct" />
        </template>
    </Dialog>
</template>
