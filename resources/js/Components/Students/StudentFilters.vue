<script setup>
import { ref, watch } from 'vue';
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
    feeStatuses: {
        type: Array,
        default: () => ['paid', 'pending', 'unpaid']
    },
    hasActiveFilters: {
        type: Boolean,
        required: true
    }
});

const emit = defineEmits(['update:filters', 'clear-filters']);

// Create a local reactive copy of filters for v-model bindings
const localFilters = ref({
    global: { value: props.filters.global.value },
    grade: { value: props.filters.grade.value },
    status: { value: props.filters.status.value },
    feeStatus: { value: props.filters.feeStatus ? props.filters.feeStatus.value : null }
});

// Update localFilters when props change
watch(() => props.filters, (newVal) => {
    localFilters.value = { ...newVal };
}, { deep: true });

const updateFilter = (field, value) => {
    localFilters.value[field].value = value;
    emit('update:filters', localFilters.value);
};

const clearFilters = () => {
    localFilters.value = {
        global: { value: '' },
        grade: { value: null },
        status: { value: null },
        feeStatus: { value: null }
    };
    emit('update:filters', localFilters.value);
    emit('clear-filters');
};
</script>

<template>
    <div class="flex flex-col gap-4 mb-6">
        <!-- First row: Search -->
        <div class="flex flex-col sm:flex-row gap-4">
            <InputGroup class="flex-1">
                <InputGroupAddon>
                    <i class="pi pi-search" />
                </InputGroupAddon>
                <!-- Use v-model binding for immediate update -->
                <InputText 
                    v-model="localFilters.global.value"
                    placeholder="Search students..." 
                    class="w-full"
                />
            </InputGroup>
        </div>
        
        <!-- Second row: Filter dropdowns -->
        <div class="flex items-center gap-4">
            <div class="flex gap-4 flex-1">
                <Dropdown 
                    v-model="localFilters.grade.value"
                    @change="updateFilter('grade', $event.value)"
                    :options="grades" 
                    placeholder="Select Grade"
                    class="flex-1"
                />
                <Dropdown 
                    v-model="localFilters.status.value"
                    @change="updateFilter('status', $event.value)"
                    :options="statuses" 
                    placeholder="Status"
                    class="flex-1"
                />
                <Dropdown 
                    v-model="localFilters.feeStatus.value"
                    @change="updateFilter('feeStatus', $event.value)"
                    :options="feeStatuses" 
                    placeholder="Payment Status"
                    class="flex-1"
                >
                    <template #value="slotProps">
                        <div v-if="slotProps.value" class="flex items-center">
                            <i class="pi pi-money-bill mr-2 text-gray-500"></i>
                            <span>{{ slotProps.value.charAt(0).toUpperCase() + slotProps.value.slice(1) }}</span>
                        </div>
                        <div v-else class="flex items-center">
                            <i class="pi pi-money-bill mr-2 text-gray-500"></i>
                            <span>Payment Status</span>
                        </div>
                    </template>
                    <template #option="slotProps">
                        <div class="flex items-center">
                            <i class="pi pi-money-bill mr-2 text-gray-500"></i>
                            <span>{{ slotProps.option.charAt(0).toUpperCase() + slotProps.option.slice(1) }}</span>
                        </div>
                    </template>
                </Dropdown>
            </div>
            
            <!-- Clear filters button as icon-only -->
            <Button 
                v-if="hasActiveFilters"
                icon="pi pi-filter-slash"
                severity="secondary"
                text
                @click="clearFilters"
                tooltip="Clear all filters"
            />
        </div>
    </div>
</template>

<style scoped>
:deep(.p-inputtext) {
    width: 100%;
}

:deep(.p-dropdown) {
    min-width: 14rem;
}

/* Add this to ensure dropdowns expand properly */
:deep(.p-dropdown.flex-1) {
    width: 100%;
}
</style>
