<script setup>
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import Button from 'primevue/button';

const props = defineProps({
    visible: {
        type: Boolean,
        required: true
    },
    student: {
        type: Object,
        required: true
    },
    grades: {
        type: Array,
        required: true
    }
});

const emit = defineEmits(['update:visible', 'update:student', 'send']);

const updateStudent = (field, value) => {
    emit('update:student', { ...props.student, [field]: value });
};
</script>

<template>
    <Dialog 
        :visible="visible" 
        @update:visible="$emit('update:visible', $event)" 
        header="Invite Student" 
        modal
        :style="{ width: '50vw' }"
        :breakpoints="{ '960px': '75vw', '641px': '90vw' }"
        :maximizable="true"
    >
        <div class="flex flex-col gap-4">
            <div class="field">
                <label for="name">Name</label>
                <InputText 
                    id="name" 
                    :value="student.name" 
                    @input="updateStudent('name', $event.target.value)"
                    class="w-full" 
                />
            </div>
            <div class="field">
                <label for="email">Email</label>
                <InputText 
                    id="email" 
                    type="email" 
                    :value="student.email"
                    @input="updateStudent('email', $event.target.value)"
                    class="w-full" 
                />
            </div>
            <div class="field">
                <label for="grade">Grade</label>
                <Dropdown 
                    id="grade" 
                    :value="student.grade"
                    @change="updateStudent('grade', $event.value)"
                    :options="grades" 
                    class="w-full"
                    placeholder="Select Grade" 
                />
            </div>
        </div>
        <template #footer>
            <Button label="Cancel" icon="pi pi-times" @click="$emit('update:visible', false)" text severity="secondary" />
            <Button label="Send Invite" icon="pi pi-send" @click="$emit('send')" severity="primary" />
        </template>
    </Dialog>
</template>

<style scoped>
:deep(.p-dialog-content) {
    padding: 2rem;
}
</style>
