<template>
    <AppLayout>
        <div class="w-full p-5 md:p-8 bg-white rounded-lg mb-6">
            <div class="flex flex-col md:flex-row md:justify-between md:items-center">
                <Heading 
                    title="Quiz"
                    description="Manage your quizzes and their questions" 
                />
                <div class="mt-4 md:mt-0">
                    <Link :href="route('console.quizzes.new')">
                        <Button 
                            label="Create New Quiz" 
                            icon="pi pi-plus"
                            severity="primary"
                        />
                    </Link>
                </div>
            </div>
        </div>
    </AppLayout>
</template>

<script setup>
import AppLayout from '@/Layouts/AppLayout.vue'
import Heading from '@/Components/Heading.vue'
import Button from 'primevue/button'
import { Link } from '@inertiajs/vue3'
</script>