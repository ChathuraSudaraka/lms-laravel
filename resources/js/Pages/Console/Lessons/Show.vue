<script setup>
import AppLayout from "@/Layouts/AppLayout.vue";
import Button from "primevue/button";
import Heading from "@/Components/Heading.vue";
import CreateLessonModal from "@/Components/Lessons/CreateLessonModal.vue";
import LessonCard from "@/Components/Lessons/LessonCard.vue";
import LessonFilters from "@/Components/Lessons/LessonFilters.vue";
import LessonEmptyState from "@/Components/Lessons/LessonEmptyState.vue";
import { useLessonFilters } from '@/Composables/useLessonFilters';
import { useSidebarStore } from '@/Stores/sidebarStore';
import { ref, computed, watch } from 'vue';
import Paginator from 'primevue/paginator';
import { isStudent } from "@/Utils/IsStudent";
import EditLessonModal from "@/Components/Lessons/EditLessonModal.vue";
import DeleteLessonModal from "@/Components/Lessons/DeleteLessonModal.vue";

const createModal = ref(false);
const loading = ref(false);
const lessons = ref([
    {
        id: 1,
        title: 'Introduction to Algebra',
        description: 'Learn the basics of algebraic expressions and equations',
        thumbnail: 'https://img.youtube.com/vi/XXXXX/maxresdefault.jpg',
        grade: '10',
        tags: ['Mathematics'],
        createdAt: '2024-01-15'
    },
    {
        id: 2,
        title: 'Cell Biology Fundamentals',
        description: 'Explore the basic structure and functions of cells',
        thumbnail: 'https://img.youtube.com/vi/YYYYY/maxresdefault.jpg',
        grade: '9',
        tags: ['Biology'],
        createdAt: '2024-01-16'
    },
    {
        id: 3,
        title: 'Introduction to Chemical Bonding',
        description: 'Understanding ionic and covalent bonds in chemistry',
        thumbnail: 'https://img.youtube.com/vi/ZZZZZ/maxresdefault.jpg',
        grade: '11',
        tags: ['Chemistry'],
        createdAt: '2024-01-17'
    },
]);

const {
    searchQuery,
    selectedGrade,
    selectedTags,
    sortBy,
    grades,
    tags, // Now computed from lessons
    sortOptions,
    hasActiveFilters,
    resetFilters,
    pagination,
    filterAndPaginateLessons,
    onPage,
    resetAll
} = useLessonFilters(lessons); // Pass lessons ref

const sidebarStore = useSidebarStore();

const paginatedLessons = computed(() => filterAndPaginateLessons(lessons.value));

// Watch for filter changes to reset pagination
watch([searchQuery, selectedGrade, selectedTags], () => {
    pagination.value.page = 0;
    pagination.value.first = 0;
});

// Update skeletonCount to consider sidebar state
const skeletonCount = computed(() => {
    if (window.innerWidth < 768) return 2;
    if (window.innerWidth < 1024) return sidebarStore.isCollapsed ? 3 : 2;
    if (window.innerWidth < 1536) return sidebarStore.isCollapsed ? 4 : 3;
    return sidebarStore.isCollapsed ? 5 : 4;
});

// Add grid classes computed property
const gridClasses = computed(() => ({
    'grid gap-4': true,
    'grid-cols-1': true,
    'sm:grid-cols-2': true,
    'lg:grid-cols-2': !sidebarStore.isCollapsed,
    'lg:grid-cols-3': sidebarStore.isCollapsed,
    'xl:grid-cols-3': !sidebarStore.isCollapsed,
    'xl:grid-cols-4': sidebarStore.isCollapsed,
    '2xl:grid-cols-4': !sidebarStore.isCollapsed,
    '2xl:grid-cols-5': sidebarStore.isCollapsed,
}));

const handleCreateLesson = (lessonData) => {
    // Handle lesson creation
    console.log('Creating lesson:', lessonData);
    lessons.value.unshift({
        id: lessons.value.length + 1,
        ...lessonData,
        thumbnail: 'https://img.youtube.com/vi/XXXXX/maxresdefault.jpg',
        createdAt: new Date().toISOString().split('T')[0]
    });
};

// Add refs for modals and selected lesson
const editModal = ref(false);
const deleteModal = ref(false);
const selectedLesson = ref(null);

// Add handlers
const handleEditLesson = (lesson) => {
    selectedLesson.value = lesson;
    editModal.value = true;
};

const handleDeleteLesson = (lesson) => {
    selectedLesson.value = lesson;
    deleteModal.value = true;
};

const updateLesson = (updatedLesson) => {
    const index = lessons.value.findIndex(l => l.id === updatedLesson.id);
    if (index !== -1) {
        lessons.value[index] = { ...updatedLesson };
    }
};

const deleteLesson = (lesson) => {
    lessons.value = lessons.value.filter(l => l.id !== lesson.id);
    deleteModal.value = false;
};
</script>

