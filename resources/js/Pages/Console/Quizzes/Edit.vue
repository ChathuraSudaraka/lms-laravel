<template>
    <AppLayout>
        <div class="max-w-7xl mx-auto">
            <div class="w-full p-5 md:p-8 bg-white rounded-lg mb-6">
                <!-- Header with back button -->
                <div class="flex flex-col md:flex-row md:items-center gap-4 mb-8">
                    <Link :href="route('console.quizzes.index')">
                        <Button icon="pi pi-arrow-left" rounded text 
                            severity="secondary" aria-label="Back" />
                    </Link>
                    <Heading title="Edit Quiz" 
                        description="Modify quiz details and questions" />
                </div>

                <!-- Steps Progress -->
                <Steps :model="steps" :readonly="false" v-model:activeIndex="currentStep" />

                <!-- Main Content -->
                <div class="mt-8">
                    <!-- Quiz Info Step -->
                    <div v-if="currentStep === 0">
                        <QuizBasicInfoForm @update="updateQuizInfo" :initial-data="quizData" />
                    </div>

                    <!-- Questions Step -->
                    <div v-if="currentStep === 1" class="space-y-6">
                        <div v-for="(question, index) in questions" :key="index">
                            <QuestionForm 
                                :index="index"
                                :initial-data="question"
                                @update="(data) => updateQuestion(index, data)"
                                @remove="removeQuestion(index)"
                            />
                        </div>

                        <Button label="Add Question" icon="pi pi-plus"
                            @click="addQuestion" class="w-full"
                            :disabled="saving" />
                    </div>

                    <!-- Review Step -->
                    <div v-if="currentStep === 2">
                        <QuizReview 
                            :quiz-data="quizData"
                            :questions="questions"
                        />
                    </div>
                </div>

                <!-- Navigation Buttons -->
                <div class="flex justify-between mt-8 pt-6 border-t">
                    <Button label="Back" icon="pi pi-arrow-left"
                        @click="prevStep" :disabled="currentStep === 0 || saving" />
                    
                    <div class="flex gap-2">
                        <Button label="Save as Draft" severity="secondary"
                            icon="pi pi-save" @click="saveAsDraft"
                            :loading="saving" 
                            :disabled="!isFormValid || saving" />
                        
                        <Button v-if="currentStep < 2" label="Next" 
                            icon="pi pi-arrow-right" iconPos="right"
                            @click="nextStep" 
                            :disabled="!canProceedToNextStep || saving" />
                        
                        <Button v-else label="Update Quiz" 
                            icon="pi pi-check" iconPos="right"
                            @click="updateQuiz" 
                            :loading="saving"
                            :disabled="!isFormValid" />
                    </div>
                </div>
            </div>
        </div>

        <!-- Error Message Dialog -->
        <Dialog v-model:visible="showError" modal header="Validation Error" 
            :closable="false" :pt="{
                root: { class: 'border-red-500' },
                header: { class: 'bg-red-50 text-red-700' }
            }">
            <div class="text-red-600">
                {{ errorMessage }}
            </div>
            <template #footer>
                <Button label="Ok" @click="showError = false" />
            </template>
        </Dialog>
    </AppLayout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { router } from '@inertiajs/vue3';
import AppLayout from '@/Layouts/AppLayout.vue';
import Heading from '@/Components/Heading.vue';
import Button from 'primevue/button';
import Steps from 'primevue/steps';
import Dialog from 'primevue/dialog';
import { Link } from '@inertiajs/vue3';
import QuizBasicInfoForm from '@/Components/Quizzes/QuizBasicInfoForm.vue';
import QuestionForm from '@/Components/Quizzes/QuestionForm.vue';
import QuizReview from '@/Components/Quizzes/QuizReview.vue';

const props = defineProps({
    quiz: {
        type: Object,
        required: true
    }
});

const saving = ref(false);
const currentStep = ref(0);
const showError = ref(false);
const errorMessage = ref('');

