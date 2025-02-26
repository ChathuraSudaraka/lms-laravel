<script setup>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import Badge from 'primevue/badge';
import Menu from 'primevue/menu';
import { ref, computed } from 'vue';
import { isAdmin } from "@/Utils/IsAdmin";
import { router } from '@inertiajs/vue3';

const props = defineProps({
    students: {
        type: Array,
        required: true
    },
    filters: {
        type: Object,
        required: true
    },
    loading: {
        type: Boolean,
        default: false
    },
    hasActiveFilters: {
        type: Boolean,
        required: true
    }
});

const emit = defineEmits(['clear-filters', 'view-info', 'suspend', 'mark-paid']);

const getFeeStatusSeverity = (status) => {
    const severities = {
        paid: 'success',
        pending: 'warning',
        unpaid: 'danger'
    };
    return severities[status] || 'info';
};

const menu = ref();
const selectedStudent = ref(null);

const menuItems = computed(() => {
    const items = [
        { 
            label: 'More Information', 
            icon: 'pi pi-info-circle', 
            command: () => {
                if (selectedStudent.value) {
                    emit('view-info', selectedStudent.value);
                }
            }
        }
    ];
    
    // Add "Mark as paid" option only for unpaid students
    if (selectedStudent.value && selectedStudent.value.feeStatus === 'unpaid') {
        items.push({
            label: 'Mark as paid for this month',
            icon: 'pi pi-check-circle',
            command: () => {
                if (selectedStudent.value) {
                    emit('mark-paid', selectedStudent.value);
                }
            }
        });
    }

    // Add suspend option for active students
    if (selectedStudent.value && selectedStudent.value.status === 'Active') {
        items.push({ 
            label: 'Suspend Account', 
            icon: 'pi pi-ban',
            class: 'text-red-600',
            command: () => {
                if (selectedStudent.value) {
                    emit('suspend', selectedStudent.value);
                }
            }
        });
    }
    
    return items;
});

const toggleMenu = (event, student) => {
    selectedStudent.value = student;
    menu.value.toggle(event);
};
</script>

<template>
    <div class="relative">
        <DataTable 
            :value="students" 
            paginator 
            :rows="10" 
            :filters="filters" 
            filterDisplay="menu"
            :globalFilterFields="['name', 'email', 'grade']" 
            :loading="loading"
            class="p-datatable-students"
        >
            <Column field="name" header="Name" sortable>
                <template #body="{ data }">
                    <div class="flex align-items-center gap-2">
                        <span>{{ data.name }}</span>
                        <Badge v-if="data.feeStatus" 
                            :value="data.feeStatus" 
                            :severity="getFeeStatusSeverity(data.feeStatus)"
                            class="fee-status-badge" />
                    </div>
                </template>
            </Column>
            <Column field="email" header="Email" sortable></Column>
            <Column field="grade" header="Grade" sortable></Column>
            <Column field="status" header="Status" sortable>
                <template #body="{ data }">
                    <span :class="{
                        'text-yellow-600': data.status === 'Pending',
                        'text-green-600': data.status === 'Active'
                    }">
                        {{ data.status }}
                    </span>
                </template>
            </Column>
            <Column v-if="isAdmin()" :exportable="false" style="width: 4rem">
                <template #body="{ data }">
                    <div class="flex justify-content-end">
                        <Button 
                            icon="pi pi-ellipsis-h" 
                            text 
                            rounded
                            @click="(e) => toggleMenu(e, data)" 
                            aria-label="Options"
                        />
                    </div>
                </template>
            </Column>

            <template #empty>
                <div class="text-center p-4">
                    <div v-if="hasActiveFilters">
                        <i class="pi pi-filter-slash text-4xl text-gray-400 mb-4"></i>
                        <p class="text-gray-600">No results found for the current filters</p>
                        <Button 
                            label="Clear Filters" 
                            icon="pi pi-filter-slash" 
                            text 
                            @click="$emit('clear-filters')"
                            class="mt-2" 
                        />
                    </div>
                    <div v-else>
                        <i class="pi pi-users text-4xl text-gray-400 mb-4"></i>
                        <p class="text-gray-600">No students found</p>
                    </div>
                </div>
            </template>

            <template #loading>
                <div class="text-center p-4">
                    <i class="pi pi-spin pi-spinner text-4xl text-gray-400 mb-4"></i>
                    <p class="text-gray-600">Loading students...</p>
                </div>
            </template>
        </DataTable>

        <Menu ref="menu" :model="menuItems" :popup="true" />
    </div>
</template>

<style scoped>
:deep(.p-menu) {
    min-width: 200px;
}

:deep(.p-menu .p-menuitem-link) {
    padding: 0.75rem 1rem;
}

:deep(.p-menu .p-menuitem-icon) {
    color: var(--gray-600);
    margin-right: 0.5rem;
}

:deep(.p-menu .p-menuitem-text) {
    color: var(--gray-700);
}

:deep(.p-menu .p-menuitem-link:hover) {
    background-color: var(--gray-50);
}

:deep(.p-menu .p-menuitem-link:hover .p-menuitem-text) {
    color: var(--primary-600);
}

:deep(.fee-status-badge) {
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: capitalize;
    padding: 0.25rem 0.75rem;
    border-radius: 0.375rem;
}

:deep(.fee-status-badge.p-badge.p-badge-success) {
    color: #15803d;
    background-color: #dcfce7 !important;
    border: 1px solid #4ade80;
}

:deep(.fee-status-badge.p-badge.p-badge-warning) {
    color: #854d0e;
    background-color: #fef9c3 !important;
    border: 1px solid #facc15;
}

:deep(.fee-status-badge.p-badge.p-badge-danger) {
    color: #b91c1c;
    background-color: #fee2e2 !important;
    border: 1px solid #f87171;
}

:deep(.fee-status-badge.p-badge.p-badge-info) {
    color: #1d4ed8;
    background-color: #dbeafe !important;
    border: 1px solid #60a5fa;
}

:deep(.p-datatable-students .p-paginator) {
    border-radius: 0.5rem;
    margin-top: 1rem;
}
</style>
