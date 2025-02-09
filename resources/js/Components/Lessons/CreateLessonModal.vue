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

const props = defineProps({
    visible: Boolean,
    grades: Array,
});

const emit = defineEmits(['update:visible', 'save']);

const lesson = ref({
    youtubeUrl: '',
    title: '',
    description: '',
    grade: null,
    tags: []
});

const loading = ref(false);
const availableTags = ref([
    { name: 'Mathematics', code: 'math' },
    { name: 'Science', code: 'science' },
    { name: 'English', code: 'english' }
]);

// New tag creation
const newTag = ref('');
const handleNewTag = () => {
    const value = newTag.value.trim();
    if (value) {
        // Add tag if not exists (case insensitive)
        if (!availableTags.value.find(tag => tag.name.toLowerCase() === value.toLowerCase())) {
            const tag = { code: value.toLowerCase().replace(/\s+/g, '-'), name: value };
            availableTags.value.push(tag);
            lesson.value.tags.push(tag);
        }
        newTag.value = '';
    }
};

const fetchYoutubeData = () => {
    loading.value = true;
    // Simulate API call
    setTimeout(() => {
        lesson.value.title = 'Sample YouTube Video Title';
        lesson.value.description = 'This is a sample description fetched from YouTube API';
        loading.value = false;
    }, 1000);
};

const createLesson = () => {
    emit('save', lesson.value);
    emit('update:visible', false);
};
</script>

<template>
    <Dialog 
        v-model:visible="props.visible" 
        modal 
        header="Create New Lesson" 
        :style="{ width: '50vw' }"
        @update:visible="$emit('update:visible', $event)"
    >
        <div class="space-y-4">
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">YouTube URL</label>
                <InputGroup>
                    <InputText v-model="lesson.youtubeUrl" placeholder="Enter YouTube URL" class="w-full" />
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
                <InputText v-model="lesson.title" placeholder="Lesson title" class="w-full" />
            </div>

            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <Textarea v-model="lesson.description" rows="3" class="w-full" />
            </div>

            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Grade</label>
                <Dropdown 
                    v-model="lesson.grade" 
                    :options="grades" 
                    placeholder="Select Grade"
                    class="w-full"
                />
            </div>

            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Tags</label>
                <MultiSelect
                    v-model="lesson.tags"
                    :options="availableTags"
                    optionLabel="name"
                    placeholder="Select Tags"
                    :filter="true"
                    class="w-full"
                />
                <InputGroup class="mt-2">
                    <InputGroupAddon>
                        <i class="pi pi-plus" />
                    </InputGroupAddon>
                    <InputText
                        v-model="newTag"
                        placeholder="Type tag then press Enter"
                        @keydown.enter.prevent="handleNewTag"
                        class="w-full"
                    />
                </InputGroup>
            </div>
        </div>

        <template #footer>
            <Button label="Cancel" @click="$emit('update:visible', false)" text />
            <Button label="Create Lesson" @click="createLesson" />
        </template>
    </Dialog>
</template>
