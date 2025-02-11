<script setup>
import { ref, computed } from 'vue';
import FileUpload from 'primevue/fileupload';
import Button from 'primevue/button';
import Badge from 'primevue/badge';
import ProgressBar from 'primevue/progressbar';
import { getFileTypeIcon, getFileTypeColor } from '@/Utils/fileHelpers';

const props = defineProps({
    multiple: {
        type: Boolean,
        default: false
    },
    accept: {
        type: String,
        default: '*/*'
    },
    maxFileSize: {
        type: Number,
        default: 5000000 // 5MB
    },
    url: {
        type: String,
        required: true
    },
    uploadImmediate: {
        type: Boolean,
        default: false
    }
});

const emit = defineEmits([
    'upload-complete',
    'file-select',
    'file-remove',
    'error',
    'success'
]);

const totalSize = ref(0);
const totalSizePercent = ref(0);
const files = ref([]);

const maxSizeFormatted = computed(() => {
    return formatSize(props.maxFileSize);
});

const formatSize = (bytes) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

const onFileSelect = (event) => {
    files.value = event.files;
    totalSize.value = event.files.reduce((sum, file) => sum + file.size, 0);
    totalSizePercent.value = (totalSize.value / props.maxFileSize) * 100;
    emit('file-select', event.files);
};

const onFileUpload = (event) => {
    emit('success', 'Files uploaded successfully');
    emit('upload-complete', event);
};

const onFileRemove = (file, removeCallback, index) => {
    removeCallback(index);
    totalSize.value -= file.size;
    totalSizePercent.value = (totalSize.value / props.maxFileSize) * 100;
    emit('file-remove', file);
};

const onError = (event) => {
    emit('error', event.error || 'Error uploading files');
};

const getPreviewContent = (file) => {
    return {
        icon: getFileTypeIcon(file.type),
        color: getFileTypeColor(file.type),
        name: file.name,
        size: formatSize(file.size),
        type: file.type.split('/').pop().toUpperCase()
    };
};
</script>

<template>
    <div class="file-uploader">
        <FileUpload
            :name="'files[]'"
            :url="url"
            :multiple="multiple"
            :accept="accept"
            :maxFileSize="maxFileSize"
            :auto="uploadImmediate"
            @select="onFileSelect"
            @upload="onFileUpload"
            @error="onError"
        >
            <template #header="{ chooseCallback, uploadCallback, clearCallback, files }">
                <div class="flex flex-wrap justify-between items-center gap-3">
                    <div class="flex gap-2">
                        <Button @click="chooseCallback()" icon="pi pi-plus" 
                               rounded outlined severity="secondary" />
                        <Button v-if="!uploadImmediate" @click="uploadCallback" 
                               icon="pi pi-upload" rounded outlined severity="success"
                               :disabled="!files || files.length === 0" />
                        <Button @click="clearCallback()" icon="pi pi-times" 
                               rounded outlined severity="danger"
                               :disabled="!files || files.length === 0" />
                    </div>
                    <div v-if="files && files.length > 0" class="flex-1 md:w-auto w-full">
                        <ProgressBar :value="totalSizePercent" class="h-2">
                            <span>{{ formatSize(totalSize) }} / {{ maxSizeFormatted }}</span>
                        </ProgressBar>
                    </div>
                </div>
            </template>

            <template #content="{ files, uploadedFiles, removeUploadedFileCallback, removeFileCallback }">
                <div class="flex flex-col gap-4 mt-4">
                    <!-- Pending Files -->
                    <div v-if="files.length > 0" class="pending-files">
                        <h6 class="mb-2 font-medium">Pending</h6>
                        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            <div v-for="(file, index) in files" :key="file.name + index"
                                 class="file-card border rounded-lg p-4 flex flex-col items-center">
                                <div class="file-icon mb-3">
                                    <i :class="[getPreviewContent(file).icon, getPreviewContent(file).color, 'text-3xl']"></i>
                                </div>
                                <span class="text-sm font-medium truncate w-full text-center">
                                    {{ getPreviewContent(file).name }}
                                </span>
                                <div class="flex flex-col items-center gap-1 mt-2">
                                    <span class="text-xs text-gray-500">{{ getPreviewContent(file).size }}</span>
                                    <span class="text-xs px-2 py-1 bg-gray-100 rounded-full">
                                        {{ getPreviewContent(file).type }}
                                    </span>
                                </div>
                                <Button icon="pi pi-times" 
                                       @click="onFileRemove(file, removeFileCallback, index)"
                                       text rounded size="small" severity="danger"
                                       class="mt-2" />
                            </div>
                        </div>
                    </div>

                    <!-- Uploaded Files -->
                    <div v-if="uploadedFiles.length > 0" class="uploaded-files">
                        <h6 class="mb-2 font-medium">Uploaded</h6>
                        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            <div v-for="(file, index) in uploadedFiles" :key="file.name + index"
                                 class="file-card border rounded-lg p-4 flex flex-col items-center">
                                <div class="file-icon mb-3">
                                    <i :class="[getPreviewContent(file).icon, getPreviewContent(file).color, 'text-3xl']"></i>
                                </div>
                                <span class="text-sm font-medium truncate w-full text-center">
                                    {{ getPreviewContent(file).name }}
                                </span>
                                <div class="flex flex-col items-center gap-1 mt-2">
                                    <span class="text-xs text-gray-500">{{ getPreviewContent(file).size }}</span>
                                    <span class="text-xs px-2 py-1 bg-gray-100 rounded-full">
                                        {{ getPreviewContent(file).type }}
                                    </span>
                                </div>
                                <Badge value="Uploaded" severity="success" class="mt-2" />
                                <Button icon="pi pi-times" 
                                       @click="removeUploadedFileCallback(index)"
                                       text rounded size="small" severity="danger"
                                       class="mt-2" />
                            </div>
                        </div>
                    </div>
                </div>
            </template>

            <template #empty>
                <div class="flex flex-col items-center justify-center py-8">
                    <i class="pi pi-cloud-upload text-4xl mb-4 text-gray-400" />
                    <p class="text-gray-500">
                        Drag and drop files here or click to browse
                    </p>
                    <p class="text-sm text-gray-400">
                        Maximum file size: {{ maxSizeFormatted }}
                    </p>
                </div>
            </template>
        </FileUpload>
    </div>
</template>

<style scoped>
.file-uploader :deep(.p-fileupload-content) {
    border: none;
}

.file-uploader :deep(.p-fileupload-buttonbar) {
    display: none;
}

.file-card {
    transition-property: all;
    transition-duration: 200ms;
}

.file-card:hover {
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
}

.file-icon {
    width: 3rem;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 9999px;
    background-color: #f9fafb;
}
</style>
