<script setup>
import AppLayout from "@/Layouts/AppLayout.vue";
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import Button from 'primevue/button';
import { router, Link } from '@inertiajs/vue3';
import StudentOverview from '@/Components/Students/Details/StudentOverview.vue';
import StudentContact from '@/Components/Students/Details/StudentContact.vue';
import StudentFeesHistory from '@/Components/Students/Details/StudentFeesHistory.vue';

const props = defineProps({
    student: {
        type: Object,
        required: true
    }
});
</script>

<template>
    <AppLayout>
        <div class="w-full space-y-6">
            <!-- Header Section -->
            <div class="bg-white p-5 md:p-8 rounded-lg">
                <div class="flex items-center gap-4 mb-6">
                    <Link :href="route('console.students.index')">
                        <Button 
                            icon="pi pi-arrow-left" 
                            text 
                            rounded 
                            aria-label="Back" 
                        />
                    </Link>
                    <h1 class="text-xl md:text-2xl font-semibold text-gray-900">
                        Student Information
                    </h1>
                </div>

                <!-- Tab View -->
                <TabView>
                    <TabPanel header="Overview">
                        <StudentOverview :student="student" />
                    </TabPanel>
                    <TabPanel header="Contact Information">
                        <StudentContact :student="student" />
                    </TabPanel>
                    <TabPanel header="Fees History">
                        <StudentFeesHistory :student="student" />
                    </TabPanel>
                </TabView>
            </div>
        </div>
    </AppLayout>
</template>

<style scoped>
:deep(.p-tabview-panels) {
    padding: 1.5rem 0;
}

:deep(.p-tabview-nav) {
    border-bottom: 1px solid #e5e7eb;
}

:deep(.p-tabview-nav-link) {
    color: #4b5563;
}

:deep(.p-tabview-selected .p-tabview-nav-link) {
    color: var(--primary-600);
}
</style>