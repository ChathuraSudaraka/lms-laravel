<script setup>
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

const props = defineProps({
    visible: {
        type: Boolean,
        required: true
    },
    moderator: {
        type: Object,
        required: true
    }
});

const emit = defineEmits(['update:visible', 'update:moderator', 'send']);

const updateModerator = (field, value) => {
    emit('update:moderator', { ...props.moderator, [field]: value });
};
</script>

<template>
    <Dialog 
        :visible="visible" 
        @update:visible="$emit('update:visible', $event)" 
        header="Invite Moderator" 
        modal
        :style="{ width: '50vw' }"
        :breakpoints="{ '960px': '75vw', '641px': '90vw' }"
    >
        <div class="flex flex-col gap-4">
            <div class="field">
                <label for="name">Name</label>
                <InputText 
                    id="name" 
                    :value="moderator.name" 
                    @input="updateModerator('name', $event.target.value)"
                    class="w-full" 
                />
            </div>
            <div class="field">
                <label for="email">Email</label>
                <InputText 
                    id="email" 
                    type="email" 
                    :value="moderator.email"
                    @input="updateModerator('email', $event.target.value)"
                    class="w-full" 
                />
            </div>
        </div>
        <template #footer>
            <Button label="Cancel" icon="pi pi-times" @click="$emit('update:visible', false)" text severity="secondary" />
            <Button label="Send Invite" icon="pi pi-send" @click="$emit('send')" severity="primary" />
        </template>
    </Dialog>
</template>
