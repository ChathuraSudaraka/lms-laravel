<template>
    <AppLayout>
        <div class="w-full p-5 md:p-8 bg-white rounded-lg mb-6">
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div class="flex items-center gap-4">
                    <Button icon="pi pi-arrow-left" rounded text severity="secondary" aria-label="Back" />
                    <Heading title="Quiz Details" description="View quiz questions and answers" />
                </div>
                <Button icon="pi pi-times" severity="danger" label="Terminate Quiz" />
            </div>
        </div>
    </AppLayout>
</template>

<script setup>
import AppLayout from '@/Layouts/AppLayout.vue'
import Heading from '@/Components/Heading.vue'
import Button from 'primevue/button'
</script>