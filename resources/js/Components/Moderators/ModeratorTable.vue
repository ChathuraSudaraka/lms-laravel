<script setup>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import Tag from 'primevue/tag';

const props = defineProps({
    moderators: {
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

const emit = defineEmits(['clear-filters', 'suspend']);

const getStatusSeverity = (status) => {
    switch (status) {
        case 'Active':
            return 'success';
        case 'Suspended':
            return 'danger';
        default:
            return 'warning';
    }
};
</script>

<template>
    <DataTable 
        :value="moderators" 
        paginator 
        :rows="10" 
        :filters="filters"
        filterDisplay="menu"
        :globalFilterFields="['name', 'email']"
        :loading="loading"
    >
        <Column field="name" header="Name" sortable></Column>
        <Column field="email" header="Email" sortable></Column>
        <Column field="status" header="Status" sortable>
            <template #body="{ data }">
                <Tag :value="data.status" :severity="getStatusSeverity(data.status)" />
            </template>
        </Column>
        <Column :exportable="false" style="min-width:8rem">
            <template #body="{ data }">
                <Button 
                    :icon="data.status === 'Active' ? 'pi pi-ban' : 'pi pi-check'" 
                    :label="data.status === 'Active' ? 'Suspend' : 'Activate'"
                    :severity="data.status === 'Active' ? 'danger' : 'success'"
                    text
                    rounded
                    @click="$emit('suspend', data)"
                />
            </template>
        </Column>

        <template #empty>
            <div class="text-center p-4">
                <div v-if="hasActiveFilters">
                    <i class="pi pi-filter-slash text-4xl text-gray-400 mb-4"></i>
                    <p class="text-gray-600">No results found for the current filters</p>
                    <Button label="Clear Filters" icon="pi pi-filter-slash" text @click="$emit('clear-filters')" class="mt-2" />
                </div>
                <div v-else>
                    <i class="pi pi-users text-4xl text-gray-400 mb-4"></i>
                    <p class="text-gray-600">No moderators found</p>
                </div>
            </div>
        </template>
    </DataTable>
</template>
