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

const form = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    terms: false,
});

const submit = () => {
    form.post(route('register'), {
        onFinish: () => form.reset('password', 'password_confirmation'),
    });
};
</script>

<template>
    <Head title="Register" />

    <AuthenticationCard>
        <template #logo>
            <AuthenticationCardLogo />
        </template>

        <form @submit.prevent="submit" class="space-y-4">
            <div class="space-y-2">
                <label for="name" class="text-sm font-medium text-gray-700 block">Full Name</label>
                <InputGroup>
                    <InputGroupAddon>
                        <i class="pi pi-user text-gray-400"></i>
                    </InputGroupAddon>
                    <InputText
                        id="name"
                        v-model="form.name"
                        type="text"
                        class="w-full"
                        :class="{ 'p-invalid': form.errors.name }"
                        placeholder="Enter your name"
                        required
                        autofocus
                    />
                </InputGroup>
                <small class="p-error" v-if="form.errors.name">{{ form.errors.name }}</small>
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
                    />
                </InputGroup>
                <small class="p-error" v-if="form.errors.email">{{ form.errors.email }}</small>
            </div>

            <div class="space-y-2">
                <label for="password" class="text-sm font-medium text-gray-700 block">Password</label>
                <Password
                    id="password"
                    v-model="form.password"
                    :class="{ 'p-invalid': form.errors.password }"
                    placeholder="Create a password"
                    required
                />
                <small class="p-error" v-if="form.errors.password">{{ form.errors.password }}</small>
            </div>

            <div class="space-y-2">
                <label for="password_confirmation" class="text-sm font-medium text-gray-700 block">
                    Confirm Password
                </label>
                <Password
                    id="password_confirmation"
                    v-model="form.password_confirmation"
                    :class="{ 'p-invalid': form.errors.password_confirmation }"
                    placeholder="Confirm your password"
                    :feedback="false"
                    toggleMask
                    required
                />
                <small class="p-error" v-if="form.errors.password_confirmation">
                    {{ form.errors.password_confirmation }}
                </small>
            </div>

            <div v-if="$page.props.jetstream.hasTermsAndPrivacyPolicyFeature" class="space-y-2">
                <div class="flex items-start">
                    <Checkbox v-model="form.terms" :binary="true" id="terms" :class="{ 'p-invalid': form.errors.terms }" />
                    <label for="terms" class="ml-2 text-sm text-gray-600">
                        I agree to the
                        <a :href="route('terms.show')" target="_blank" class="text-primary-600 hover:text-primary-700">
                            Terms of Service
                        </a>
                        and
                        <a :href="route('policy.show')" target="_blank" class="text-primary-600 hover:text-primary-700">
                            Privacy Policy
                        </a>
                    </label>
                </div>
                <small class="p-error" v-if="form.errors.terms">{{ form.errors.terms }}</small>
            </div>

            <Button
                type="submit"
                label="Register"
                :loading="form.processing"
                class="w-full"
            />

            <Divider align="center">
                <span class="text-sm text-gray-500">Already have an account?</span>
            </Divider>

            <div class="text-center">
                <Link
                    :href="route('login')"
                    class="text-sm text-primary-600 hover:text-primary-700 font-medium"
                >
                    Sign in instead
                </Link>
            </div>
        </form>
    </AuthenticationCard>
</template>

<style scoped>
:deep(.p-password),
:deep(.p-password-input) {
    width: 100%;
}

:deep(.p-inputtext) {
    border-radius: 0.375rem;
}

:deep(.p-password .p-icon) {
    color: #6b7280;
}

:deep(.p-password-panel) {
    border: none;
    border-radius: 0.5rem;
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
}

/* Add specific styling for error messages */
:deep(.p-error), .p-error {
    color: #ef4444 !important; /* Using Tailwind's red-500 color */
    font-weight: 500;
    margin-top: 0.25rem;
    display: block;
}
</style>
