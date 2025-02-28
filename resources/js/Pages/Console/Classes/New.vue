<script setup>
import AppLayout from "@/Layouts/AppLayout.vue";
import Heading from "@/Components/Heading.vue";
import { ref } from 'vue';
import { Link } from '@inertiajs/vue3';
import Button from 'primevue/button';

</script>

<template>
    <AppLayout>
        <div class="max-w-7xl mx-auto">
            <div class="w-full p-5 md:p-8 bg-white rounded-lg mb-6">
                <!-- Header with back button -->
                <div class="flex flex-col md:flex-row md:items-center gap-4 mb-8">
                    <Link :href="route('console.classes.index')">
                        <Button icon="pi pi-arrow-left" rounded text 
                            severity="secondary" aria-label="Back" />
                    </Link>
                    <Heading title="Create New Class" 
                        description="Create a new class and setup details" />
                </div>

                <!-- Content will be added later -->
                <div class="text-center py-12">
                    <i class="pi pi-folder-open text-4xl text-gray-400 mb-4"></i>
                    <h3 class="text-lg font-medium text-gray-900 mb-2">Class creation form coming soon</h3>
                </div>
            </div>
        </div>
    </AppLayout>
</template>