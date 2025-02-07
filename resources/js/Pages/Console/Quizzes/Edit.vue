<template>
    <AppLayout>
        <div class="w-full p-5 md:p-8 bg-white rounded-lg mb-6">
            <div class="flex flex-col md:flex-row md:items-center gap-4">
                <Button icon="pi pi-arrow-left" rounded text severity="secondary" aria-label="Back" />
                <Heading title="Edit Quiz" description="Modify quiz questions and answers" />
            </div>
            <div class="mt-6">
                <form @submit.prevent="updateQuiz">
                    <!-- Quiz form content will go here -->
                    <Button type="submit" label="Save Changes" icon="pi pi-save" severity="primary" class="mt-4" />
                </form>
            </div>
        </div>
    </AppLayout>
</template>

<script setup>
import AppLayout from '@/Layouts/AppLayout.vue'
import Heading from '@/Components/Heading.vue'
import Button from 'primevue/button'
</script>