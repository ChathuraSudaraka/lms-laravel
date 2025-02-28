<script setup>
import AppLayout from "@/Layouts/AppLayout.vue";
import Heading from "@/Components/Heading.vue";
import { ref, computed } from 'vue';
import { useSidebarStore } from '@/Stores/sidebarStore';
import { Link } from '@inertiajs/vue3';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';

const sidebarStore = useSidebarStore();

// Basic state setup
const loading = ref(false);
const searchQuery = ref('');
const classes = ref([]);

// Grid layout classes computed property
const gridClasses = computed(() => ({
    'grid gap-4': true,
    'grid-cols-1': true,
    'lg:grid-cols-2': !sidebarStore.isCollapsed,
    'lg:grid-cols-3': sidebarStore.isCollapsed,
    'xl:grid-cols-3': !sidebarStore.isCollapsed,
    'xl:grid-cols-4': sidebarStore.isCollapsed,
}));
</script>

<template>
    <AppLayout>
        <div class="w-full p-4 md:p-6 lg:p-8 bg-white rounded-lg mb-6">
            <!-- Header -->
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <Heading 
                    title="Classes" 
                    description="Manage your classes" 
                />
                <Link :href="route('console.classes.new')" class="w-full sm:w-auto">
                    <Button label="Create Class" icon="pi pi-plus" class="w-full sm:w-auto" />
                </Link>
            </div>

            <!-- Search Bar -->
            <div class="mb-6">
                <InputGroup class="w-full md:max-w-md">
                    <InputGroupAddon>
                        <i class="pi pi-search" />
                    </InputGroupAddon>
                    <InputText
                        v-model="searchQuery"
                        placeholder="Search classes..."
                        class="w-full"
                    />
                </InputGroup>
            </div>

            <!-- Classes Grid -->
            <div :class="gridClasses">
                <!-- Content will be added later -->
                <div class="text-center py-12">
                    <i class="pi pi-folder-open text-4xl text-gray-400 mb-4"></i>
                    <h3 class="text-lg font-medium text-gray-900 mb-2">No classes found</h3>
                    <p class="text-gray-500 mb-4">
                        Start by creating your first class
                    </p>
                </div>
            </div>
        </div>
    </AppLayout>
</template>