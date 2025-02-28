<script setup>
import { Head, Link, useForm } from '@inertiajs/vue3';
import AuthenticationCard from '@/Components/AuthenticationCard.vue';
import AuthenticationCardLogo from '@/Components/AuthenticationCardLogo.vue';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';
import Checkbox from 'primevue/checkbox';
import Divider from 'primevue/divider';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import { ref } from 'vue';

defineProps({
    canResetPassword: Boolean,
    status: String,
});

const form = useForm({
    email: '',
    password: '',
    remember: false,
});

const showPassword = ref(false);

const togglePassword = () => {
    showPassword.value = !showPassword.value;
};

const submit = () => {
    form.transform(data => ({
        ...data,
        remember: form.remember ? 'on' : '',
    })).post(route('login'), {
        onFinish: () => form.reset('password'),
    });
};
</script>

<template>
    <Head title="Log in" />

    <AuthenticationCard>
        <template #logo>
            <AuthenticationCardLogo />
        </template>

        <form @submit.prevent="submit" class="space-y-4">
            <div v-if="status" class="text-sm text-green-600 font-medium mb-4">
                {{ status }}
            </div>

            <div class="space-y-2">
                <label for="email" class="text-sm font-medium text-gray-700 block">Email</label>
                <InputGroup>
                    <InputGroupAddon>
                        <i class="pi pi-user text-gray-400"></i>
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
                        placeholder="Enter your password"
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

            <div class="flex items-center justify-between">
                <div class="flex items-center">
                    <Checkbox v-model="form.remember" :binary="true" id="remember" />
                    <label for="remember" class="ml-2 text-sm text-gray-600">Remember me</label>
                </div>

                <Link
                    v-if="canResetPassword"
                    :href="route('password.request')"
                    class="text-sm text-primary-600 hover:text-primary-700"
                >
                    Forgot password?
                </Link>
            </div>

            <Button
                type="submit"
                label="Sign in"
                :loading="form.processing"
                class="w-full"
            />

            <Divider align="center">
                <span class="text-sm text-gray-500">New to platform?</span>
            </Divider>

            <div class="text-center">
                <Link
                    :href="route('register')"
                    class="text-sm text-primary-600 hover:text-primary-700 font-medium"
                >
                    Create an account
                </Link>
            </div>
        </form>
    </AuthenticationCard>
</template>

<style scoped>
:deep(.p-password-input) {
    width: 100%;
}

:deep(.p-inputtext) {
    border-radius: 0.375rem;
}

:deep(.p-password .p-icon) {
    color: #6b7280;
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
