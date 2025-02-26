<script setup>
import AppLayout from "@/Layouts/AppLayout.vue";
import Button from "primevue/button";
import Badge from "primevue/badge";
import Heading from "@/Components/Heading.vue";
import StudentFilters from "@/Components/Students/StudentFilters.vue";
import StudentTable from "@/Components/Students/StudentTable.vue";
import InviteStudentModal from "@/Components/Students/InviteStudentModal.vue";
import SuspendStudentModal from "@/Components/Students/SuspendStudentModal.vue";
import ConfirmPaymentModal from "@/Components/Students/ConfirmPaymentModal.vue";
import { ref, computed } from 'vue';
import { router } from '@inertiajs/vue3';
import { isAdmin } from "@/Utils/IsAdmin";
import Toast from 'primevue/toast';
import { useToast } from "primevue/usetoast";

const toast = useToast();
const inviteModal = ref(false);
const suspendModal = ref(false);
const paymentModal = ref(false);
const loading = ref(false);
const selectedStudent = ref(null);

const filters = ref({
    global: { value: null, matchMode: 'contains' },
    name: { value: null, matchMode: 'contains' },
    email: { value: null, matchMode: 'contains' },
    grade: { value: null, matchMode: 'equals' },
    status: { value: null, matchMode: 'equals' },
    feeStatus: { value: null, matchMode: 'equals' }
});

const students = ref([
    { id: 1, name: 'John Doe', email: 'john@example.com', grade: '10', status: 'Active', feeStatus: 'paid' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', grade: '11', status: 'Pending', feeStatus: 'pending' },
    { id: 3, name: 'Kamal Perera', email: 'kamal@example.com', grade: '11', status: 'Active', feeStatus: 'paid' },
    { id: 4, name: 'Nimal Silva', email: 'nimal@example.com', grade: '10', status: 'Active', feeStatus: 'unpaid' },
    { id: 5, name: 'Malini Fernando', email: 'malini@example.com', grade: '9', status: 'Active', feeStatus: 'paid' },
    { id: 6, name: 'Sunil Bandara', email: 'sunil@example.com', grade: '8', status: 'Pending', feeStatus: 'pending' },
    { id: 7, name: 'Kumari Withana', email: 'kumari@example.com', grade: '7', status: 'Active', feeStatus: 'unpaid' },
    { id: 8, name: 'Chaminda Rajapakse', email: 'chaminda@example.com', grade: '6', status: 'Active', feeStatus: 'paid' }
]);

const newStudent = ref({
    name: '',
    email: '',
    grade: null
});

const grades = ref(['6', '7', '8', '9', '10', '11']);
const statuses = ref(['Active', 'Pending']);
const feeStatuses = ref(['paid', 'pending', 'unpaid']);

const hasActiveFilters = computed(() => {
    return Object.values(filters.value).some(filter => 
        filter.value !== null && 
        filter.value !== '' && 
        (Array.isArray(filter.value) ? filter.value.length > 0 : true)
    );
});

const initFilters = () => {
    filters.value = {
        global: { value: null, matchMode: 'contains' },
        name: { value: null, matchMode: 'contains' },
        email: { value: null, matchMode: 'contains' },
        grade: { value: null, matchMode: 'equals' },
        status: { value: null, matchMode: 'equals' },
        feeStatus: { value: null, matchMode: 'equals' }
    };
};

const sendInvite = () => {
    // Handle invite logic here
    inviteModal.value = false;
};

const onFilterChange = (newFilters) => {
    filters.value = newFilters;
};

const onStudentChange = (updatedStudent) => {
    newStudent.value = updatedStudent;
};

const viewMoreInfo = (student) => {
    router.visit(route('console.students.show', student.id));
};

const openSuspendModal = (student) => {
    selectedStudent.value = student;
    suspendModal.value = true;
};

const handleSuspend = (student) => {
    toast.add({
        severity: 'info',
        summary: 'Student Suspended',
        detail: `${student.name} has been suspended`,
        life: 3000
    });
    suspendModal.value = false;
};

const openPaymentModal = (student) => {
    selectedStudent.value = student;
    paymentModal.value = true;
};

const handlePayment = (student) => {
    const index = students.value.findIndex(s => s.id === student.id);
    if (index !== -1) {
        students.value[index].feeStatus = 'paid';
        
        toast.add({
            severity: 'success',
            summary: 'Payment Recorded',
            detail: `${student.name} has been marked as paid for the current month`,
            life: 3000
        });
    }
    paymentModal.value = false;
};

const getFeeStatusSeverity = (status) => {
    const severities = {
        paid: 'success',
        pending: 'warning',
        unpaid: 'danger'
    };
    return severities[status] || 'info';
};
</script>

<template>
    <AppLayout>
        <Toast />
        <div class="w-full p-5 md:p-8 bg-white rounded-lg mb-6">
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <Heading title="Students" description="Manage all students in the system" />
                <Button label="Invite Student" icon="pi pi-user-plus" @click="inviteModal = true" />
            </div>

            <StudentFilters 
                :filters="filters" 
                :grades="grades" 
                :statuses="statuses" 
                :fee-statuses="feeStatuses"
                :has-active-filters="hasActiveFilters"
                @update:filters="onFilterChange"
                @clear-filters="initFilters" 
            />

            <StudentTable 
                :students="students" 
                :filters="filters" 
                :loading="loading" 
                :has-active-filters="hasActiveFilters"
                @clear-filters="initFilters"
                @view-info="viewMoreInfo"
                @suspend="openSuspendModal"
                @mark-paid="openPaymentModal">
                <template #name="{ data }">
                    <div class="flex align-items-center gap-2">
                        <span>{{ data.name }}</span>
                        <Badge :value="data.feeStatus" :severity="getFeeStatusSeverity(data.feeStatus)" />
                    </div>
                </template>
            </StudentTable>
        </div>

        <!-- Modals -->
        <InviteStudentModal 
            :visible="inviteModal"
            @update:visible="inviteModal = $event"
            :student="newStudent"
            @update:student="onStudentChange"
            :grades="grades"
            @send="sendInvite" 
        />

        <SuspendStudentModal
            :visible="suspendModal"
            :student="selectedStudent"
            @update:visible="suspendModal = $event"
            @confirm="handleSuspend"
        />

        <ConfirmPaymentModal
            :visible="paymentModal"
            :student="selectedStudent"
            @update:visible="paymentModal = $event"
            @confirm="handlePayment"
        />
    </AppLayout>
</template>
