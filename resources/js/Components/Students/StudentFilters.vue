<script setup>
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import Button from 'primevue/button';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';

const props = defineProps({
    filters: {
        type: Object,
        required: true
    },
    grades: {
        type: Array,
        required: true
    },
    statuses: {
        type: Array,
        required: true
    },
    hasActiveFilters: {
        type: Boolean,
        required: true
    }
});

const emit = defineEmits(['update:filters', 'clear-filters']);

const updateFilter = (field, value) => {
    emit('update:filters', {
        ...props.filters,
        [field]: { ...props.filters[field], value }
    });
};
</script>

<template>
    <div class="flex flex-col gap-4 mb-6">
        <!-- First row: Search and dropdowns -->
        <div class="flex flex-col sm:flex-row gap-4">
            <InputGroup class="flex-1">
                <InputGroupAddon>
                    <i class="pi pi-search" />
                </InputGroupAddon>
                <InputText 
                    :value="filters.global.value"
                    @input="updateFilter('global', $event.target.value)"
                    placeholder="Search students..." 
                    class="w-full"
                />
            </InputGroup>
            <div class="flex gap-4">
                <Dropdown 
                    :value="filters.grade.value"
                    @change="updateFilter('grade', $event.value)"
                    :options="grades" 
                    placeholder="Select Grade"
                    class="w-48"
                />
                <Dropdown 
                    :value="filters.status.value"
                    @change="updateFilter('status', $event.value)"
                    :options="statuses" 
                    placeholder="Status"
                    class="w-48"
                />
            </div>
        </div>
        
        <!-- Clear filters button -->
        <div class="flex items-center gap-3">
            <div class="flex-1"></div>
            <Button 
                v-if="hasActiveFilters"
                icon="pi pi-filter-slash" 
                severity="secondary" 
                text
                @click="$emit('clear-filters')" 
                tooltip="Clear all filters" 
            />
        </div>
    </div>
</template>

<style scoped>
:deep(.p-dropdown),
:deep(.p-inputtext) {
    width: 100%;
}
</style>
