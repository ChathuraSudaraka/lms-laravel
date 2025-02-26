<script setup>
import StudentConfirmation from './StudentConfirmation.vue';

defineProps({
    visible: Boolean,
    student: Object
});

defineEmits(['update:visible', 'confirm']);
</script>

<template>
    <StudentConfirmation
        :visible="visible"
        :student="student"
        header="Suspend Student Account"
        message="This action will restrict the student's access to the platform"
        icon="pi-exclamation-triangle"
        confirmLabel="Suspend Account"
        confirmIcon="pi-ban"
        confirmSeverity="danger"
        @update:visible="$emit('update:visible', $event)"
        @confirm="$emit('confirm', student)"
    >
        <!-- Consequences -->
        <div class="p-3 bg-red-50 border border-red-100 rounded-lg">
            <p class="text-sm text-red-600 font-medium mb-2">This action will:</p>
            <ul class="space-y-2 text-sm text-red-600">
                <li class="flex items-center gap-2">
                    <i class="pi pi-ban"></i>
                    <span>Restrict student's access to the platform</span>
                </li>
                <li class="flex items-center gap-2">
                    <i class="pi pi-clock"></i>
                    <span>Pause all ongoing courses and assignments</span>
                </li>
                <li class="flex items-center gap-2">
                    <i class="pi pi-inbox"></i>
                    <span>Archive all current progress</span>
                </li>
            </ul>
        </div>
    </StudentConfirmation>
</template>