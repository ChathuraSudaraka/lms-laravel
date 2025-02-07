<script setup>
import { computed, defineProps } from 'vue';
import Badge from 'primevue/badge';
import ProgressBar from 'primevue/progressbar';

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

const isUnlocked = computed(() => {
    return props.product.stars >= props.product.requiredStars;
});

const progressValue = computed(() => {
    return Math.min((props.product.stars / props.product.requiredStars) * 100, 100);
});

const progressClass = computed(() => {
    if (progressValue.value >= 100) return 'success';
    if (progressValue.value >= 75) return 'warning';
    return 'danger';
});
</script>

<template>
    <div
        class="bg-white rounded-xl border border-gray-100 group hover:shadow-xl transition-all duration-300 relative overflow-hidden">
        <!-- Status Badge -->
        <div class="absolute top-3 left-3 z-10">
            <Badge :value="isUnlocked ? 'Unlocked' : 'Locked'" :severity="isUnlocked ? 'success' : 'danger'"
                class="uppercase text-xs font-semibold" />
        </div>

        <!-- Image Container -->
        <div class="aspect-[4/3] overflow-hidden relative">
            <img :src="product.image" :alt="product.name"
                class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
            <div
                class="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div class="absolute bottom-3 right-3 flex gap-2">
                    <Button v-tooltip.top="isUnlocked ? 'View Details' : 'Locked'" icon="pi pi-eye" class="!p-2" rounded
                        raised severity="info" />
                    <Button v-tooltip.top="isUnlocked ? 'Get Product' : 'Not Available'" icon="pi pi-shopping-cart"
                        class="!p-2" rounded raised :severity="isUnlocked ? 'success' : 'help'"
                        :disabled="!isUnlocked" />
                </div>
            </div>
        </div>

        <!-- Content -->
        <div class="p-4">
            <!-- Title and Stars -->
            <div class="flex items-start justify-between gap-2 mb-3">
                <h3
                    class="text-lg font-semibold text-gray-900 line-clamp-1 group-hover:text-primary-600 transition-colors">
                    {{ product.name }}
                </h3>
            </div>

            <!-- Description -->
            <p class="text-sm text-gray-600 mb-4 line-clamp-2">{{ product.description }}</p>

            <!-- Required Stars Progress -->
            <div class="mb-4">
                <div class="flex justify-between items-center mb-2">
                    <span class="text-sm font-medium" :class="isUnlocked ? 'text-green-600' : 'text-gray-600'">
                        <i class="pi mr-1" :class="isUnlocked ? 'pi-check-circle' : 'pi-lock'"></i>
                        Required Stars: {{ product.requiredStars }}
                    </span>
                    <span class="text-xs text-gray-500">
                        {{ Math.round(progressValue) }}%
                    </span>
                </div>
                <ProgressBar :value="progressValue" :class="progressClass" />
            </div>

            <!-- Footer -->
            <div class="pt-3 border-t border-gray-100 flex items-center justify-between">
                <span class="inline-flex items-center text-xs font-medium"
                    :class="isUnlocked ? 'text-green-600' : 'text-orange-600'">
                    {{ isUnlocked ? 'Ready to Claim' : 'Keep Earning Stars' }}
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

.p-progressbar {
    height: 6px !important;
    border-radius: 999px;
    background: var(--surface-200);
}

.p-progressbar.success .p-progressbar-value {
    background: var(--green-500);
}

.p-progressbar.warning .p-progressbar-value {
    background: var(--yellow-500);
}

.p-progressbar.danger .p-progressbar-value {
    background: var(--red-500);
}

.p-button.p-button-rounded {
    opacity: 0;
    transform: translateY(5px);
    transition: all 0.3s ease;
}

.group:hover .p-button.p-button-rounded {
    opacity: 1;
    transform: translateY(0);
}

.p-button.p-button-rounded:nth-child(2) {
    transition-delay: 0.1s;
}
</style>
