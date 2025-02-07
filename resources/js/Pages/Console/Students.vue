<script setup>
import AppLayout from "@/Layouts/AppLayout.vue";
import Button from "primevue/button";
import Heading from "@/Components/Heading.vue";
import StudentFilters from "@/Components/Students/StudentFilters.vue";
import StudentTable from "@/Components/Students/StudentTable.vue";
import InviteStudentModal from "@/Components/Students/InviteStudentModal.vue";
import { ref, computed } from 'vue';

const inviteModal = ref(false);
const loading = ref(false);

const filters = ref({
    global: { value: null, matchMode: 'contains' },
    name: { value: null, matchMode: 'contains' },
    email: { value: null, matchMode: 'contains' },
    grade: { value: null, matchMode: 'equals' },
    status: { value: null, matchMode: 'equals' }
});

const students = ref([
    { name: 'John Doe', email: 'john@example.com', grade: '10', status: 'Active' },
    { name: 'Jane Smith', email: 'jane@example.com', grade: '11', status: 'Pending' },
    { name: 'Kamal Perera', email: 'kamal@example.com', grade: '11', status: 'Active' },
    { name: 'Nimal Silva', email: 'nimal@example.com', grade: '10', status: 'Active' },
    { name: 'Malini Fernando', email: 'malini@example.com', grade: '9', status: 'Active' },
    { name: 'Sunil Bandara', email: 'sunil@example.com', grade: '8', status: 'Pending' },
    { name: 'Kumari Withana', email: 'kumari@example.com', grade: '7', status: 'Active' },
    { name: 'Chaminda Rajapakse', email: 'chaminda@example.com', grade: '6', status: 'Active' },
    { name: 'Jane Smith', email: 'jane@example.com', grade: '11', status: 'Pending' },
    { name: 'Kamal Perera', email: 'kamal@example.com', grade: '11', status: 'Active' },
    { name: 'Nimal Silva', email: 'nimal@example.com', grade: '10', status: 'Active' },
    { name: 'Malini Fernando', email: 'malini@example.com', grade: '9', status: 'Active' },
    { name: 'Sunil Bandara', email: 'sunil@example.com', grade: '8', status: 'Pending' },
    { name: 'Kumari Withana', email: 'kumari@example.com', grade: '7', status: 'Active' },
    { name: 'Chaminda Rajapakse', email: 'chaminda@example.com', grade: '6', status: 'Active' },
    { name: 'Jane Smith', email: 'jane@example.com', grade: '11', status: 'Pending' },
    { name: 'Kamal Perera', email: 'kamal@example.com', grade: '11', status: 'Active' },
    { name: 'Nimal Silva', email: 'nimal@example.com', grade: '10', status: 'Active' },
    { name: 'Malini Fernando', email: 'malini@example.com', grade: '9', status: 'Active' },
    { name: 'Sunil Bandara', email: 'sunil@example.com', grade: '8', status: 'Pending' },
    { name: 'Kumari Withana', email: 'kumari@example.com', grade: '7', status: 'Active' },
    { name: 'Chaminda Rajapakse', email: 'chaminda@example.com', grade: '6', status: 'Active' },
    { name: 'Jane Smith', email: 'jane@example.com', grade: '11', status: 'Pending' },
    { name: 'Kamal Perera', email: 'kamal@example.com', grade: '11', status: 'Active' },
    { name: 'Nimal Silva', email: 'nimal@example.com', grade: '10', status: 'Active' },
    { name: 'Malini Fernando', email: 'malini@example.com', grade: '9', status: 'Active' },
    { name: 'Sunil Bandara', email: 'sunil@example.com', grade: '8', status: 'Pending' },
    { name: 'Kumari Withana', email: 'kumari@example.com', grade: '7', status: 'Active' },
    { name: 'Chaminda Rajapakse', email: 'chaminda@example.com', grade: '6', status: 'Active' }
]);

const newStudent = ref({
    name: '',
    email: '',
    grade: null
});

// Update the grades array to match student.grade values
const grades = ref(['6', '7', '8', '9', '10', '11']);
const statuses = ref(['Active', 'Pending']);

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
        status: { value: null, matchMode: 'equals' }
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
</script>

<template>
    <AppLayout>
        <div class="w-full p-5 md:p-8 bg-white rounded-lg mb-6">
            <div class="flex items-center justify-between mb-6">
                <Heading title="Students" description="Manage all students in the system" />
                <Button label="Invite Student" icon="pi pi-user-plus" @click="inviteModal = true" />
            </div>

            <StudentFilters 
                :filters="filters" 
                :grades="grades" 
                :statuses="statuses" 
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
            />
        </div>

        <InviteStudentModal 
            :visible="inviteModal"
            @update:visible="inviteModal = $event"
            :student="newStudent"
            @update:student="onStudentChange"
            :grades="grades"
            @send="sendInvite" 
        />
    </AppLayout>
</template>
