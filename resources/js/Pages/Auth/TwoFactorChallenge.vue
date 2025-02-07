<script setup>
import { nextTick, ref } from 'vue';
import { Head, useForm } from '@inertiajs/vue3';
import AuthenticationCard from '@/Components/AuthenticationCard.vue';
import AuthenticationCardLogo from '@/Components/AuthenticationCardLogo.vue';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import Divider from 'primevue/divider';

const recovery = ref(false);

const form = useForm({
    code: '',
    recovery_code: '',
});

const recoveryCodeInput = ref(null);
const codeInput = ref(null);

const toggleRecovery = async () => {
    recovery.value ^= true;

    await nextTick();

    if (recovery.value) {
        recoveryCodeInput.value.focus();
        form.code = '';
    } else {
        codeInput.value.focus();
        form.recovery_code = '';
    }
};

const submit = () => {
    form.post(route('two-factor.login'));
};
</script>

<template>
    <Head title="Two-factor Confirmation" />

    <AuthenticationCard>
        <template #logo>
            <AuthenticationCardLogo />
        </template>

        <div class="mb-6 text-sm text-gray-600">
            <template v-if="! recovery">
                Please confirm access to your account by entering the authentication code provided by your authenticator application.
            </template>

            <template v-else>
                Please confirm access to your account by entering one of your emergency recovery codes.
            </template>
        </div>

        <form @submit.prevent="submit" class="space-y-4">
            <div v-if="! recovery" class="space-y-2">
                <label for="code" class="text-sm font-medium text-gray-700 block">Code</label>
                <InputGroup>
                    <InputGroupAddon>
                        <i class="pi pi-lock text-gray-400"></i>
                    </InputGroupAddon>
                    <InputText
                        id="code"
                        ref="codeInput"
                        v-model="form.code"
                        type="text"
                        inputmode="numeric"
                        class="w-full"
                        :class="{ 'p-invalid': form.errors.code }"
                        placeholder="Enter authentication code"
                        autofocus
                        autocomplete="one-time-code"
                    />
                </InputGroup>
                <small class="p-error" v-if="form.errors.code">{{ form.errors.code }}</small>
            </div>

            <div v-else class="space-y-2">
                <label for="recovery_code" class="text-sm font-medium text-gray-700 block">Recovery Code</label>
                <InputGroup>
                    <InputGroupAddon>
                        <i class="pi pi-shield text-gray-400"></i>
                    </InputGroupAddon>
                    <InputText
                        id="recovery_code"
                        ref="recoveryCodeInput"
                        v-model="form.recovery_code"
                        type="text"
                        class="w-full"
                        :class="{ 'p-invalid': form.errors.recovery_code }"
                        placeholder="Enter recovery code"
                        autocomplete="one-time-code"
                    />
                </InputGroup>
                <small class="p-error" v-if="form.errors.recovery_code">{{ form.errors.recovery_code }}</small>
            </div>

            <Button
                type="submit"
                :label="'Log in'"
                :loading="form.processing"
                class="w-full"
            />

            <Divider align="center">
                <span class="text-sm text-gray-500">Or</span>
            </Divider>

            <Button
                type="button"
                :label="recovery ? 'Use an authentication code' : 'Use a recovery code'"
                text
                class="w-full"
                @click="toggleRecovery"
            />
        </form>
    </AuthenticationCard>
</template>

<style scoped>
:deep(.p-inputtext) {
    border-radius: 0.375rem;
}

:deep(.p-inputgroup-addon) {
    background-color: transparent;
}
</style>