<template>
    <AppLayout>
        <div class="w-full p-4 md:p-6 lg:p-8 bg-white rounded-lg mb-6">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <Heading title="Lessons" :description="isStudent() ? 'Browse and learn from video lessons' : 'Create and manage your video lessons'" />
                <Button v-if="!isStudent()" label="Create Lesson" icon="pi pi-plus" @click="createModal = true" class="w-full sm:w-auto" />
            </div>

            <LessonFilters v-model:searchQuery="searchQuery" v-model:selectedGrade="selectedGrade"
                v-model:selectedTags="selectedTags" v-model:sortBy="sortBy" :grades="grades" :tags="tags"
                :sortOptions="sortOptions" :hasActiveFilters="hasActiveFilters" @reset="resetFilters" />

            <div :class="gridClasses">
                <template v-if="loading">
                    <div v-for="n in skeletonCount" :key="n" class="bg-white rounded-xl border border-gray-100 p-3">
                        <Skeleton height="160px" class="mb-3"></Skeleton>
                        <Skeleton width="85%" height="24px" class="mb-2"></Skeleton>
                        <Skeleton width="100%" height="60px" class="mb-3"></Skeleton>
                        <div class="flex gap-2 mb-3">
                            <Skeleton width="60px" height="24px"></Skeleton>
                            <Skeleton width="70px" height="24px"></Skeleton>
                        </div>
                        <Skeleton width="100%" height="1px" class="mb-3"></Skeleton>
                        <div class="flex justify-between">
                            <Skeleton width="100px" height="20px"></Skeleton>
                            <Skeleton width="60px" height="20px"></Skeleton>
                        </div>
                    </div>
                </template>
                <template v-else>
                    <LessonCard 
                        v-for="lesson in paginatedLessons.items" 
                        :key="lesson.id" 
                        :lesson="lesson"
                        @edit="handleEditLesson"
                        @delete="handleDeleteLesson"
                    />
                </template>
            </div>

            <LessonEmptyState v-if="!loading && paginatedLessons.items.length === 0"
                :hasActiveFilters="hasActiveFilters" @create="createModal = true" />

            <!-- Enhanced Paginator -->
            <div v-if="paginatedLessons.totalRecords > 0"
                class="flex flex-col sm:flex-row items-center gap-4 mt-6 pt-4">
                <div class="text-sm text-gray-600 order-2 sm:order-1">
                    Total {{ paginatedLessons.totalRecords }} lessons
                </div>
                <Paginator v-model:first="pagination.first" v-model:rows="pagination.rows"
                    :totalRecords="paginatedLessons.totalRecords" :rowsPerPageOptions="[10, 20, 30, 50]" @page="onPage"
                    template="RowsPerPageDropdown FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport"
                    class="ml-auto order-1 sm:order-2">
                    <template #CurrentPageReport="slotProps">
                        <span class="text-sm text-gray-500 hidden sm:inline-block ml-4">
                            Showing {{ slotProps.first + 1 }} to {{ Math.min(slotProps.last,
                            paginatedLessons.totalRecords) }}
                        </span>
                    </template>
                </Paginator>
            </div>
        </div>

        <CreateLessonModal v-model:visible="createModal" :grades="grades" @save="handleCreateLesson" />
        <EditLessonModal 
            v-model:visible="editModal"
            :lesson="selectedLesson"
            :grades="grades"
            :tags="tags"
            @save="updateLesson"
        />
        <DeleteLessonModal
            v-model:visible="deleteModal"
            :lesson="selectedLesson"
            @confirm="deleteLesson"
        />
    </AppLayout>
</template>

<style scoped>
.p-inputtext,
.p-dropdown,
.p-multiselect {
    width: 100%;
}

@media (min-width: 640px) {
    .grid-cols-1 {
        gap: 1.5rem;
    }
}

:deep(.p-paginator) {
    border: none;
    padding: 0;
    justify-content: flex-end;
    background-color: transparent;
    gap: 0.25rem;
}

:deep(.p-paginator-page),
:deep(.p-paginator-first),
:deep(.p-paginator-last),
:deep(.p-paginator-next),
:deep(.p-paginator-prev) {
    min-width: 2.25rem;
    height: 2.25rem;
    margin: 0;
    border: none;
    border-radius: 0.375rem;
    color: #4b5563;
    background-color: transparent;
}

:deep(.p-paginator-page.p-highlight) {
    background-color: var(--primary-50);
    color: var(--primary-600);
    font-weight: 600;
}

:deep(.p-paginator .p-dropdown) {
    height: 2.25rem;
    margin-right: 0.75rem;
    border-radius: 0.375rem;
    background-color: transparent;
    border: 1px solid #e5e7eb;
}

:deep(.p-dropdown-label) {
    padding: 0 0.5rem;
}

:deep(.p-paginator .p-paginator-current) {
    color: #6b7280;
}

:deep(.p-paginator-page:not(.p-highlight):hover),
:deep(.p-paginator-first:hover),
:deep(.p-paginator-last:hover),
:deep(.p-paginator-next:hover),
:deep(.p-paginator-prev:hover) {
    background-color: #f3f4f6;
}

:deep(.p-paginator .p-dropdown:hover) {
    border-color: var(--primary-400);
}

:deep(.p-paginator .p-dropdown:focus) {
    box-shadow: none;
    border-color: var(--primary-500);
}

:deep(.p-dropdown-panel .p-dropdown-items .p-dropdown-item.p-highlight) {
    background-color: var(--primary-50);
    color: var(--primary-600);
}
</style>