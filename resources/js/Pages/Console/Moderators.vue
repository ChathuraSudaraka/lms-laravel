<script setup>
import AppLayout from "@/Layouts/AppLayout.vue";
import Button from "primevue/button";
import Heading from "@/Components/Heading.vue";
import ModeratorFilters from "@/Components/Moderators/ModeratorFilters.vue";
import ModeratorTable from "@/Components/Moderators/ModeratorTable.vue";
import InviteModeratorModal from "@/Components/Moderators/InviteModeratorModal.vue";
import { ref, computed } from 'vue';

const inviteModal = ref(false);
const loading = ref(false);

const filters = ref({
    global: { value: null, matchMode: 'contains' },
    name: { value: null, matchMode: 'contains' },
    email: { value: null, matchMode: 'contains' },
    status: { value: null, matchMode: 'equals' }
});

const moderators = ref([
    { name: 'Kasun Perera', email: 'kasun@example.com', status: 'Active' },
    { name: 'Malini Silva', email: 'malini@example.com', status: 'Active' },
    { name: 'Chaminda Bandara', email: 'chaminda@example.com', status: 'Suspended' },
    { name: 'Nirmala Jayawardena', email: 'nirmala@example.com', status: 'Active' },
    { name: 'Roshan Fernando', email: 'roshan@example.com', status: 'Active' },
    { name: 'Kumari Wijesinghe', email: 'kumari@example.com', status: 'Suspended' },
    { name: 'Lakmal Dissanayake', email: 'lakmal@example.com', status: 'Active' },
    { name: 'Dilini Ranasinghe', email: 'dilini@example.com', status: 'Active' }
]);

const newModerator = ref({
    name: '',
    email: ''
});

const statuses = ref(['Active', 'Suspended']);

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
        status: { value: null, matchMode: 'equals' }
    };
};

const sendInvite = () => {
    // Handle invite logic here
    inviteModal.value = false;
};

const handleSuspend = (moderator) => {
    // Handle suspension logic here
    moderator.status = moderator.status === 'Active' ? 'Suspended' : 'Active';
};

const onFilterChange = (newFilters) => {
    filters.value = newFilters;
};

const onModeratorChange = (updatedModerator) => {
    newModerator.value = updatedModerator;
};
</script>

<template>
    <AppLayout>
        <div class="w-full p-5 md:p-8 bg-white rounded-lg mb-6">
            <div class="flex items-center justify-between mb-6">
                <Heading title="Moderators" description="Manage all moderators in the system" />
                <Button label="Invite Moderator" icon="pi pi-user-plus" @click="inviteModal = true" />
            </div>

            <ModeratorFilters :filters="filters" :statuses="statuses" :has-active-filters="hasActiveFilters"
                @update:filters="onFilterChange" @clear-filters="initFilters" />

            <ModeratorTable :moderators="moderators" :filters="filters" :loading="loading"
                :has-active-filters="hasActiveFilters" @clear-filters="initFilters" @suspend="handleSuspend" />
        </div>

        <InviteModeratorModal :visible="inviteModal" @update:visible="inviteModal = $event" :moderator="newModerator"
            @update:moderator="onModeratorChange" @send="sendInvite" />
    </AppLayout>
</template>