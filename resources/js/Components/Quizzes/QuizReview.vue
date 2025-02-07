<template>
    <div class="space-y-8">
        <!-- Quiz Basic Info Review -->
        <div class="space-y-4">
            <h3 class="text-lg font-semibold text-gray-900">Quiz Information</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-gray-50 rounded-lg">
                <div v-for="(field, key) in reviewFields" :key="key" class="space-y-1">
                    <span class="text-sm text-gray-600">{{ field.label }}</span>
                    <p class="font-medium text-gray-900">
                        <span v-if="field.type === 'date' && quizData[key]">
                            {{ formatDate(quizData[key]) }}
                        </span>
                        <span v-else-if="field.type === 'subject'">
                            {{ quizData[key]?.name || quizData[key] || 'Not set' }}
                        </span>
                        <span v-else>
                            {{ quizData[key] || 'Not set' }}
                        </span>
                    </p>
                </div>
            </div>
        </div>

        <!-- Questions Review -->
        <div class="space-y-4">
            <div class="flex items-center justify-between">
                <h3 class="text-lg font-semibold text-gray-900">Questions</h3>
                <Tag :value="`${questions.length} Questions`" severity="info" />
            </div>

            <div class="space-y-6">
                <Accordion :multiple="true">
                    <AccordionTab v-for="(question, qIndex) in questions" :key="qIndex">
                        <template #header>
                            <div class="flex items-center gap-2">
                                <span class="font-medium">Question {{ qIndex + 1 }}</span>
                                <Tag :value="`${question.answers.length} answers`" severity="secondary" />
                            </div>
                        </template>
                        
                        <!-- Question Content -->
                        <div class="space-y-4">
                            <div class="prose prose-sm max-w-none" v-html="question.text"></div>
                            
                            <div v-if="question.hasImage && question.image" class="mt-2">
                                <Image :src="question.image" alt="Question" preview width="200" />
                            </div>

                            <!-- Answers -->
                            <div class="space-y-3">
                                <div v-for="(answer, aIndex) in question.answers" :key="aIndex"
                                    :class="[
                                        'p-3 rounded-lg flex items-start gap-3',
                                        aIndex === question.correctAnswer
                                            ? 'bg-green-50 border border-green-200'
                                            : 'bg-gray-50 border border-gray-200'
                                    ]">
                                    <i class="pi mt-1"
                                        :class="[
                                            aIndex === question.correctAnswer
                                                ? 'pi-check-circle text-green-500'
                                                : 'pi-circle text-gray-400'
                                        ]">
                                    </i>
                                    <div class="flex-1">
                                        <p :class="[
                                            'text-sm',
                                            aIndex === question.correctAnswer
                                                ? 'text-green-700'
                                                : 'text-gray-700'
                                        ]">
                                            {{ answer.text }}
                                        </p>
                                        <div v-if="answer.hasImage && answer.image" class="mt-2">
                                            <Image :src="answer.image" alt="Answer" preview width="150" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </AccordionTab>
                </Accordion>
            </div>
        </div>

        <!-- Summary Stats -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
            <div class="space-y-1">
                <span class="text-sm text-gray-500">Total Questions</span>
                <p class="text-lg font-semibold text-gray-900">{{ questions.length }}</p>
            </div>
            <div class="space-y-1">
                <span class="text-sm text-gray-500">Questions Per Quiz</span>
                <p class="text-lg font-semibold text-gray-900">{{ quizData.questionsPerQuiz }}</p>
            </div>
            <div class="space-y-1">
                <span class="text-sm text-gray-500">Total Marks</span>
                <p class="text-lg font-semibold text-gray-900">{{ quizData.totalMarks }}</p>
            </div>
            <div class="space-y-1">
                <span class="text-sm text-gray-500">Time Limit</span>
                <p class="text-lg font-semibold text-gray-900">{{ quizData.timeLimit }} minutes</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import Tag from 'primevue/tag';
import Image from 'primevue/image';
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';

const props = defineProps({
    quizData: {
        type: Object,
        required: true
    },
    questions: {
        type: Array,
        required: true
    }
});

const reviewFields = {
    name: { label: 'Quiz Name', type: 'text' },
    subject: { label: 'Subject', type: 'subject' },
    grade: { label: 'Grade', type: 'text' },
    description: { label: 'Description', type: 'text' },
    deadline: { label: 'Deadline', type: 'date' },
    timeLimit: { label: 'Time Limit', type: 'number' },
    totalMarks: { label: 'Total Marks', type: 'number' },
    questionsPerQuiz: { label: 'Questions Per Quiz', type: 'number' }
};

const formatDate = (date) => {
    if (!date) return 'Not set';
    return new Date(date).toLocaleString();
};
</script>

<style scoped>
:deep(.p-accordion-header-link) {
    background-color: transparent !important;
}

:deep(.p-accordion-content) {
    background-color: transparent !important;
}

:deep(.p-image-preview-container) {
    display: inline-block;
}
</style>
