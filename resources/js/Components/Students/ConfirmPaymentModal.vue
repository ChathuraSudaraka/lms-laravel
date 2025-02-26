<script setup>
import StudentConfirmation from './StudentConfirmation.vue';

defineProps({
    visible: Boolean,
    student: Object
});

defineEmits(['update:visible', 'confirm']);

const getCurrentMonth = () => {
    return new Date().toLocaleString('default', { month: 'long', year: 'numeric' });
};
</script>

<template>
    <StudentConfirmation
        :visible="visible"
        :student="student"
        header="Confirm Payment"
        :message="`Record payment for ${getCurrentMonth()}`"
        icon="pi-check-circle"
        confirmLabel="Mark as Paid"
        confirmIcon="pi-check"
        confirmSeverity="success"
        @update:visible="$emit('update:visible', $event)"
        @confirm="$emit('confirm', student)"
    >
        <!-- Payment Details -->
        <div class="p-3 bg-green-50 border border-green-100 rounded-lg">
            <p class="text-sm text-green-600 font-medium mb-2">This action will:</p>
            <ul class="space-y-2 text-sm text-green-600">
                <li class="flex items-center gap-2">
                    <i class="pi pi-check-circle"></i>
                    <span>Update payment status to "Paid"</span>
                </li>
                <li class="flex items-center gap-2">
                    <i class="pi pi-calendar"></i>
                    <span>Record payment for {{ getCurrentMonth() }}</span>
                </li>
                <li class="flex items-center gap-2">
                    <i class="pi pi-unlock"></i>
                    <span>Grant full access to all course materials</span>
                </li>
            </ul>
        </div>

        <!-- Payment Summary -->
        <div class="border-t border-gray-200 mt-2 pt-3">
            <div class="flex justify-between items-center text-sm">
                <span class="text-gray-600">Payment Period:</span>
                <span class="font-medium text-gray-900">{{ getCurrentMonth() }}</span>
            </div>
            <div class="flex justify-between items-center text-sm mt-1">
                <span class="text-gray-600">Status Update:</span>
                <span class="text-green-600 font-medium flex items-center gap-1">
                    <i class="pi pi-check-circle"></i>
                    Paid
                </span>
            </div>
        </div>
    </StudentConfirmation>
</template>