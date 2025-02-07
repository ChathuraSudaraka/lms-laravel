<template>
    <div class="flex flex-col sm:flex-row gap-4 mb-6">
        <InputGroup class="flex-1">
            <InputGroupAddon>
                <i class="pi pi-search"></i>
            </InputGroupAddon>
            <InputText v-model="search" placeholder="Search quizzes..." class="w-full" />
        </InputGroup>
        <div class="flex gap-4">
            <Dropdown v-model="status" :options="statusOptions" optionLabel="label" optionValue="value"
                placeholder="Filter Status" class="w-full sm:w-48" />
            <Dropdown v-model="sort" :options="sortOptions" optionLabel="label" optionValue="value"
                placeholder="Sort by" class="w-full sm:w-48" />
        </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';

const props = defineProps({
    searchQuery: String,
    selectedStatus: String,
    sortBy: String,
    statusOptions: Array,
    sortOptions: Array,
});

const emit = defineEmits(['update:searchQuery', 'update:selectedStatus', 'update:sortBy']);

const search = computed({
    get: () => props.searchQuery,
    set: (value) => emit('update:searchQuery', value)
});

const status = computed({
    get: () => props.selectedStatus,
    set: (value) => emit('update:selectedStatus', value)
});

const sort = computed({
    get: () => props.sortBy,
    set: (value) => emit('update:sortBy', value)
});
</script>

<style scoped>
:deep(.p-dropdown),
:deep(.p-inputtext) {
    width: 100%;
}
</style>
