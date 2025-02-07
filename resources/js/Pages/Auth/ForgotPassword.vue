<script setup>
import { Head, Link, useForm } from '@inertiajs/vue3';
import AuthenticationCard from '@/Components/AuthenticationCard.vue';
import AuthenticationCardLogo from '@/Components/AuthenticationCardLogo.vue';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import Divider from 'primevue/divider';

defineProps({
    status: String,
});

const form = useForm({
    email: '',
});

const submit = () => {
    form.post(route('password.email'));
};
</script>

<template>
    <Head title="Forgot Password" />

    <AuthenticationCard>
        <template #logo>
            <AuthenticationCardLogo />
        </template>

        <form @submit.prevent="submit" class="space-y-4">
            <div class="text-center space-y-2">
                <h2 class="text-2xl font-bold text-gray-900">Forgot Password?</h2>
                <p class="text-sm text-gray-600">
                    Enter your email address and we'll send you a link to reset your password.
                </p>
            </div>

            <div v-if="status" class="font-medium text-sm text-green-600 text-center">
                {{ status }}
            </div>

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

            <Button
                type="submit"
                label="Send Reset Link"
                :loading="form.processing"
                class="w-full"
            />

            <Divider align="center">
                <span class="text-sm text-gray-500">Remember your password?</span>
            </Divider>

            <div class="text-center">
                <Link
                    :href="route('login')"
                    class="text-sm text-primary-600 hover:text-primary-700 font-medium"
                >
                    Back to login
                </Link>
            </div>
        </form>
    </AuthenticationCard>
</template>

<style scoped>
:deep(.p-inputtext) {
    border-radius: 0.375rem;
}

:deep(.p-inputgroup-addon) {
    background-color: transparent;
    border-color: #e5e7eb;
}

:deep(.p-button) {
    border-radius: 0.375rem;
}
</style>
