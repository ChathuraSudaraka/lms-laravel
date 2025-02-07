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
    <div class="flex items-center gap-4 mb-4">
        <div class="flex gap-4 flex-1">
            <InputGroup>
                <InputGroupAddon>
                    <i class="pi pi-search" />
                </InputGroupAddon>
                <InputText 
                    :value="filters.global.value"
                    @input="updateFilter('global', $event.target.value)"
                    placeholder="Search globally..." 
                />
            </InputGroup>
            <Dropdown 
                :value="filters.grade.value"
                @change="updateFilter('grade', $event.value)"
                :options="grades" 
                placeholder="Select Grade"
            />
            <Dropdown 
                :value="filters.status.value"
                @change="updateFilter('status', $event.value)"
                :options="statuses" 
                placeholder="Status"
            />
        </div>
        <Button 
            v-show="hasActiveFilters" 
            icon="pi pi-filter-slash" 
            severity="secondary" 
            text
            @click="$emit('clear-filters')" 
            tooltip="Clear all filters" 
        />
    </div>
</template>
