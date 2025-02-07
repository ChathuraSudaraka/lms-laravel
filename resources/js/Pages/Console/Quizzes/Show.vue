<template>
    <AppLayout>
        <div class="w-full p-4 md:p-6 lg:p-8 bg-white rounded-lg mb-6">
            <QuizHeader />
            
            <QuizFilters
                v-model:searchQuery="searchQuery"
                v-model:selectedStatus="selectedStatus"
                v-model:sortBy="sortBy"
                :statusOptions="statusOptions"
                :sortOptions="sortOptions"
            />

            <!-- Quizzes Grid -->
            <div :class="gridClasses">
                <template v-if="loading">
                    <div v-for="n in 6" :key="n">
                        <Skeleton height="24px" class="mb-2" />
                        <Skeleton width="60%" height="20px" class="mb-4" />
                        <div class="space-y-2">
                            <Skeleton width="40%" height="16px" />
                            <Skeleton width="35%" height="16px" />
                            <Skeleton width="45%" height="16px" />
                        </div>
                    </div>
                </template>
                <template v-else>
                    <QuizCard
                        v-for="quiz in paginatedQuizzes.items"
                        :key="quiz.id"
                        :quiz="quiz"
                    />
                </template>
            </div>

            <!-- Empty State -->
            <div v-if="!loading && paginatedQuizzes.items.length === 0" class="text-center py-12">
                <i class="pi pi-file-edit text-4xl text-gray-400 mb-4"></i>
                <h3 class="text-lg font-medium text-gray-900 mb-2">No quizzes found</h3>
                <p class="text-gray-500 mb-4">
                    {{ searchQuery || selectedStatus ? 'Try adjusting your filters' : 'Start by creating a quiz' }}
                </p>
                <Link :href="route('console.quizzes.new')" v-if="!searchQuery && !selectedStatus">
                    <Button label="Create First Quiz" icon="pi pi-plus" />
                </Link>
                <Button v-else label="Clear Filters" severity="secondary" @click="resetFilters" />
            </div>

            <!-- Pagination -->
            <div v-if="paginatedQuizzes.totalRecords > 0"
                class="flex flex-col sm:flex-row items-center gap-4 mt-6 pt-4 border-t border-gray-100">
                <div class="text-sm text-gray-600">
                    Total {{ paginatedQuizzes.totalRecords }} quizzes
                </div>
                <Paginator v-model:first="pagination.first" v-model:rows="pagination.rows"
                    :totalRecords="paginatedQuizzes.totalRecords"
                    :rowsPerPageOptions="[10, 20, 30, 50]"
                    @page="onPage"
                    template="RowsPerPageDropdown FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
                    class="ml-auto"
                />
            </div>
        </div>
    </AppLayout>
</template>

<script setup>
import AppLayout from "@/Layouts/AppLayout.vue";
import QuizHeader from "@/Components/Quizzes/QuizHeader.vue";
import QuizFilters from "@/Components/Quizzes/QuizFilters.vue";
import QuizCard from "@/Components/Quizzes/QuizCard.vue";
import Skeleton from 'primevue/skeleton';
import Paginator from 'primevue/paginator';
import Button from 'primevue/button';
import { Link } from '@inertiajs/vue3';
import { computed, ref } from 'vue';
import { useSidebarStore } from '@/Stores/sidebarStore';
import { useQuizzes } from '@/Composables/useQuizzes';

const {
    searchQuery,
    sortBy,
    selectedStatus,
    loading,
    statusOptions,
    sortOptions,
    pagination,
    filterAndSortQuizzes,
    resetFilters
} = useQuizzes();

const quizzes = ref([
    {
        id: 1,
        title: 'JavaScript Fundamentals',
        description: 'Test your knowledge of JavaScript basics',
        status: 'active',
        questionsCount: 20,
        updatedAt: '2024-01-15',
        timeLimit: 30
    },
    {
        id: 2,
        title: 'Vue.js Essentials',
        description: 'Complete guide to Vue.js core concepts',
        status: 'expired',
        questionsCount: 15,
        updatedAt: '2024-01-14',
        timeLimit: 25
    },
    {
        id: 3,
        title: 'CSS Grid & Flexbox',
        description: 'Modern CSS layout techniques',
        status: 'active',
        questionsCount: 25,
        updatedAt: '2024-01-13',
        timeLimit: 40
    },
    {
        id: 4,
        title: 'React Basics',
        description: 'Introduction to React framework',
        status: 'completed',
        questionsCount: 30,
        updatedAt: '2024-01-12',
        timeLimit: 45
    },
    {
        id: 5,
        title: 'TypeScript Advanced',
        description: 'Advanced concepts in TypeScript',
        status: 'expired',
        questionsCount: 18,
        updatedAt: '2024-01-11',
        timeLimit: 35
    }
]);

const filteredQuizzes = computed(() => filterAndSortQuizzes(quizzes.value));

const paginatedQuizzes = computed(() => {
    const start = pagination.value.first;
    const end = start + pagination.value.rows;
    return {
        items: filteredQuizzes.value.slice(start, end),
        totalRecords: filteredQuizzes.value.length
    };
});

const onPage = (event) => {
    pagination.value = event;
};

const sidebarStore = useSidebarStore();

const gridClasses = computed(() => ({
    'grid gap-4': true,
    'grid-cols-1': true,
    'lg:grid-cols-2': !sidebarStore.isCollapsed,
    'lg:grid-cols-3': sidebarStore.isCollapsed,
    'xl:grid-cols-3': !sidebarStore.isCollapsed,
    'xl:grid-cols-4': sidebarStore.isCollapsed,
}));
</script>

<style scoped>
:deep(.p-dropdown),
:deep(.p-inputtext) {
    width: 100%;
}

:deep(.p-tag) {
    text-transform: capitalize;
}

:deep(.p-paginator) {
    border: none;
    padding: 0;
    background-color: transparent;
}
</style>