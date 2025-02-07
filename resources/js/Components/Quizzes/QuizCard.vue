<template>
    <div class="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow">
        <div class="flex justify-between items-start mb-3">
            <h3 class="text-lg font-semibold text-gray-900">{{ quiz.title }}</h3>
            <Tag :value="quiz.status" :severity="getStatusSeverity(quiz.status)" />
        </div>

        <div class="space-y-2 text-sm text-gray-600 mb-4">
            <div class="flex items-center gap-2">
                <i class="pi pi-calendar text-gray-400"></i>
                <span>Deadline: {{ new Date(quiz.deadline).toLocaleDateString() }}</span>
            </div>
            <div class="flex items-center gap-2">
                <i class="pi pi-clock text-gray-400"></i>
                <span>Duration: {{ quiz.duration }} minutes</span>
            </div>
            <div class="flex items-center gap-2">
                <i class="pi pi-list text-gray-400"></i>
                <span>{{ quiz.questionCount }} Questions</span>
            </div>
            <div class="flex items-center gap-2">
                <i class="pi pi-star text-gray-400"></i>
                <span>{{ quiz.totalMarks }} Marks</span>
            </div>
        </div>

        <div class="flex items-center gap-2 mb-4">
            <Tag severity="info" :value="quiz.subject" />
            <Tag severity="warning" :value="`Grade ${quiz.grade}`" />
        </div>

        <div class="pt-4 border-t border-gray-100 flex justify-between items-center">
            <span class="text-xs text-gray-500">
                Created {{ new Date(quiz.createdAt).toLocaleDateString() }}
            </span>
            <Link :href="route('console.quizzes.edit', quiz.id)">
                <Button label="Edit" size="small" text />
            </Link>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
import Tag from 'primevue/tag';
import Button from 'primevue/button';
import { Link } from '@inertiajs/vue3';

const props = defineProps({
    quiz: {
        type: Object,
        required: true
    }
});

const getStatusSeverity = (status) => {
    switch (status) {
        case 'active': return 'success';
        case 'completed': return 'info';
        case 'expired': return 'danger';
        default: return 'warning';
    }
};
</script>

<style scoped>
:deep(.p-tag) {
    text-transform: capitalize;
}
</style>
