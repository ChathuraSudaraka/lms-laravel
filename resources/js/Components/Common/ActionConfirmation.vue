<script setup>
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';

defineProps({
    visible: Boolean,
    header: String,
    icon: String,
    iconSeverity: {
        type: String,
        default: 'info'
    },
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

defineEmits(['update:visible', 'confirm', 'cancel']);
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
            root: { class: 'action-confirmation-dialog' },
            header: { class: 'border-b border-gray-200' }
        }"
    >
        <div class="flex flex-col gap-3">
            <!-- Icon Header -->
            <div v-if="icon" class="flex items-center gap-3 mb-2">
                <div :class="[
                    'w-10 h-10 rounded-full flex items-center justify-center',
                    iconSeverity === 'danger' ? 'bg-red-50' : 
                    iconSeverity === 'success' ? 'bg-green-50' : 
                    iconSeverity === 'warning' ? 'bg-yellow-50' : 
                    'bg-blue-50'
                ]">
                    <i :class="[
                        'pi', icon,
                        iconSeverity === 'danger' ? 'text-red-500' : 
                        iconSeverity === 'success' ? 'text-green-500' : 
                        iconSeverity === 'warning' ? 'text-yellow-500' : 
                        'text-blue-500'
                    ]"></i>
                </div>
                <slot name="header"></slot>
            </div>

            <!-- Content -->
            <slot></slot>

            <!-- Additional Info -->
            <slot name="additional-info"></slot>
        </div>

        <template #footer>
            <div class="flex justify-end gap-2">
                <Button 
                    label="Cancel" 
                    @click="$emit('cancel')" 
                    text
                    class="!font-medium"
                />
                <Button 
                    :label="confirmLabel"
                    :icon="confirmIcon"
                    :severity="confirmSeverity"
                    @click="$emit('confirm')"
                    class="!font-medium"
                />
            </div>
        </template>
    </Dialog>
</template>

<style scoped>
.action-confirmation-dialog {
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