const steps = [
    { label: 'Quiz Info', icon: 'pi pi-pencil' },
    { label: 'Questions', icon: 'pi pi-list' },
    { label: 'Review', icon: 'pi pi-check' }
];

const quizData = ref({
    name: '',
    subject: null,
    grade: null,
    timeLimit: null,
    questionsPerQuiz: null,
    description: '',
    deadline: null,
    totalMarks: null
});

const questions = ref([]);

// Initialize form with existing quiz data
onMounted(() => {
    quizData.value = {
        name: props.quiz.name,
        subject: props.quiz.subject,
        grade: props.quiz.grade,
        timeLimit: props.quiz.timeLimit,
        questionsPerQuiz: props.quiz.questionsPerQuiz,
        description: props.quiz.description,
        deadline: props.quiz.deadline ? new Date(props.quiz.deadline) : null,
        totalMarks: props.quiz.totalMarks
    };
    questions.value = props.quiz.questions.map(q => ({
        ...q,
        answers: q.answers.map(a => ({ ...a }))
    }));
});

// Form validation
const isFormValid = computed(() => {
    switch (currentStep.value) {
        case 0:
            return quizData.value.name && 
                   quizData.value.subject &&
                   quizData.value.grade &&
                   quizData.value.timeLimit &&
                   quizData.value.questionsPerQuiz;
        case 1:
            return questions.value.length > 0 &&
                   questions.value.every(q => q.text && 
                   q.answers.length >= 2 &&
                   q.answers.some(a => a.isCorrect));
        case 2:
            return true;
        default:
            return false;
    }
});

const canProceedToNextStep = computed(() => {
    if (currentStep.value === 0) return isFormValid.value;
    if (currentStep.value === 1) return questions.value.length >= 1;
    return true;
});

// Form methods
const updateQuizInfo = (data) => {
    quizData.value = { ...data };
};

const addQuestion = () => {
    questions.value.push({
        text: '',
        hasImage: false,
        image: null,
        answers: [
            { text: '', isCorrect: false, hasImage: false, image: null },
            { text: '', isCorrect: false, hasImage: false, image: null }
        ]
    });
};

const updateQuestion = (index, data) => {
    questions.value[index] = { ...data };
};

const removeQuestion = (index) => {
    questions.value.splice(index, 1);
};

// Navigation and validation
const showValidationError = (message) => {
    errorMessage.value = message;
    showError.value = true;
};

const validateStep = () => {
    if (!isFormValid.value) {
        const messages = {
            0: 'Please fill in all required quiz information.',
            1: 'Please add at least one question with valid answers.',
            2: 'Please review your quiz before submitting.'
        };
        showValidationError(messages[currentStep.value]);
        return false;
    }
    return true;
};

const nextStep = () => {
    if (validateStep() && currentStep.value < 2) {
        currentStep.value++;
    }
};

const prevStep = () => {
    if (currentStep.value > 0) {
        currentStep.value--;
    }
};

// Save operations
const saveAsDraft = async () => {
    if (!validateStep()) return;
    
    saving.value = true;
    try {
        await router.put(route('console.quizzes.update', props.quiz.id), {
            ...quizData.value,
            questions: questions.value,
            status: 'draft'
        });
    } catch (error) {
        showValidationError('Failed to save draft. Please try again.');
    } finally {
        saving.value = false;
    }
};

const updateQuiz = async () => {
    if (!validateStep()) return;
    
    saving.value = true;
    try {
        await router.put(route('console.quizzes.update', props.quiz.id), {
            ...quizData.value,
            questions: questions.value,
            status: 'published'
        });
    } catch (error) {
        showValidationError('Failed to update quiz. Please try again.');
    } finally {
        saving.value = false;
    }
};
</script>

<style scoped>
:deep(.p-steps) {
    margin-bottom: 2rem;
}

:deep(.p-steps .p-steps-item .p-menuitem-link) {
    background: transparent;
}

:deep(.p-steps .p-steps-item.p-highlight .p-steps-number) {
    background: var(--primary-color);
}
</style>