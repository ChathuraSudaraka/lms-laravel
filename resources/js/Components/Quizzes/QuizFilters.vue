<template>
    <div class="flex flex-col gap-4 mb-6">
        <!-- Search Row -->
        <div class="flex flex-col sm:flex-row gap-4">
            <InputGroup class="flex-1">
                <InputGroupAddon>
                    <i class="pi pi-search" />
                </InputGroupAddon>
                <InputText
                    v-model="vSearchQuery"
                    placeholder="Search quizzes..."
                    class="w-full"
                />
            </InputGroup>
            
            <!-- Student view - all filters in one row -->
            <template v-if="isStudent()">
                <div class="flex gap-4">
                    <Dropdown
                        v-model="vStatus"
                        :options="statusOptions"
                        optionLabel="label"
                        placeholder="Filter Status"
                        class="w-56"
                    />
                    <Dropdown
                        v-model="vSortBy"
                        :options="sortOptions"
                        optionLabel="label"
                        placeholder="Sort By"
                        class="w-56"
                    />
                    <Button 
                        v-if="hasActiveFilters"
                        icon="pi pi-filter-slash"
                        severity="secondary"
                        text
                        @click="$emit('reset')"
                        tooltip="Clear all filters"
                    />
                </div>
            </template>
            <!-- Non-student view - Sort in first row -->
            <template v-else>
                <Dropdown
                    v-model="vSortBy"
                    :options="sortOptions"
                    optionLabel="label"
                    placeholder="Sort By"
                    class="w-56"
                />
            </template>
        </div>

        <!-- Additional Filters Row (Non-student only) -->
        <div v-if="!isStudent()" class="flex items-center gap-4">
            <div class="flex gap-4 flex-1">
                <Dropdown
                    v-model="vSelectedGrade"
                    :options="grades"
                    placeholder="Select Grade"
                    class="flex-1"
                />
                <Dropdown
                    v-model="vStatus"
                    :options="statusOptions"
                    optionLabel="label"
                    placeholder="Filter Status"
                    class="flex-1"
                />
            </div>
            <Button 
                v-if="hasActiveFilters"
                icon="pi pi-filter-slash"
                severity="secondary"
                text
                @click="$emit('reset')"
                tooltip="Clear all filters"
            />
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import Button from 'primevue/button';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import { isStudent } from "@/Utils/IsStudent";

const props = defineProps({
    searchQuery: String,
    selectedGrade: String,
    selectedStatus: String,
    sortBy: {
        type: [String, Object],
        default: 'newest'
    },
    grades: {
        type: Array,
        default: () => ['6', '7', '8', '9', '10', '11', '12', '13']
    },
    statusOptions: Array,
    sortOptions: Array,
    hasActiveFilters: {
        type: Boolean,
        default: false
    }
});

const emit = defineEmits([
    'update:searchQuery',
    'update:selectedGrade',
    'update:selectedStatus',
    'update:sortBy',
    'reset'
]);

const vSearchQuery = computed({
    get: () => props.searchQuery,
    set: val => emit('update:searchQuery', val)
});

const vSelectedGrade = computed({
    get: () => props.selectedGrade,
    set: val => emit('update:selectedGrade', val)
});

const vStatus = computed({
    get: () => props.selectedStatus,
    set: val => emit('update:selectedStatus', val)
});

const vSortBy = computed({
    get: () => props.sortBy,
    set: val => emit('update:sortBy', val)
});
</script>

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
