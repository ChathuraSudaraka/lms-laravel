<script setup>
import AppLayout from "@/Layouts/AppLayout.vue";
import Heading from "@/Components/Heading.vue";
import Button from "primevue/button";
import Skeleton from 'primevue/skeleton';
import Paginator from 'primevue/paginator';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import CreateProductModal from "@/Components/Products/CreateProductModal.vue";
import ProductCard from "@/Components/Products/ProductCard.vue";
import { ref, computed, watch } from 'vue';
import { useSidebarStore } from '@/Stores/sidebarStore';

const createModal = ref(false);
const loading = ref(false);
const searchQuery = ref('');
const sortBy = ref('newest');
const products = ref([
    {
        id: 1,
        name: 'Science Kit Basic',
        description: 'A starter kit for young scientists',
        image: 'https://placehold.co/300x200?text=Science+Kit',
        stars: 100,
        requiredStars: 50,
        createdAt: '2024-01-15'
    },
    {
        id: 2,
        name: 'Mathematics Set Pro',
        description: 'Advanced math learning tools for students',
        image: 'https://placehold.co/300x200?text=Smart+Watch',
        stars: 85,
        requiredStars: 75,
        createdAt: '2024-01-14'
    },
    {
        id: 3,
        name: 'Wireless Earbuds Pro',
        description: 'Premium wireless earbuds with noise cancellation',
        image: 'https://placehold.co/300x200?text=Earbuds',
        stars: 95,
        createdAt: '2024-01-13'
    },
    {
        id: 4,
        name: 'Ultra Boost Sneakers',
        description: 'Comfortable athletic shoes for everyday wear',
        image: 'https://placehold.co/300x200?text=Sneakers',
        stars: 120,
        createdAt: '2024-01-12'
    },
    {
        id: 5,
        name: 'Smart Fitness Band',
        description: 'Track your health and fitness goals',
        image: 'https://placehold.co/300x200?text=Fitness+Band',
        stars: 88,
        createdAt: '2024-01-11'
    },
    {
        id: 6,
        name: 'Bluetooth Speaker',
        description: 'Portable wireless speaker with deep bass',
        image: 'https://placehold.co/300x200?text=Speaker',
        stars: 92,
        createdAt: '2024-01-10'
    }
]);

const sortOptions = [
    { label: 'Newest First', value: 'newest' },
    { label: 'Stars: Low to High', value: 'starsAsc' },
    { label: 'Stars: High to Low', value: 'starsDesc' },
];

// Pagination state
const pagination = ref({
    first: 0,
    rows: 10,
    page: 0
});

// Filter and sort products
const filteredProducts = computed(() => {
    let filtered = [...products.value];

    if (searchQuery.value) {
        filtered = filtered.filter(product =>
            product.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
            product.description.toLowerCase().includes(searchQuery.value.toLowerCase())
        );
    }

    // Sort products
    filtered.sort((a, b) => {
        switch (sortBy.value) {
            case 'starsAsc':
                return a.stars - b.stars;
            case 'starsDesc':
                return b.stars - a.stars;
            case 'newest':
            default:
                return new Date(b.createdAt) - new Date(a.createdAt);
        }
    });

    return filtered;
});

// Paginate products
const paginatedProducts = computed(() => {
    const start = pagination.value.first;
    const end = start + pagination.value.rows;
    return {
        items: filteredProducts.value.slice(start, end),
        totalRecords: filteredProducts.value.length
    };
});

const handleCreateProduct = (productData) => {
    products.value.unshift({
        id: products.value.length + 1,
        ...productData,
        createdAt: new Date().toISOString().split('T')[0]
    });
};

const resetFilters = () => {
    searchQuery.value = '';
    sortBy.value = 'newest';
    pagination.value.page = 0;
    pagination.value.first = 0;
};

const onPage = (event) => {
    pagination.value = event;
};

const sidebarStore = useSidebarStore();

// Update skeletonCount to consider sidebar state
const skeletonCount = computed(() => {
    if (window.innerWidth < 768) return 2;
    if (window.innerWidth < 1024) return sidebarStore.isCollapsed ? 3 : 2;
    if (window.innerWidth < 1536) return sidebarStore.isCollapsed ? 4 : 3;
    return sidebarStore.isCollapsed ? 5 : 4;
});

// Update grid classes to account for sidebar state
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
</script>

<template>
    <AppLayout>
        <div class="w-full p-4 md:p-6 lg:p-8 bg-white rounded-lg mb-6">
            <!-- Header -->
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <Heading title="Products" description="Browse and manage available products" />
                <Button label="Add Product" icon="pi pi-plus" @click="createModal = true" class="w-full sm:w-auto" />
            </div>

            <!-- Filters -->
            <div class="flex flex-col sm:flex-row gap-4 mb-6">
                <InputGroup class="flex-1">
                    <InputGroupAddon>
                        <i class="pi pi-search"></i>
                    </InputGroupAddon>
                    <InputText v-model="searchQuery" placeholder="Search products..." class="w-full" />
                </InputGroup>
                <Dropdown v-model="sortBy" :options="sortOptions" optionLabel="label" optionValue="value"
                    placeholder="Sort by" class="w-full sm:w-48" />
            </div>

            <!-- Products Grid with updated skeleton count -->
            <div :class="gridClasses">
                <template v-if="loading">
                    <div v-for="n in skeletonCount" :key="n">
                        <Skeleton height="200px" class="mb-2" />
                        <Skeleton width="60%" height="20px" class="mb-2" />
                        <Skeleton width="80%" height="20px" />
                    </div>
                </template>
                <template v-else>
                    <ProductCard v-for="product in paginatedProducts.items" :key="product.id" :product="product" />
                </template>
            </div>

            <!-- Empty State -->
            <div v-if="!loading && paginatedProducts.items.length === 0" class="text-center py-12">
                <i class="pi pi-shopping-bag text-4xl text-gray-400 mb-4"></i>
                <h3 class="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                <p class="text-gray-500 mb-4">{{ searchQuery ? 'Try adjusting your search' : 'Start by adding some products' }}</p>
                <Button label="Add First Product" icon="pi pi-plus" @click="createModal = true" v-if="!searchQuery" />
                <Button label="Clear Filters" severity="secondary" @click="resetFilters" v-else />
            </div>

            <!-- Pagination -->
            <div v-if="paginatedProducts.totalRecords > 0"
                class="flex flex-col sm:flex-row items-center gap-4 mt-6 pt-4">
                <div class="text-sm text-gray-600">
                    Total {{ paginatedProducts.totalRecords }} products
                </div>
                <Paginator v-model:first="pagination.first" v-model:rows="pagination.rows"
                    :totalRecords="paginatedProducts.totalRecords" :rowsPerPageOptions="[10, 20, 30, 50]" @page="onPage"
                    template="RowsPerPageDropdown FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
                    class="ml-auto" />
            </div>
        </div>

        <!-- Create Product Modal -->
        <CreateProductModal v-model="createModal" @save="handleCreateProduct" />
    </AppLayout>
</template>

<style scoped>
/* ... Keep existing styles from Lessons Show.vue ... */
</style>
