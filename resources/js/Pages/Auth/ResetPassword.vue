<script setup>
import { Head, useForm } from '@inertiajs/vue3';
import AuthenticationCard from '@/Components/AuthenticationCard.vue';
import AuthenticationCardLogo from '@/Components/AuthenticationCardLogo.vue';
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';

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

        <form @submit.prevent="submit">
            <div>
                <InputLabel for="email" value="Email" />
                <InputGroup>
                    <InputGroupAddon>
                        <i class="pi pi-envelope"></i>
                    </InputGroupAddon>
                    <InputText
                        id="email"
                        v-model="form.email"
                        type="email"
                        class="w-full"
                        required
                        autofocus
                        autocomplete="username"
                    />
                </InputGroup>
                <InputError class="mt-2" :message="form.errors.email" />
            </div>

            <div class="mt-4">
                <InputLabel for="password" value="Password" />
                <InputGroup>
                    <InputGroupAddon>
                        <i class="pi pi-lock"></i>
                    </InputGroupAddon>
                    <InputText
                        id="password"
                        v-model="form.password"
                        type="password"
                        class="w-full"
                        required
                        autocomplete="new-password"
                    />
                </InputGroup>
                <InputError class="mt-2" :message="form.errors.password" />
            </div>

            <div class="mt-4">
                <InputLabel for="password_confirmation" value="Confirm Password" />
                <InputGroup>
                    <InputGroupAddon>
                        <i class="pi pi-lock"></i>
                    </InputGroupAddon>
                    <InputText
                        id="password_confirmation"
                        v-model="form.password_confirmation"
                        type="password"
                        class="w-full"
                        required
                        autocomplete="new-password"
                    />
                </InputGroup>
                <InputError class="mt-2" :message="form.errors.password_confirmation" />
            </div>

            <div class="flex items-center justify-end mt-4">
                <Button
                    :loading="form.processing"
                    :disabled="form.processing"
                    label="Reset Password"
                />
            </div>
        </form>
    </AuthenticationCard>
</template>
