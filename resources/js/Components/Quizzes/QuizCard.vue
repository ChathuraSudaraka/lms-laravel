<template>
    <div class="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow">
        <div class="flex justify-between items-start mb-3">
            <h3 class="text-lg font-semibold text-gray-900">{{ quiz.title }}</h3>
            <Tag :value="quiz.status" :severity="getStatusSeverity(quiz.status)" />
        </div>

        <!-- Admin/Moderator View -->
        <template v-if="!userIsStudent">
            <div class="space-y-2 text-sm text-gray-600 mb-4">
                <div class="flex items-center gap-2">
                    <i class="pi pi-calendar text-gray-400"></i>
                    <span>Deadline: {{ new Date(quiz.deadline).toLocaleDateString() }}</span>
                </div>
                <div class="flex items-center gap-2">
                    <i class="pi pi-list text-gray-400"></i>
                    <span>{{ quiz.questionCount }} Questions</span>
                </div>
                <div class="flex items-center gap-2">
                    <i class="pi pi-users text-gray-400"></i>
                    <span>{{ quiz.studentCount }} Students Attempted</span>
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
        </template>

        <!-- Student View -->
        <template v-else>
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
                <div class="flex items-center gap-2" v-if="quiz.status === 'completed'">
                    <i class="pi pi-star text-gray-400"></i>
                    <span>{{ quiz.totalMarks }} / 100 Marks</span>
                </div>
                <div class="flex items-center gap-2" v-else>
                    <i class="pi pi-star text-gray-400"></i>
                    <span>{{ quiz.totalMarks }} Marks</span>
                </div>
            </div>

            <div class="flex items-center gap-2 mb-4">
                <Tag severity="info" :value="quiz.subject" />
                <Tag severity="warning" :value="`Grade ${quiz.grade}`" />
            </div>

            <div class="pt-4 border-t border-gray-100 flex justify-between items-center">
                <span class="text-xs text-gray-500">Available until {{ new Date(quiz.deadline).toLocaleDateString() }}</span>
                <Link :href="route('console.quizzes.view', { id: quiz.id })" v-if="quiz.status === 'active'">
                    <Button label="Take Quiz" size="small" />
                </Link>
                <Button v-else disabled size="small" :label="getButtonLabel(quiz.status)" />
            </div>
        </template>
    </div>
</template>

<script setup>
import { defineProps, computed } from 'vue';
import Tag from 'primevue/tag';
import Button from 'primevue/button';
import { Link } from '@inertiajs/vue3';
import { isStudent } from '@/Utils/IsStudent';

const props = defineProps({
    quiz: {
        type: Object,
        required: true
    }
});

// Create a computed property for student status
const userIsStudent = computed(() => isStudent());

const getStatusSeverity = (status) => {
    switch (status) {
        case 'active': return 'success';
        case 'completed': return 'info';
        case 'expired': return 'danger';
        default: return 'warning';
    }
};

const getButtonLabel = (status) => {
    switch (status) {
        case 'completed': return 'Completed';
        case 'expired': return 'Expired';
        default: return 'Unavailable';
    }
};
</script>

<style scoped>
:deep(.p-tag) {
    text-transform: capitalize;
}
</style>
