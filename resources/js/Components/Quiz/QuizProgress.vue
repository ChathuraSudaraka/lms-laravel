<template>
    <div class="bg-white p-4 rounded-lg shadow-sm">
        <div class="grid grid-cols-6 gap-2 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12">
            <Button v-for="i in totalQuestions" :key="i"
                :class="getQuestionButtonClass(i-1)"
                :severity="getQuestionSeverity(i-1)"
                :pt="{
                    root: { class: 'w-full min-w-[40px] h-[40px] relative' }
                }"
                @click="$emit('goto', i-1)">
                <span>{{ i }}</span>
                <i :class="getQuestionIcon(i-1)" 
                   class="absolute bottom-1 right-1 text-[0.6rem]"></i>
            </Button>
        </div>
        
        <!-- Status Legend -->
        <div class="flex justify-center gap-6 mt-4 text-sm">
            <span class="flex items-center gap-1">
                <i class="pi pi-check text-green-500"></i>
                <span>Answered ({{ answeredCount }})</span>
            </span>
            <span class="flex items-center gap-1">
                <i class="pi pi-forward text-yellow-500"></i>
                <span>Skipped ({{ skippedCount }})</span>
            </span>
            <span class="flex items-center gap-1">
                <i class="pi pi-circle text-gray-400"></i>
                <span>Pending ({{ pendingCount }})</span>
            </span>
        </div>
    </div>
</template>

<script setup>
import Button from 'primevue/button';
import { computed } from 'vue';

const props = defineProps({
    totalQuestions: {
        type: Number,
        required: true
    },
    currentQuestion: {
        type: Number,
        required: true
    },
    answers: {
        type: Array,
        required: true
    },
    skipped: {
        type: Array,
        required: true
    }
});

defineEmits(['goto']);

const answeredCount = computed(() => props.answers.filter(Boolean).length);
const skippedCount = computed(() => props.skipped.filter(Boolean).length);
const pendingCount = computed(() => props.totalQuestions - answeredCount.value - skippedCount.value);

const getQuestionButtonClass = (index) => ({
    'p-button-sm': true,
    'p-button-outlined': index !== props.currentQuestion,
    'cursor-pointer': true,
    'p-button-warning': props.skipped[index],
    'p-button-success': props.answers[index] && !props.skipped[index]
});

const getQuestionSeverity = (index) => {
    if (index === props.currentQuestion) return 'primary';
    if (props.skipped[index]) return 'warning';
    if (props.answers[index]) return 'success';
    return 'secondary';
};

const getQuestionIcon = (index) => {
    if (props.skipped[index]) return 'pi pi-forward';
    if (props.answers[index]) return 'pi pi-check';
    return 'pi pi-circle';
};
</script>
