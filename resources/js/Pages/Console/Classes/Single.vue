<script setup>
import AppLayout from "@/Layouts/AppLayout.vue";
import { ref } from 'vue';
import { Link } from '@inertiajs/vue3';
import Button from 'primevue/button';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';

const activeTab = ref(0);

</script>

<template>
    <AppLayout>
        <div class="w-full space-y-6">
            <!-- Header Section -->
            <div class="flex flex-col md:flex-row md:items-center gap-4 mb-6">
                <Link :href="route('console.classes.index')">
                    <Button icon="pi pi-arrow-left" rounded text severity="secondary" aria-label="Back" />
                </Link>
                <h1 class="text-xl md:text-2xl font-semibold text-gray-900">
                    View Class
                </h1>
            </div>

            <!-- Content Section -->
            <div class="bg-white rounded-xl shadow-sm overflow-hidden">
                <TabView v-model:activeIndex="activeTab">
                    <TabPanel header="Overview">
                        <div class="p-4">
                            <p class="text-gray-600">Class overview coming soon</p>
                        </div>
                    </TabPanel>
                    <TabPanel header="Students">
                        <div class="p-4">
                            <p class="text-gray-600">Student list coming soon</p>
                        </div>
                    </TabPanel>
                    <TabPanel header="Schedule">
                        <div class="p-4">
                            <p class="text-gray-600">Class schedule coming soon</p>
                        </div>
                    </TabPanel>
                </TabView>
            </div>
        </div>
    </AppLayout>
</template>

<style scoped>
:deep(.p-tabview-panels) {
    padding: 0;
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