<script setup>
import { computed } from 'vue';
import InputText from "primevue/inputtext";
import Dropdown from "primevue/dropdown";
import MultiSelect from "primevue/multiselect";
import Button from "primevue/button";
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';

const props = defineProps({
    searchQuery: String,
    selectedGrade: String,
    selectedTags: Array,
    sortBy: String,
    grades: Array,
    tags: Array,
    sortOptions: Array,
    hasActiveFilters: Boolean
});
const emit = defineEmits([
    'update:searchQuery',
    'update:selectedGrade',
    'update:selectedTags',
    'update:sortBy',
    'reset'
]);

// Create two-way bindings using computed getters/setters
const vSearchQuery = computed({
    get: () => props.searchQuery,
    set: val => emit('update:searchQuery', val)
});
const vSelectedGrade = computed({
    get: () => props.selectedGrade,
    set: val => emit('update:selectedGrade', val)
});
const vSelectedTags = computed({
    get: () => props.selectedTags,
    set: val => emit('update:selectedTags', val)
});
const vSortBy = computed({
    get: () => props.sortBy,
    set: val => emit('update:sortBy', val)
});
</script>

<template>
    <div class="flex flex-col gap-4 mb-6">
        <div class="flex flex-col sm:flex-row gap-4">
            <InputGroup class="flex-1">
                <InputGroupAddon>
                    <i class="pi pi-search" />
                </InputGroupAddon>
                <!-- Use v-model binding with computed property -->
                <InputText
                    v-model="vSearchQuery"
                    placeholder="Search lessons..."
                    class="w-full"
                />
            </InputGroup>
            <div class="flex gap-4">
                <Dropdown
                    v-model="vSelectedGrade"
                    :options="grades"
                    placeholder="Select Grade"
                    class="w-48"
                />
                <Dropdown
                    v-model="vSortBy"
                    :options="sortOptions"
                    optionLabel="label"
                    placeholder="Sort By"
                    class="w-48"
                />
            </div>
        </div>
        <div class="flex items-center gap-3">
            <MultiSelect
                v-model="vSelectedTags"
                :options="tags"
                optionLabel="name"
                placeholder="Select Tags"
                class="flex-1"
            />
            <Button 
                v-if="props.hasActiveFilters"
                icon="pi pi-filter-slash"
                severity="secondary"
                text
                @click="$emit('reset')"
                tooltip="Clear all filters"
            />
        </div>
    </div>
</template>

<style scoped>
:deep(.p-dropdown),
:deep(.p-multiselect),
:deep(.p-inputtext) {
    width: 100%;
}
</style>
