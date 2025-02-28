<script setup>
import { Head, useForm } from '@inertiajs/vue3';
import AuthenticationCard from '@/Components/AuthenticationCard.vue';
import AuthenticationCardLogo from '@/Components/AuthenticationCardLogo.vue';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import { ref } from 'vue';

const form = useForm({
    password: '',
});

const showPassword = ref(false);

const togglePassword = () => {
    showPassword.value = !showPassword.value;
};

const submit = () => {
    form.post(route('password.confirm'), {
        onFinish: () => form.reset('password'),
    });
};
</script>

<template>
    <Head title="Secure Area" />

    <AuthenticationCard>
        <template #logo>
            <AuthenticationCardLogo />
        </template>

        <div class="mb-6 text-sm text-gray-600">
            This is a secure area of the application. Please confirm your password before continuing.
        </div>

        <form @submit.prevent="submit" class="space-y-4">
            <div class="space-y-2">
                <label for="password" class="text-sm font-medium text-gray-700 block">Password</label>
                <InputGroup>
                    <InputGroupAddon>
                        <i class="pi pi-lock text-gray-400"></i>
                    </InputGroupAddon>
                    <InputText
                        id="password"
                        v-model="form.password"
                        :type="showPassword ? 'text' : 'password'"
                        class="w-full"
                        :class="{ 'p-invalid': form.errors.password }"
                        placeholder="Enter your password"
                        required
                        autofocus
                    />
                    <InputGroupAddon>
                        <Button
                            type="button"
                            icon="pi pi-eye"
                            :class="{ 'pi-eye-slash': showPassword }"
                            @click="togglePassword"
                            text
                            size="small"
                            class="!px-2"
                        />
                    </InputGroupAddon>
                </InputGroup>
                <small class="p-error" v-if="form.errors.password">{{ form.errors.password }}</small>
            </div>

            <Button
                type="submit"
                label="Confirm"
                :loading="form.processing"
                class="w-full"
            />
        </form>
    </AuthenticationCard>
</template>

<style scoped>
:deep(.p-inputtext) {
    border-radius: 0.375rem;
}

:deep(.p-inputgroup-addon:last-child) {
    padding: 0;
}

:deep(.p-button.p-button-icon-only.p-button-text) {
    color: #6b7280;
    
    &:hover {
        color: var(--primary-600);
        background-color: transparent;
    }
}

/* Add specific styling for error messages */
:deep(.p-error), .p-error {
    color: #ef4444 !important; /* Using Tailwind's red-500 color */
    font-weight: 500;
    margin-top: 0.25rem;
    display: block;
}
</style>
