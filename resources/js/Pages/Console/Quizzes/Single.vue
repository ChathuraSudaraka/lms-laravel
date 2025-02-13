<template>
    <div class="min-h-screen bg-gray-100">
        <!-- Quiz Header -->
        <header class="bg-white shadow-sm">
            <div class="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
                <div class="flex items-center justify-between">
                    <h1 class="text-xl font-semibold text-gray-900">{{ quiz.name }}</h1>
                    <Button icon="pi pi-times" text 
                        severity="danger" 
                        @click="showExitConfirm = true"
                        label="Exit Quiz" />
                </div>
            </div>
        </header>

        <!-- Main Content -->
        <main class="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
            <div class="space-y-6">
                <!-- Timer -->
                <QuizTimer 
                    :duration="quiz.timeLimit * 60"
                    @timeout="handleTimeout"
                    @update="handleTimerUpdate" />

                <!-- Progress -->
                <QuizProgress 
                    :totalQuestions="quiz.questions.length"
                    :currentQuestion="currentQuestion"
                    :answers="userAnswers"
                    :skipped="skippedQuestions"
                    @goto="goToQuestion" />

                <!-- Question -->
                <QuizQuestion 
                    :question="quiz.questions[currentQuestion]"
                    :questionNumber="currentQuestion"
                    :initialAnswer="userAnswers[currentQuestion]"
                    :disabled="isSubmitting"
                    @answer="handleAnswer" />

                <!-- Navigation -->
                <div class="flex justify-between pt-4">
                    <Button 
                        label="Previous" 
                        icon="pi pi-arrow-left"
                        @click="prevQuestion"
                        :disabled="currentQuestion === 0 || isSubmitting" />

                    <div class="flex gap-2">
                        <Button 
                            label="Skip" 
                            severity="warning"
                            icon="pi pi-forward"
                            @click="skipQuestion"
                            :disabled="isAnswered"
                            v-if="!skippedQuestions[currentQuestion]" />

                        <Button v-if="isLastQuestion"
                            label="Submit Quiz" 
                            severity="success"
                            icon="pi pi-check"
                            :loading="isSubmitting"
                            @click="submitQuiz" />
                        
                        <Button v-else
                            label="Next" 
                            icon="pi pi-arrow-right"
                            iconPos="right"
                            @click="nextQuestion"
                            :disabled="isSubmitting" />
                    </div>
                </div>
            </div>
        </main>

        <!-- Summarize Modal -->
        <Dialog v-model:visible="showSummary" modal :style="{ width: '650px' }"
            header="Quiz Summary" :closable="false">
            <div class="space-y-4">
                <div class="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                    <div>
                        <h4 class="font-medium text-gray-700">Total Questions</h4>
                        <p class="text-2xl">{{ quiz.questions.length }}</p>
                    </div>
                    <div>
                        <h4 class="font-medium text-gray-700">Time Taken</h4>
                        <p class="text-2xl">{{ formatTimeTaken }}</p>
                    </div>
                    <div>
                        <h4 class="font-medium text-text-gray-700">Answered</h4>
                        <p class="text-2xl text-green-600">{{ answeredCount }}</p>
                    </div>
                    <div>
                        <h4 class="font-medium text-gray-700">Skipped</h4>
                        <p class="text-2xl text-yellow-600">{{ skippedCount }}</p>
                    </div>
                </div>

                <!-- Questions Overview -->
                <div class="max-h-[400px] overflow-y-auto border rounded-lg">
                    <div v-for="(question, index) in quiz.questions" :key="index"
                        class="p-4 border-b last:border-b-0"
                        :class="{
                            'bg-green-50': userAnswers[index],
                            'bg-yellow-50': skippedQuestions[index],
                            'bg-gray-50': !userAnswers[index] && !skippedQuestions[index]
                        }">
                        <div class="flex justify-between items-start">
                            <div class="flex-1">
                                <h5 class="font-medium">Question {{ index + 1 }}</h5>
                                <p class="text-sm text-gray-600 line-clamp-1">{{ question.text }}</p>
                            </div>
                            <Tag :severity="getQuestionStatus(index)">
                                {{ getQuestionStatusText(index) }}
                            </Tag>
                        </div>
                        
                        <div v-if="userAnswers[index]" class="mt-2 text-sm text-gray-600">
                            <p>Selected Answer: {{ question.answers[userAnswers[index].answerId].text }}</p>
                            <p v-if="userAnswers[index].reasoning" class="mt-1 italic">
                                Reasoning: {{ userAnswers[index].reasoning }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <template #footer>
                <div class="flex justify-between items-center">
                    <Button label="Review Answers" 
                        icon="pi pi-eye"
                        severity="secondary"
                        @click="showSummary = false" />
                    
                    <div class="flex gap-2">
                        <Button v-if="unansweredCount > 0"
                            :label="`Submit Anyway (${unansweredCount} Unanswered)`"
                            icon="pi pi-check"
                            severity="warning"
                            @click="showSubmitConfirm = true" />
                        <Button v-else
                            label="Submit Quiz"
                            icon="pi pi-check"
                            severity="success"
                            @click="confirmSubmit" />
                    </div>
                </div>
            </template>
        </Dialog>

        <!-- Exit Confirmation Dialog -->
        <Dialog v-model:visible="showExitConfirm" modal :style="{ width: '450px' }">
            <template #header>
                <h3 class="font-bold text-xl text-red-600">Exit Quiz?</h3>
            </template>
            <p>Are you sure you want to exit the quiz? Your progress will be lost.</p>
            <template #footer>
                <div class="flex gap-2 justify-end">
                    <Button label="Cancel" @click="showExitConfirm = false" />
                    <Button label="Exit Quiz" severity="danger" @click="exitQuiz" />
                </div>
            </template>
        </Dialog>

        <!-- Submit Confirmation Dialog -->
        <Dialog v-model:visible="showSubmitConfirm" modal :style="{ width: '450px' }">
            <template #header>
                <h3 class="font-bold text-xl">Submit Quiz?</h3>
            </template>
            <p>Are you sure you want to submit the quiz? You can't change your answers after submission.</p>
            <div class="mt-4">
                <div class="text-sm text-gray-600">
                    <div>Total Questions: {{ quiz.questions.length }}</div>
                    <div>Answered: {{ answeredCount }}</div>
                    <div>Skipped: {{ skippedCount }}</div>
                    <div>Unanswered: {{ unansweredCount }}</div>
                </div>
            </div>
            <template #footer>
                <div class="flex gap-2 justify-end">
                    <Button label="Review Answers" @click="showSubmitConfirm = false" />
                    <Button label="Submit Quiz" severity="success" @click="confirmSubmit" />
                </div>
            </template>
        </Dialog>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import QuizTimer from '@/Components/Quiz/QuizTimer.vue';
import QuizProgress from '@/Components/Quiz/QuizProgress.vue';
import QuizQuestion from '@/Components/Quiz/QuizQuestion.vue';
import { router } from '@inertiajs/vue3';
import Tag from 'primevue/tag';

// Mock quiz data
const quiz = {
    id: 1,
    name: 'JavaScript Fundamentals Quiz',
    timeLimit: 30, // 30 minutes
    questions: [
        {
            id: 1,
            text: 'What is JavaScript?',
            hasImage: false,
            image: null,
            answers: [
                {
                    text: 'A programming language',
                    hasImage: false,
                    image: null
                },
                {
                    text: 'A markup language',
                    hasImage: false,
                    image: null
                },
                {
                    text: 'A styling language',
                    hasImage: false,
                    image: null
                },
                {
                    text: 'A database',
                    hasImage: false,
                    image: null
                }
            ]
        },
        {
            id: 2,
            text: 'What does this image show?',
            hasImage: true,
            image: 'https://picsum.photos/400/300', // Example image URL
            answers: [
                {
                    text: 'Answer 1',
                    hasImage: true,
                    image: 'https://picsum.photos/200/100'
                },
                {
                    text: 'Answer 2',
                    hasImage: false,
                    image: null
                },
                {
                    text: 'Answer 3',
                    hasImage: true,
                    image: 'https://picsum.photos/200/100'
                }
            ]
        },
        {
            id: 3,
            text: 'Which of the following is true about JavaScript variables?',
            hasImage: false,
            image: null,
            answers: [
                {
                    text: 'They must be declared using var',
                    hasImage: false,
                    image: null
                },
                {
                    text: 'They are dynamically typed',
                    hasImage: false,
                    image: null
                },
                {
                    text: 'They cannot be reassigned',
                    hasImage: false,
                    image: null
                }
            ]
        }
    ]
};

const currentQuestion = ref(0);
const userAnswers = ref(Array(quiz.questions.length).fill(null));
const skippedQuestions = ref(Array(quiz.questions.length).fill(false));
const showExitConfirm = ref(false);
const showSubmitConfirm = ref(false);
const isSubmitting = ref(false);
const showSummary = ref(false);

// Add timeLeft ref and startTime
const timeLeft = ref(quiz.timeLimit * 60);
const startTime = ref(Date.now());

// Computed properties
const isLastQuestion = computed(() => currentQuestion.value === quiz.questions.length - 1);
const isAnswered = computed(() => Boolean(userAnswers.value[currentQuestion.value]));
const answeredCount = computed(() => userAnswers.value.filter(Boolean).length);
const skippedCount = computed(() => skippedQuestions.value.filter(Boolean).length);
const unansweredCount = computed(() => {
    const total = quiz.questions.length;
    const answered = answeredCount.value;
    const skipped = skippedCount.value;
    return total - answered - skipped;
});
const formatTimeTaken = computed(() => {
    const timeTaken = Math.floor((Date.now() - startTime.value) / 1000);
    const hours = Math.floor(timeTaken / 3600);
    const minutes = Math.floor((timeTaken % 3600) / 60);
    const seconds = timeTaken % 60;
    
    if (hours > 0) {
        return `${hours}h ${minutes}m ${seconds}s`;
    }
    return `${minutes}m ${seconds}s`;
});

// Navigation methods
const nextQuestion = () => {
    if (currentQuestion.value < quiz.questions.length - 1) {
        currentQuestion.value++;
    }
};

const prevQuestion = () => {
    if (currentQuestion.value > 0) {
        currentQuestion.value--;
    }
};

const skipQuestion = () => {
    if (!isAnswered.value) {
        skippedQuestions.value[currentQuestion.value] = true;
        userAnswers.value[currentQuestion.value] = null; // Ensure answer is cleared
        if (!isLastQuestion.value) {
            nextQuestion();
        }
    }
};

const goToQuestion = (index) => {
    currentQuestion.value = index;
};

// Answer handling
const handleAnswer = (answerData) => {
    userAnswers.value[currentQuestion.value] = answerData;
    skippedQuestions.value[currentQuestion.value] = false; // Remove skip state when answered
};

// Mock submission
const submitQuiz = () => {
    showSummary.value = true;
};

const confirmSubmit = () => {
    isSubmitting.value = true;
    // Simulate API call
    setTimeout(() => {
        console.log('Quiz submitted:', {
            quizId: quiz.id,
            answers: userAnswers.value.map(answer => ({
                questionId: answer?.questionId,
                answerId: answer?.answerId,
                reasoning: answer?.reasoning,
                timestamp: answer?.timestamp
            }))
        });
        isSubmitting.value = false;
        showSubmitConfirm.value = false;
        router.visit(route('console.quizzes.index'));
    }, 1000);
};

// Timer and exit handling
const handleTimeout = () => {
    submitQuiz();
};

const handleTimerUpdate = (remainingTime) => {
    timeLeft.value = remainingTime;
};

const exitQuiz = () => {
    router.visit(route('console.quizzes.index'));
};

const getQuestionStatus = (index) => {
    if (userAnswers.value[index]) return 'success';
    if (skippedQuestions.value[index]) return 'warning';
    return 'danger';
};

const getQuestionStatusText = (index) => {
    if (userAnswers.value[index]) return 'Answered';
    if (skippedQuestions.value[index]) return 'Skipped';
    return 'Unanswered';
};
</script>