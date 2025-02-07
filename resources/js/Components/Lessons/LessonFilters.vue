<script setup>
import InputText from "primevue/inputtext";
import Dropdown from "primevue/dropdown";
import MultiSelect from "primevue/multiselect";
import Button from "primevue/button";

defineProps({
    searchQuery: String,
    selectedGrade: String,
    selectedTags: Array,
    sortBy: String,
    grades: Array,
    tags: Array,
    sortOptions: Array,
    hasActiveFilters: Boolean
});

const emit = defineEmits(['update:searchQuery', 'update:selectedGrade', 'update:selectedTags', 'update:sortBy', 'reset']);
</script>

<template>
    <div class="mb-6">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
            <div class="col-span-1 sm:col-span-2">
                <InputText
                    :value="searchQuery"
                    @input="$emit('update:searchQuery', $event.target.value)"
                    placeholder="Search lessons..."
                    class="w-full"
                />
            </div>
            <Dropdown
                :value="selectedGrade"
                @update:modelValue="$emit('update:selectedGrade', $event)"
                :options="grades"
                placeholder="Select Grade"
                class="w-full"
            />
            <Dropdown
                :value="sortBy"
                @update:modelValue="$emit('update:sortBy', $event)"
                :options="sortOptions"
                optionLabel="label"
                placeholder="Sort By"
                class="w-full"
            />
        </div>
        <div class="flex items-center gap-3">
            <MultiSelect
                :value="selectedTags"
                @update:modelValue="$emit('update:selectedTags', $event)"
                :options="tags"
                optionLabel="name"
                placeholder="Select Tags"
                class="flex-1"
            />
            <Button 
                v-if="hasActiveFilters"
                icon="pi pi-filter-slash"
                @click="$emit('reset')"
                text
                size="small"
            />
        </div>
    </div>
</template>
