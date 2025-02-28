<script setup>
import { Head, useForm } from '@inertiajs/vue3';
import AuthenticationCard from '@/Components/AuthenticationCard.vue';
import AuthenticationCardLogo from '@/Components/AuthenticationCardLogo.vue';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import { ref } from 'vue';

const props = defineProps({
    email: String,
    token: String,
});

const form = useForm({
    token: props.token,
    email: props.email,
    password: '',
    password_confirmation: '',
});

const showPassword = ref(false);
const showPasswordConfirmation = ref(false);

const togglePassword = () => {
    showPassword.value = !showPassword.value;
};

const togglePasswordConfirmation = () => {
    showPasswordConfirmation.value = !showPasswordConfirmation.value;
};

const submit = () => {
    form.post(route('password.update'), {
        onFinish: () => form.reset('password', 'password_confirmation'),
    });
};
</script>

<template>
    <Head title="Reset Password" />

    <AuthenticationCard>
        <template #logo>
            <AuthenticationCardLogo />
        </template>

        <form @submit.prevent="submit" class="space-y-4">
            <div class="space-y-2">
                <label for="email" class="text-sm font-medium text-gray-700 block">Email</label>
                <InputGroup>
                    <InputGroupAddon>
                        <i class="pi pi-envelope text-gray-400"></i>
                    </InputGroupAddon>
                    <InputText
                        id="email"
                        v-model="form.email"
                        type="email"
                        class="w-full"
                        :class="{ 'p-invalid': form.errors.email }"
                        placeholder="Enter your email"
                        required
                        autofocus
                    />
                </InputGroup>
                <small class="p-error" v-if="form.errors.email">{{ form.errors.email }}</small>
            </div>

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
                        placeholder="Enter new password"
                        required
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

            <div class="space-y-2">
                <label for="password_confirmation" class="text-sm font-medium text-gray-700 block">Confirm Password</label>
                <InputGroup>
                    <InputGroupAddon>
                        <i class="pi pi-lock text-gray-400"></i>
                    </InputGroupAddon>
                    <InputText
                        id="password_confirmation"
                        v-model="form.password_confirmation"
                        :type="showPasswordConfirmation ? 'text' : 'password'"
                        class="w-full"
                        :class="{ 'p-invalid': form.errors.password_confirmation }"
                        placeholder="Confirm new password"
                        required
                    />
                    <InputGroupAddon>
                        <Button
                            type="button"
                            icon="pi pi-eye"
                            :class="{ 'pi-eye-slash': showPasswordConfirmation }"
                            @click="togglePasswordConfirmation"
                            text
                            size="small"
                            class="!px-2"
                        />
                    </InputGroupAddon>
                </InputGroup>
                <small class="p-error" v-if="form.errors.password_confirmation">
                    {{ form.errors.password_confirmation }}
                </small>
            </div>

            <Button
                type="submit"
                label="Reset Password"
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
