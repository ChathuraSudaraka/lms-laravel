<script setup>
import { computed } from 'vue';
import { Head, Link, useForm } from '@inertiajs/vue3';
import AuthenticationCard from '@/Components/AuthenticationCard.vue';
import AuthenticationCardLogo from '@/Components/AuthenticationCardLogo.vue';
import Button from 'primevue/button';
import Divider from 'primevue/divider';

const props = defineProps({
    status: String,
});

const form = useForm({});

const submit = () => {
    form.post(route('verification.send'));
};

const verificationLinkSent = computed(() => props.status === 'verification-link-sent');
</script>

<template>
    <Head title="Email Verification" />

    <AuthenticationCard>
        <template #logo>
            <AuthenticationCardLogo />
        </template>

        <div class="mb-4 text-sm text-gray-600">
            Before continuing, could you verify your email address by clicking on the link we just emailed to you? If you didn't receive the email, we will gladly send you another.
        </div>

        <div v-if="verificationLinkSent" class="mb-4 font-medium text-sm text-green-600">
            A new verification link has been sent to the email address you provided in your profile settings.
        </div>

        <form @submit.prevent="submit" class="space-y-4">
            <Button
                type="submit"
                label="Resend Verification Email"
                :loading="form.processing"
                class="w-full"
            />

            <Divider align="center">
                <span class="text-sm text-gray-500">Quick Actions</span>
            </Divider>

            <div class="flex items-center justify-center gap-4">
                <Link
                    :href="route('profile.show')"
                    class="text-sm text-primary-600 hover:text-primary-700 font-medium"
                >
                    Edit Profile
                </Link>

                <Link
                    :href="route('logout')"
                    method="post"
                    as="button"
                    class="text-sm text-primary-600 hover:text-primary-700 font-medium"
                >
                    Log Out
                </Link>
            </div>
        </form>
    </AuthenticationCard>
</template>

<style scoped>
/* Add specific styling for error messages */
:deep(.p-error), .p-error {
    color: #ef4444 !important; /* Using Tailwind's red-500 color */
    font-weight: 500;
    margin-top: 0.25rem;
    display: block;
}
</style>
