<template>
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <Heading 
            title="Quizzes" 
            :description="isStudent() ? 'Take quizzes assigned to you' : 'Create and manage your quizzes'" 
        />
        <Link :href="route('console.quizzes.new')" class="w-full sm:w-auto">
            <Button v-if = !isStudent() label="Create Quiz" icon="pi pi-plus" class="w-full sm:w-auto" />
        </Link>
    </div>
</template>

<script setup>
import Heading from '@/Components/Heading.vue';
import Button from 'primevue/button';
import { Link } from '@inertiajs/vue3';
import { isStudent } from '@/Utils/IsStudent';
</script>
