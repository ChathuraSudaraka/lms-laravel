<script setup>
import { ref, watch } from 'vue';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import Dropdown from 'primevue/dropdown';
import MultiSelect from 'primevue/multiselect';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import { useToast } from "primevue/usetoast";
import { getFileTypeIcon, getFileTypeColor } from '@/Utils/fileHelpers';

const toast = useToast();

const props = defineProps({
    visible: Boolean,
    lesson: {
        type: Object,
        required: true,
        default: () => ({
            youtubeUrl: '',
            title: '',
            description: '',
            grade: null,
            tags: [],
            resources: [] // Add resources to default lesson structure
        })
    },
    grades: Array,
    tags: Array,
});

const emit = defineEmits(['update:visible', 'save']);

const editedLesson = ref({
    youtubeUrl: '',
    title: '',
    description: '',
    grade: null,
    tags: [],
    resources: []
});

const newResource = ref({
    name: '',
    url: '',
    type: 'pdf'
});

const resourceTypes = [
    { label: 'PDF Document', value: 'pdf' },
    { label: 'Word Document', value: 'doc' },
    { label: 'PowerPoint', value: 'ppt' },
    { label: 'Excel Sheet', value: 'xlsx' },
    { label: 'Other', value: 'other' }
];

const addResource = () => {
    if (newResource.value.name && newResource.value.url) {
        editedLesson.value.resources.push({
            name: newResource.value.name,
            url: newResource.value.url,
            type: newResource.value.type
        });
        // Reset form
        newResource.value = {
            name: '',
            url: '',
            type: 'pdf'
        };
    }
};

const removeResource = (index) => {
    editedLesson.value.resources.splice(index, 1);
};

// Watch for lesson changes to update form
watch(() => props.lesson, (newLesson) => {
    if (newLesson) {
        editedLesson.value = {
            ...newLesson,
            resources: newLesson.resources || []
        };
    }
}, { immediate: true });

const loading = ref(false);

const fetchYoutubeData = () => {
    loading.value = true;
    setTimeout(() => {
        loading.value = false;
    }, 1000);
};

const updateLesson = () => {
    emit('save', editedLesson.value);
    emit('update:visible', false);
};
</script>

<template>
    <Dialog 
        :visible="props.visible" 
        modal 
        header="Edit Lesson" 
        :style="{ width: '50vw' }"
        @update:visible="$emit('update:visible', $event)"
    >
        <div class="space-y-4">
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">YouTube URL</label>
                <InputGroup>
                    <InputText v-model="editedLesson.youtubeUrl" placeholder="Enter YouTube URL" class="w-full" />
                    <InputGroupAddon>
                        <Button 
                            icon="pi pi-search" 
                            @click="fetchYoutubeData" 
                            :loading="loading"
                        />
                    </InputGroupAddon>
                </InputGroup>
            </div>

            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <InputText v-model="editedLesson.title" placeholder="Lesson title" class="w-full" />
            </div>

            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <Textarea v-model="editedLesson.description" rows="3" class="w-full" />
            </div>

            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Grade</label>
                <Dropdown 
                    v-model="editedLesson.grade" 
                    :options="grades" 
                    placeholder="Select Grade"
                    class="w-full"
                />
            </div>

            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Tags</label>
                <MultiSelect
                    v-model="editedLesson.tags"
                    :options="tags"
                    placeholder="Select Tags"
                    :selectionLimit="3"
                    :showToggleAll="false"
                    class="w-full"
                />
            </div>

            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                    Lesson Resources
                </label>
                
                <!-- Add new resource form -->
                <div class="border border-gray-200 hover:border-primary-500 transition-colors duration-200 rounded-lg p-4 space-y-3 mb-4 shadow-sm">
                    <div>
                        <label class="text-sm text-gray-600">Resource Name</label>
                        <InputText 
                            v-model="newResource.name"
                            placeholder="Enter resource name"
                            class="w-full"
                        />
                    </div>
                    
                    <div>
                        <label class="text-sm text-gray-600">Drive Link</label>
                        <InputGroup>
                            <InputGroupAddon>
                                <i class="pi pi-link" />
                            </InputGroupAddon>
                            <InputText 
                                v-model="newResource.url"
                                placeholder="Paste Google Drive link"
                                class="w-full"
                            />
                        </InputGroup>
                    </div>

                    <div>
                        <label class="text-sm text-gray-600">Resource Type</label>
                        <Dropdown
                            v-model="newResource.type"
                            :options="resourceTypes"
                            optionLabel="label"
                            optionValue="value"
                            class="w-full"
                        />
                    </div>

                    <Button 
                        label="Add Resource" 
                        icon="pi pi-plus"
                        @click="addResource"
                        :disabled="!newResource.name || !newResource.url"
                        class="w-full"
                    />
                </div>

                <!-- Resource List -->
                <div v-if="editedLesson.resources.length > 0" class="space-y-2 border border-gray-100 rounded-lg p-3">
                    <div v-for="(resource, index) in editedLesson.resources" 
                         :key="index"
                         class="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100 hover:border-primary-500 hover:bg-primary-50 transition-all duration-200">
                        <div class="flex items-center gap-3">
                            <i :class="[getFileTypeIcon(resource.type), getFileTypeColor(resource.type), 'text-xl']" />
                            <div class="flex flex-col">
                                <span class="text-sm font-medium">{{ resource.name }}</span>
                                <a :href="resource.url" 
                                   target="_blank" 
                                   class="text-xs text-blue-600 hover:underline">
                                    Open in Drive
                                </a>
                            </div>
                        </div>
                        <Button 
                            icon="pi pi-times" 
                            text
                            severity="danger"
                            @click="removeResource(index)"
                        />
                    </div>
                </div>
            </div>
        </div>

        <template #footer>
            <Button label="Cancel" @click="$emit('update:visible', false)" text />
            <Button label="Save Changes" @click="updateLesson" />
        </template>
    </Dialog>
</template>
