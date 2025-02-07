import { ref, computed } from 'vue';

export function useQuizzes() {
    const searchQuery = ref('');
    const sortBy = ref('newest');
    const selectedStatus = ref(null);
    const loading = ref(false);

    const statusOptions = [
        { label: 'All Status', value: null },
        { label: 'Active', value: 'active' },
        { label: 'Completed', value: 'completed' },
        { label: 'Expired', value: 'expired' }
    ];

    const sortOptions = [
        { label: 'Newest First', value: 'newest' },
        { label: 'Oldest First', value: 'oldest' },
        { label: 'Deadline: Nearest', value: 'deadline-asc' },
        { label: 'Deadline: Farthest', value: 'deadline-desc' }
    ];

    const pagination = ref({
        first: 0,
        rows: 10,
        page: 0
    });

    const filterAndSortQuizzes = (quizzes) => {
        let filtered = [...quizzes];

        if (searchQuery.value) {
            filtered = filtered.filter(quiz =>
                quiz.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                quiz.subject.toLowerCase().includes(searchQuery.value.toLowerCase())
            );
        }

        if (selectedStatus.value) {
            filtered = filtered.filter(quiz => quiz.status === selectedStatus.value);
        }

        filtered.sort((a, b) => {
            switch (sortBy.value) {
                case 'oldest':
                    return new Date(a.createdAt) - new Date(b.createdAt);
                case 'deadline-asc':
                    return new Date(a.deadline) - new Date(b.deadline);
                case 'deadline-desc':
                    return new Date(b.deadline) - new Date(a.deadline);
                case 'newest':
                default:
                    return new Date(b.createdAt) - new Date(a.createdAt);
            }
        });

        return filtered;
    };

    const resetFilters = () => {
        searchQuery.value = '';
        sortBy.value = 'newest';
        selectedStatus.value = null;
        pagination.value.page = 0;
        pagination.value.first = 0;
    };

    return {
        searchQuery,
        sortBy,
        selectedStatus,
        loading,
        statusOptions,
        sortOptions,
        pagination,
        filterAndSortQuizzes,
        resetFilters
    };
}
