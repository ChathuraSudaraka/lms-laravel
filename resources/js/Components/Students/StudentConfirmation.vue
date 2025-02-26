<script setup>
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';

defineProps({
    visible: Boolean,
    student: Object,
    header: String,
    icon: String,
    message: String,
    confirmLabel: {
        type: String,
        default: 'Confirm'
    },
    confirmIcon: String,
    confirmSeverity: {
        type: String,
        default: 'primary'
    }
});

defineEmits(['update:visible', 'confirm']);
</script>

<template>
    <Dialog
        :visible="visible"
        modal
        :header="header"
        :style="{ width: '35vw' }"
        :breakpoints="{ '960px': '75vw', '641px': '90vw' }"
        @update:visible="$emit('update:visible', $event)"
        :pt="{
            root: { class: 'student-confirmation-dialog' },
            header: { class: 'border-b border-gray-200' }
        }"
    >
        <div class="flex flex-col gap-4 py-3">
            <!-- Icon Header -->
            <div v-if="icon" class="flex items-center gap-3">
                <div :class="[
                    'w-10 h-10 rounded-full flex items-center justify-center',
                    confirmSeverity === 'danger' ? 'bg-red-50' : 
                    confirmSeverity === 'success' ? 'bg-green-50' : 
                    'bg-blue-50'
                ]">
                    <i :class="[
                        'pi', icon,
                        confirmSeverity === 'danger' ? 'text-red-500' : 
                        confirmSeverity === 'success' ? 'text-green-500' : 
                        'text-blue-500'
                    ]"></i>
                </div>
                <div>
                    <h3 class="text-lg font-semibold text-gray-900">{{ header }}</h3>
                    <p class="text-sm text-gray-600">{{ message }}</p>
                </div>
            </div>

            <!-- Student Info -->
            <div class="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <i class="pi pi-user text-gray-600"></i>
                    </div>
                    <div>
                        <h4 class="font-medium text-gray-900">{{ student?.name }}</h4>
                        <p class="text-sm text-gray-500">{{ student?.email }}</p>
                    </div>
                </div>
            </div>

            <!-- Additional Content -->
            <slot></slot>
        </div>

        <template #footer>
            <div class="flex justify-end gap-2">
                <Button 
                    label="Cancel" 
                    @click="$emit('update:visible', false)" 
                    text
                    class="!font-medium"
                />
                <Button 
                    :label="confirmLabel"
                    :icon="confirmIcon ? 'pi ' + confirmIcon : undefined"
                    :severity="confirmSeverity"
                    @click="$emit('confirm', student)"
                    class="!font-medium"
                />
            </div>
        </template>
    </Dialog>
</template>

<style scoped>
.student-confirmation-dialog {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    border-radius: 0.75rem;
}

:deep(.p-dialog-header) {
    border-top-left-radius: 0.75rem;
    border-top-right-radius: 0.75rem;
    padding: 1.5rem;
}

:deep(.p-dialog-content) {
    padding: 1.5rem;
}

:deep(.p-dialog-footer) {
    padding: 1rem 1.5rem;
    border-bottom-left-radius: 0.75rem;
    border-bottom-right-radius: 0.75rem;
    border-top: 1px solid #e5e7eb;
    background-color: #f9fafb;
}

:deep(.p-dialog-footer .p-button) {
    min-width: 6rem;
}
</style>