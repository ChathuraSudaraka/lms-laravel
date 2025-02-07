<script setup>
import Badge from 'primevue/badge';

const props = defineProps({
    product: {
        type: Object,
        required: true
    }
});

const getStarLevel = (stars) => {
    if (stars >= 150) return 'danger';
    if (stars >= 100) return 'warning';
    return 'success';
};
</script>

<template>
    <div class="bg-white rounded-xl border border-gray-100 group hover:shadow-lg transition-all duration-300 relative">
        <!-- Image Container -->
        <div class="aspect-[4/3] overflow-hidden rounded-t-xl relative">
            <img :src="product.image" :alt="product.name" 
                class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <Button icon="pi pi-shopping-cart" 
                    class="absolute bottom-3 right-3 !p-2"
                    rounded 
                    raised
                    severity="secondary" />
            </div>
        </div>

        <!-- Content -->
        <div class="p-4">
            <!-- Title and Badge -->
            <div class="flex items-start justify-between gap-2 mb-2">
                <h3 class="text-lg font-semibold text-gray-900 line-clamp-1 group-hover:text-primary-600 transition-colors">
                    {{ product.name }}
                </h3>
                <Badge :value="product.stars" :severity="getStarLevel(product.stars)" class="shrink-0">
                    <i class="pi pi-star-fill mr-1"></i>
                </Badge>
            </div>

            <!-- Description -->
            <p class="text-sm text-gray-600 mb-3 line-clamp-2">{{ product.description }}</p>

            <!-- Footer -->
            <div class="pt-3 border-t border-gray-100 flex items-center justify-between">
                <span class="inline-flex items-center text-xs text-green-600 font-medium">
                    <i class="pi pi-check-circle mr-1"></i>
                    Available
                </span>
                <span class="text-xs text-gray-500">
                    Added {{ new Date(product.createdAt).toLocaleDateString() }}
                </span>
            </div>
        </div>
    </div>
</template>

<style scoped>
.p-badge {
    background: var(--surface-200);
    color: var(--surface-900);
    font-weight: 600;
    font-size: 0.75rem;
    padding: 0.25rem 0.5rem;
}

.p-badge.p-badge-success {
    background: var(--green-100);
    color: var(--green-700);
}

.p-badge.p-badge-warning {
    background: var(--yellow-100);
    color: var(--yellow-700);
}

.p-badge.p-badge-danger {
    background: var(--red-100);
    color: var(--red-700);
}
</style>
