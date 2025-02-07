<template>
    <div class="bg-white border border-gray-200 rounded-lg p-6">
        <!-- Question Header -->
        <div class="flex justify-between items-start mb-6">
            <div>
                <h3 class="text-lg font-medium text-gray-900">
                    Question {{ index + 1 }}
                </h3>
                <p class="text-sm text-gray-500 mt-1">Add question text and possible answers</p>
            </div>
            <Button icon="pi pi-trash" severity="danger" text 
                @click="$emit('remove')"
                v-tooltip.left="'Remove Question'" />
        </div>

        <!-- Question Content -->
        <div class="space-y-6">
            <!-- Question Text Editor -->
            <div class="space-y-2">
                <label class="text-gray-600 font-medium">Question Text</label>
                <Editor v-model="questionData.text" 
                    editorStyle="height: 120px"
                    :pt="{
                        toolbar: { class: 'border-gray-200 bg-gray-50' },
                        content: { class: 'border-gray-200' }
                    }" />
            </div>

            <!-- Question Image Upload -->
            <div class="space-y-4">
                <div class="flex items-center gap-2">
                    <Checkbox v-model="questionData.hasImage" binary />
                    <label class="text-sm text-gray-600">Include an image</label>
                </div>

                <div v-if="questionData.hasImage" class="space-y-2">
                    <FileUpload mode="basic" :auto="true" 
                        chooseLabel="Choose Image" 
                        accept="image/*"
                        :maxFileSize="5000000"
                        @upload="onQuestionImageUpload"
                        :pt="{
                            chooseButton: { class: 'p-button-secondary' }
                        }" />
                    
                    <div v-if="questionData.image" class="relative inline-block">
                        <Image :src="questionData.image" alt="Question" 
                            preview width="200" class="rounded-lg" />
                        <Button icon="pi pi-times" 
                            class="absolute top-2 right-2"
                            rounded text severity="danger"
                            @click="removeQuestionImage"
                            v-tooltip.left="'Remove Image'" />
                    </div>
                </div>
            </div>

            <!-- Answers Section -->
            <div class="space-y-4">
                <div class="flex items-center justify-between">
                    <h4 class="font-medium text-gray-700">Answers</h4>
                    <Button label="Add Answer" icon="pi pi-plus" text
                        @click="addAnswer"
                        :disabled="questionData.answers.length >= 6" />
                </div>

                <!-- Answer List -->
                <div class="space-y-4">
                    <div v-for="(answer, index) in questionData.answers" 
                        :key="index"
                        :class="[
                            'p-4 rounded-lg border transition-colors',
                            questionData.correctAnswer === index 
                                ? 'border-green-200 bg-green-50' 
                                : 'border-gray-200'
                        ]">
                        <div class="flex items-start gap-4">
                            <!-- Correct Answer Radio -->
                            <div class="pt-2">
                                <RadioButton v-model="questionData.correctAnswer"
                                    :value="index"
                                    :inputId="'ans_' + index" />
                            </div>

                            <!-- Answer Content -->
                            <div class="flex-1 space-y-4">
                                <div class="space-y-2">
                                    <label :for="'answer_' + index" 
                                        class="text-sm font-medium text-gray-600">
                                        Answer Text
                                    </label>
                                    <InputText v-model="answer.text"
                                        :id="'answer_' + index"
                                        class="w-full" />
                                </div>

                                <!-- Answer Image Section -->
                                <div class="space-y-2">
                                    <div class="flex items-center gap-2">
                                        <Checkbox v-model="answer.hasImage" binary />
                                        <label class="text-sm text-gray-600">
                                            Include an image
                                        </label>
                                    </div>

                                    <div v-if="answer.hasImage" class="space-y-2">
                                        <FileUpload mode="basic" :auto="true"
                                            chooseLabel="Choose Image"
                                            accept="image/*"
                                            :maxFileSize="5000000"
                                            @upload="(e) => onAnswerImageUpload(e, index)"
                                            :pt="{
                                                chooseButton: { class: 'p-button-secondary' }
                                            }" />
                                        
                                        <div v-if="answer.image" class="relative inline-block">
                                            <Image :src="answer.image" alt="Answer"
                                                preview width="150" class="rounded-lg" />
                                            <Button icon="pi pi-times"
                                                class="absolute top-2 right-2"
                                                rounded text severity="danger"
                                                @click="() => removeAnswerImage(index)"
                                                v-tooltip.left="'Remove Image'" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Remove Answer Button -->
                            <Button icon="pi pi-trash" severity="danger" text
                                v-if="questionData.answers.length > 2"
                                @click="removeAnswer(index)"
                                v-tooltip.left="'Remove Answer'" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, watch } from 'vue';
import Editor from 'primevue/editor';
import FileUpload from 'primevue/fileupload';
import Image from 'primevue/image';
import Checkbox from 'primevue/checkbox';
import RadioButton from 'primevue/radiobutton';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

const props = defineProps({
    index: {
        type: Number,
        required: true
    },
    initialData: {
        type: Object,
        default: () => ({
            text: '',
            hasImage: false,
            image: null,
            answers: [
                { text: '', hasImage: false, image: null },
                { text: '', hasImage: false, image: null }
            ],
            correctAnswer: 0
        })
    }
});

const emit = defineEmits(['update', 'remove']);

const questionData = ref({ ...props.initialData });

const addAnswer = () => {
    if (questionData.value.answers.length < 6) {
        questionData.value.answers.push({
            text: '',
            hasImage: false,
            image: null
        });
    }
};

const removeAnswer = (index) => {
    if (questionData.value.answers.length > 2) {
        questionData.value.answers.splice(index, 1);
        if (questionData.value.correctAnswer >= index) {
            questionData.value.correctAnswer = Math.max(0, questionData.value.correctAnswer - 1);
        }
    }
};

const handleImageUpload = (file) => {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
    });
};

const onQuestionImageUpload = async (event) => {
    const file = event.files[0];
    questionData.value.image = await handleImageUpload(file);
};

const onAnswerImageUpload = async (event, index) => {
    const file = event.files[0];
    questionData.value.answers[index].image = await handleImageUpload(file);
};

const removeQuestionImage = () => {
    questionData.value.image = null;
};

const removeAnswerImage = (index) => {
    questionData.value.answers[index].image = null;
};

watch(questionData, (newValue) => {
    emit('update', newValue);
}, { deep: true });
</script>

<style scoped>
:deep(.p-editor-container) {
    border-radius: 0.375rem;
}

:deep(.p-editor-content), 
:deep(.p-editor-toolbar) {
    border-color: #e5e7eb !important;
}

:deep(.p-editor-toolbar) {
    border-top-left-radius: 0.375rem;
    border-top-right-radius: 0.375rem;
}

:deep(.p-editor-content) {
    border-bottom-left-radius: 0.375rem;
    border-bottom-right-radius: 0.375rem;
}

:deep(.p-fileupload-buttonbar) {
    display: none;
}
</style>
