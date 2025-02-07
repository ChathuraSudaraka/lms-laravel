<script setup>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';

defineProps({
    students: {
        type: Array,
        required: true
    },
    filters: {
        type: Object,
        required: true
    },
    loading: {
        type: Boolean,
        default: false
    },
    hasActiveFilters: {
        type: Boolean,
        required: true
    }
});

const emit = defineEmits(['clear-filters']);
</script>

<template>
    <DataTable :value="students" paginator :rows="10" :filters="filters" filterDisplay="menu"
        :globalFilterFields="['name', 'email', 'grade']" :loading="loading">
        <Column field="name" header="Name" sortable></Column>
        <Column field="email" header="Email" sortable></Column>
        <Column field="grade" header="Grade" sortable></Column>
        <Column field="status" header="Status" sortable>
            <template #body="{ data }">
                <span :class="{
                    'text-yellow-600': data.status === 'Pending',
                    'text-green-600': data.status === 'Active'
                }">
                    {{ data.status }}
                </span>
            </template>
        </Column>

        <template #empty>
            <div class="text-center p-4">
                <div v-if="hasActiveFilters">
                    <i class="pi pi-filter-slash text-4xl text-gray-400 mb-4"></i>
                    <p class="text-gray-600">No results found for the current filters</p>
                    <Button label="Clear Filters" icon="pi pi-filter-slash" text @click="$emit('clear-filters')"
                        class="mt-2" />
                </div>
                <div v-else>
                    <i class="pi pi-users text-4xl text-gray-400 mb-4"></i>
                    <p class="text-gray-600">No students found</p>
                </div>
            </div>
        </template>

        <template #loading>
            <div class="text-center p-4">
                <i class="pi pi-spin pi-spinner text-4xl text-gray-400 mb-4"></i>
                <p class="text-gray-600">Loading students...</p>
            </div>
        </template>
    </DataTable>
</template>
