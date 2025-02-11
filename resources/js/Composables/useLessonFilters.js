import { ref, computed } from 'vue';

export function useLessonFilters(lessonsRef) {
    const searchQuery = ref('');
    const selectedGrade = ref(null);
    const selectedTags = ref([]);
    const sortBy = ref('newest');

    const grades = ref(['6', '7', '8', '9', '10', '11']);
    const tags = computed(() => {
        if (!lessonsRef?.value) return [];
        const tagSet = new Set();
        lessonsRef.value.forEach(lesson => {
            lesson.tags.forEach(tag => tagSet.add(tag));
        });
        return Array.from(tagSet);
    });

    const sortOptions = ref([
        { label: 'Newest First', value: 'newest' },
        { label: 'Oldest First', value: 'oldest' },
        { label: 'A-Z', value: 'title' }
    ]);

    const hasActiveFilters = computed(() => {
        return searchQuery.value || 
               selectedGrade.value || 
               selectedTags.value.length > 0;
    });

    const pagination = ref({
        page: 0,
        first: 0,
        rows: 10,
        sortField: null,
        sortOrder: null
    });

    const filterLessons = (lessons) => {
        let filtered = [...lessons];

        if (searchQuery.value) {
            filtered = filtered.filter(lesson =>
                lesson.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                lesson.description.toLowerCase().includes(searchQuery.value.toLowerCase())
            );
        }

        if (selectedGrade.value) {
            filtered = filtered.filter(lesson => lesson.grade === selectedGrade.value);
        }

        if (selectedTags.value.length) {
            filtered = filtered.filter(lesson =>
                lesson.tags.some(tag => selectedTags.value.includes(tag))
            );
        }

        filtered.sort((a, b) => {
            switch (sortBy.value) {
                case 'newest':
                    return new Date(b.createdAt) - new Date(a.createdAt);
                case 'oldest':
                    return new Date(a.createdAt) - new Date(b.createdAt);
                case 'title':
                    return a.title.localeCompare(b.title);
                default:
                    return 0;
            }
        });

        return filtered;
    };

    const filterAndPaginateLessons = (lessons) => {
        let filtered = filterLessons(lessons);
        
        const { first, rows } = pagination.value;
        
        return {
            items: filtered.slice(first, first + rows),
            totalRecords: filtered.length
        };
    };

    const onPage = (event) => {
        pagination.value = {
            ...pagination.value,
            first: event.first,
            rows: event.rows,
            page: event.page
        };
    };

    const resetFilters = () => {
        searchQuery.value = '';
        selectedGrade.value = null;
        selectedTags.value = [];
        sortBy.value = 'newest';
    };

    const resetPagination = () => {
        pagination.value = {
            page: 0,
            first: 0,
            rows: 10,
            sortField: null,
            sortOrder: null
        };
    };

    const resetAll = () => {
        resetFilters();
        resetPagination();
    };

    return {
        searchQuery,
        selectedGrade,
        selectedTags,
        sortBy,
        grades,
        tags,
        sortOptions,
        hasActiveFilters,
        filterLessons,
        filterAndPaginateLessons,
        onPage,
        resetFilters,
        pagination,
        resetAll
    };
}
