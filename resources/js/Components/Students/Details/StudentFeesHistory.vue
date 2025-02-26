<script setup>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Badge from 'primevue/badge';
import Button from 'primevue/button';
import { ref } from 'vue';

const props = defineProps({
    student: {
        type: Object,
        required: true
    }
});

const feesHistory = ref([
    { 
        month: 'January 2024',
        amount: 5000,
        dueDate: '2024-01-15',
        paidDate: '2024-01-10',
        status: 'paid',
        paymentMethod: 'Credit Card'
    },
    { 
        month: 'December 2023',
        amount: 5000,
        dueDate: '2023-12-15',
        paidDate: '2023-12-12',
        status: 'paid',
        paymentMethod: 'Bank Transfer'
    },
    { 
        month: 'November 2023',
        amount: 5000,
        dueDate: '2023-11-15',
        paidDate: '2023-11-18',
        status: 'late',
        paymentMethod: 'Cash'
    },
    { 
        month: 'October 2023',
        amount: 5000,
        dueDate: '2023-10-15',
        paidDate: '2023-10-14',
        status: 'paid',
        paymentMethod: 'Credit Card'
    }
]);

const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
};

const formatCurrency = (value) => {
    return `Rs. ${value.toLocaleString()}`;
};

const getPaymentStatusSeverity = (status) => {
    const severities = {
        paid: 'success',
        late: 'warning',
        unpaid: 'danger',
        pending: 'info'
    };
    return severities[status] || 'info';
};
</script>

<template>
    <div class="space-y-6">
        <!-- Summary Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="bg-gray-50 rounded-lg p-4">
                <h3 class="text-sm font-medium text-gray-500 mb-1">Total Paid</h3>
                <p class="text-2xl font-semibold text-gray-900">Rs. 20,000</p>
            </div>
            <div class="bg-gray-50 rounded-lg p-4">
                <h3 class="text-sm font-medium text-gray-500 mb-1">Monthly Fee</h3>
                <p class="text-2xl font-semibold text-gray-900">Rs. 5,000</p>
            </div>
            <div class="bg-gray-50 rounded-lg p-4">
                <h3 class="text-sm font-medium text-gray-500 mb-1">Payment Status</h3>
                <Badge :value="student.feeStatus" :severity="getPaymentStatusSeverity(student.feeStatus)" />
            </div>
        </div>

        <!-- Fees History Table -->
        <DataTable :value="feesHistory" paginator :rows="10" stripedRows>
            <Column field="month" header="Month"></Column>
            <Column field="amount" header="Amount">
                <template #body="{ data }">
                    {{ formatCurrency(data.amount) }}
                </template>
            </Column>
            <Column field="dueDate" header="Due Date">
                <template #body="{ data }">
                    {{ formatDate(data.dueDate) }}
                </template>
            </Column>
            <Column field="paidDate" header="Paid Date">
                <template #body="{ data }">
                    {{ formatDate(data.paidDate) }}
                </template>
            </Column>
            <Column field="status" header="Status">
                <template #body="{ data }">
                    <Badge 
                        :value="data.status" 
                        :severity="getPaymentStatusSeverity(data.status)"
                    />
                </template>
            </Column>
            <Column field="paymentMethod" header="Payment Method"></Column>
            <Column header="Actions" style="width: 4rem">
                <template #body>
                    <Button 
                        icon="pi pi-file-pdf" 
                        text 
                        rounded 
                        severity="secondary"
                        v-tooltip.left="'Download Receipt'"
                    />
                </template>
            </Column>
        </DataTable>
    </div>
</template>

<style scoped>
:deep(.p-datatable-wrapper) {
    border: 1px solid #e5e7eb;
    border-radius: 0.5rem;
}

:deep(.p-datatable-header) {
    background: #f9fafb;
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
}

:deep(.p-datatable .p-datatable-thead > tr > th) {
    background: #f9fafb;
    color: #374151;
    font-weight: 600;
}

:deep(.p-datatable .p-datatable-tbody > tr) {
    transition: background-color 0.2s;
}

:deep(.p-datatable .p-datatable-tbody > tr:nth-child(even)) {
    background: #f9fafb;
}

:deep(.p-badge) {
    text-transform: capitalize;
}
</style>