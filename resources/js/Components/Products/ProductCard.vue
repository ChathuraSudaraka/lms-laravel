<script setup>
import { computed, ref } from 'vue';
import Badge from 'primevue/badge';
import Button from 'primevue/button';
import ProgressBar from 'primevue/progressbar';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import { isAdmin } from '@/Utils/IsAdmin';
import { isStudent } from '@/Utils/IsStudent';

const props = defineProps({
    product: {
        type: Object,
        required: true
    }
});

const emit = defineEmits(['edit', 'delete', 'redeem']);

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

const handleClick = (event) => {
    // Don't trigger if clicking action buttons
    if (event.target.closest('.action-buttons')) {
        return;
    }

    // Handle click based on role
    if (isStudent() && isUnlocked.value) {
        emit('redeem', props.product);
    }
};

const handleAdminAction = (event, action, product) => {
    event.stopPropagation();
    emit(action, product);
};

const handleRedeemClick = (event) => {
    event.stopPropagation();
    emit('redeem', props.product);
};
</script>

<template>
    <div class="bg-white rounded-xl border border-gray-100 group hover:shadow-xl transition-all duration-300 relative overflow-hidden"
        @click="handleClick">
        <!-- Admin Stats Overlay (Only visible to admin) -->
        <div v-if="isAdmin()"
            class="absolute top-3 right-3 z-20 flex gap-2 action-buttons opacity-0 group-hover:opacity-100 transition-all duration-300">
            <Button 
                icon="pi pi-pencil" 
                text 
                rounded 
                class="!p-2 bg-white/90" 
                v-tooltip.left="'Edit Product'"
                @click="(e) => handleAdminAction(e, 'edit', product)" 
            />
            <Button 
                icon="pi pi-trash" 
                text 
                rounded 
                severity="danger" 
                class="!p-2 bg-white/90"
                v-tooltip.left="'Delete Product'" 
                @click="(e) => handleAdminAction(e, 'delete', product)" 
            />
        </div>

        <!-- Status Badge -->
        <div class="absolute top-3 left-3 z-10">
            <div v-if="isStudent()" class="px-3 py-1 rounded-full text-xs font-semibold uppercase" :class="[
                isUnlocked
                    ? 'bg-green-50 text-green-700 border border-green-200'
                    : 'bg-red-50 text-red-700 border border-red-200'
            ]">
                <i :class="[
                    'pi mr-1 text-xs',
                    isUnlocked ? 'pi-lock-open' : 'pi-lock'
                ]"></i>
                {{ isUnlocked ? 'Unlocked' : 'Locked' }}
            </div>
            <div v-else
                class="px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-semibold">
                <i class="pi pi-users mr-1 text-xs"></i>
                {{ product.totalRedeemed }} Redeemed
            </div>
        </div>

        <!-- Image Container -->
        <div class="aspect-[4/3] overflow-hidden relative">
            <img :src="product.image" :alt="product.name"
                class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
            <div
                class="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <!-- Student Actions -->
                <div v-if="isStudent()" class="absolute bottom-3 right-3 flex gap-2">
                    <Button v-tooltip.top="isUnlocked ? 'Redeem Now' : 'Not enough stars'" icon="pi pi-shopping-cart"
                        class="!p-2" rounded raised :severity="isUnlocked ? 'success' : 'help'"
                        :disabled="!isUnlocked" @click="handleRedeemClick" />
                </div>
                <!-- Admin Stats -->
                <div v-else
                    class="absolute bottom-3 left-3 right-3 flex justify-between items-center text-white text-sm">
                    <span>{{ product.totalViews }} views</span>
                    <span>{{ product.conversionRate }}% conversion</span>
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
                <div v-if="isAdmin()" class="flex items-center gap-1">
                    <i class="pi pi-star-fill text-yellow-400"></i>
                    <span class="text-sm font-medium">{{ product.requiredStars }}</span>
                </div>
            </div>

            <!-- Description -->
            <p class="text-sm text-gray-600 mb-4 line-clamp-2">{{ product.description }}</p>

            <!-- Student Progress Section -->
            <template v-if="isStudent()">
                <div class="mb-4">
                    <div class="flex justify-between items-center mb-2">
                        <div class="flex items-center gap-2">
                            <i class="pi text-lg"
                                :class="isUnlocked ? 'pi-check-circle text-green-500' : 'pi-lock text-gray-500'"></i>
                            <span class="text-sm font-medium" :class="isUnlocked ? 'text-green-600' : 'text-gray-600'">
                                Required Stars: {{ product.requiredStars }}
                            </span>
                        </div>
                        <Badge :value="`${Math.round(progressValue)}%`" :severity="progressClass" class="text-xs" />
                    </div>
                    <ProgressBar :value="progressValue" :class="progressClass" :showValue="false" />
                    <div class="flex justify-between mt-1 text-xs text-gray-500">
                        <span>{{ product.stars }} earned</span>
                        <span>{{ product.requiredStars }} needed</span>
                    </div>
                </div>
            </template>

            <!-- Admin Stats Section -->
            <template v-else>
                <div class="grid grid-cols-2 gap-4 mb-4">
                    <div class="text-center p-2 bg-gray-50 rounded">
                        <div class="text-sm font-medium text-gray-600">Success Rate</div>
                        <div class="text-lg font-semibold text-primary-600">{{ product.successRate }}%</div>
                    </div>
                    <div class="text-center p-2 bg-gray-50 rounded">
                        <div class="text-sm font-medium text-gray-600">Inventory</div>
                        <div class="text-lg font-semibold text-primary-600">{{ product.inventory }}</div>
                    </div>
                </div>
            </template>

            <!-- Footer -->
            <div class="pt-3 border-t border-gray-100 flex items-center justify-between">
                <span v-if="isStudent()" class="inline-flex items-center text-xs font-medium"
                    :class="isUnlocked ? 'text-green-600' : 'text-orange-600'">
                    {{ isUnlocked ? 'Ready to Claim' : 'Keep Earning Stars' }}
                </span>
                <span v-else class="text-xs text-gray-500">
                    Last updated {{ new Date(product.updatedAt).toLocaleDateString() }}
                </span>
                <span class="text-xs text-gray-500">
                    Added {{ new Date(product.createdAt).toLocaleDateString() }}
                </span>
            </div>
        </div>
    </div>
</template>
<!-- 
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

/* Enhanced admin action buttons */
.action-buttons .p-button {
    transform: translateY(-10px);
    transition: all 0.3s ease;
}

.group:hover .action-buttons .p-button {
    transform: translateY(0);
}

.action-buttons .p-button:nth-child(2) {
    transition-delay: 0.1s;
}
</style> -->
