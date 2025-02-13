import { ref } from 'vue';

export function useQuizzes() {
    const searchQuery = ref('');
    const selectedGrade = ref('');
    const loading = ref(false);

    const statusOptions = [
        { label: 'All', value: null },
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

    // Initialize with default values
    const selectedStatus = ref(statusOptions[0]); // All
    const sortBy = ref(sortOptions[0]); // Newest First

    const pagination = ref({
        first: 0,
        rows: 10,
        page: 0
    });

    const filterAndSortQuizzes = (quizzes) => {
        let filtered = [...quizzes];

        if (searchQuery.value?.trim()) {
            const query = searchQuery.value.toLowerCase();
            filtered = filtered.filter(quiz => 
                quiz.title.toLowerCase().includes(query) || 
                quiz.description.toLowerCase().includes(query)
            );
        }

        // Only apply status filter if not "All"
        if (selectedStatus.value?.value !== null) {
            filtered = filtered.filter(quiz => 
                quiz.status.toLowerCase() === selectedStatus.value.value.toLowerCase()
            );
        }

        if (selectedGrade.value) {
            filtered = filtered.filter(quiz => quiz.grade === selectedGrade.value);
        }

        // Apply sorting
        filtered.sort((a, b) => {
            const sortValue = sortBy.value?.value || 'newest';
            
            switch (sortValue) {
                case 'oldest':
                    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
                case 'deadline-asc':
                    return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
                case 'deadline-desc':
                    return new Date(b.deadline).getTime() - new Date(a.deadline).getTime();
                case 'newest':
                default:
                    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            }
        });

        return filtered;
    };

    const resetFilters = () => {
        searchQuery.value = '';
        sortBy.value = sortOptions[0];
        selectedStatus.value = statusOptions[0];
        selectedGrade.value = '';
        pagination.value = {
            first: 0,
            rows: 10,
            page: 0
        };
    };

    return {
        searchQuery,
        sortBy,
        selectedStatus,
        selectedGrade,
        loading,
        statusOptions,
        sortOptions,
        pagination,
        filterAndSortQuizzes,
        resetFilters
    };
}
