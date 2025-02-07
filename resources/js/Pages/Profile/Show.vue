<script setup>
import AppLayout from '@/Layouts/AppLayout.vue';
import { useForm, usePage } from '@inertiajs/vue3';
import { ref } from 'vue';
import Card from 'primevue/card';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Password from 'primevue/password';
import Dialog from 'primevue/dialog';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';

const page = usePage();


// Added user from global page props
const user = page.props.auth.user;

const props = defineProps({
    confirmsTwoFactorAuthentication: Boolean,
    sessions: Array,
});

// Profile Update Form
const photoPreview = ref(null);
const photoInput = ref(null);
const profileForm = useForm({
    name: user.name, // use user from $page.props.auth.user
    email: user.email,
    photo: null,
});

// Password Update Form
const passwordForm = useForm({
    current_password: '',
    password: '',
    password_confirmation: '',
});

// Session Management
const confirmingLogout = ref(false);
const logoutForm = useForm({
    password: '',
});

// Delete Account
const confirmingUserDeletion = ref(false);
const deleteForm = useForm({
    password: '',
});

// Helper: clear file input
const clearPhotoFileInput = () => {
    if (photoInput.value) {
        photoInput.value.value = null;
    }
    photoPreview.value = null;
};

// Profile Update Methods
const updateProfileInformation = () => {
    if (photoInput.value) {
        profileForm.photo = photoInput.value.files[0];
    }
    profileForm.post(route('user-profile-information.update'), {
        errorBag: 'updateProfileInformation',
        preserveScroll: true,
        onSuccess: () => { clearPhotoFileInput(); },
    });
};

// Password Update Methods
const updatePassword = () => {
    passwordForm.put(route('user-password.update'), {
        errorBag: 'updatePassword',
        preserveScroll: true,
        onSuccess: () => passwordForm.reset(),
    });
};

// Session Management Methods
const confirmLogout = () => {
    confirmingLogout.value = true;
};

const logoutOtherBrowserSessions = () => {
    logoutForm.delete(route('other-browser-sessions.destroy'), {
        preserveScroll: true,
        onSuccess: () => { confirmingLogout.value = false; },
        onFinish: () => logoutForm.reset(),
    });
};

// Delete Account Methods
const confirmUserDeletion = () => {
    confirmingUserDeletion.value = true;
};

const deleteUser = () => {
    deleteForm.delete(route('current-user.destroy'), {
        preserveScroll: true,
        onSuccess: () => { confirmingUserDeletion.value = false; },
        onFinish: () => deleteForm.reset(),
    });
};
</script>

<template>
    <AppLayout>

        <div>
            <div class="space-y-6">
                <!-- Profile Information -->
                <Card v-if="$page.props.jetstream.canUpdateProfileInformation">
                    <template #title>Profile Information</template>
                    <template #content>
                        <form @submit.prevent="updateProfileInformation" class="space-y-4">
                            <div>
                                <InputGroup>
                                    <InputGroupAddon>
                                        <i class="pi pi-user" />
                                    </InputGroupAddon>
                                    <InputText v-model="profileForm.name" type="text" placeholder="Name" />
                                </InputGroup>
                            </div>
                            <div>
                                <InputGroup>
                                    <InputGroupAddon>
                                        <i class="pi pi-envelope" />
                                    </InputGroupAddon>
                                    <InputText v-model="profileForm.email" type="email" placeholder="Email" />
                                </InputGroup>
                            </div>
                            <Button type="submit" label="Save" :loading="profileForm.processing" />
                        </form>
                    </template>
                </Card>

                <!-- Update Password -->
                <Card v-if="$page.props.jetstream.canUpdatePassword">
                    <template #title>
                        <div class="flex items-center mb-3">
                            <i class="pi pi-lock mr-2"></i>
                            <span>Update Password</span>
                        </div>
                    </template>
                    <template #content>
                        <form @submit.prevent="updatePassword" class="space-y-4">
                            <InputGroup>
                                <InputGroupAddon>
                                    <i class="pi pi-key"></i>
                                </InputGroupAddon>
                                <Password v-model="passwordForm.current_password" placeholder="Current Password"
                                    :feedback="false" toggleMask />
                            </InputGroup>
                            <InputGroup>
                                <InputGroupAddon>
                                    <i class="pi pi-lock"></i>
                                </InputGroupAddon>
                                <Password v-model="passwordForm.password" placeholder="New Password" toggleMask />
                            </InputGroup>
                            <InputGroup>
                                <InputGroupAddon>
                                    <i class="pi pi-check-circle"></i>
                                </InputGroupAddon>
                                <Password v-model="passwordForm.password_confirmation" placeholder="Confirm Password"
                                    :feedback="false" toggleMask />
                            </InputGroup>
                            <Button type="submit" label="Save" icon="pi pi-save" :loading="passwordForm.processing" />
                        </form>
                    </template>
                </Card>

                <!-- Browser Sessions -->
                <Card>
                    <template #title>Browser Sessions</template>
                    <template #content>
                        <div class="space-y-4">
                            <div v-for="session in sessions" :key="session.id" class="flex items-center">
                                <i class="pi pi-desktop mr-2" />
                                <div>
                                    {{ session.agent.platform }} - {{ session.agent.browser }}
                                </div>
                            </div>
                            <Button label="Logout Other Browser Sessions" @click="confirmLogout" />
                        </div>
                    </template>
                </Card>

                <!-- Delete Account -->
                <Card v-if="$page.props.jetstream.hasAccountDeletionFeatures">
                    <template #title>Delete Account</template>
                    <template #content>
                        <Button severity="danger" label="Delete Account" @click="confirmUserDeletion" />
                    </template>
                </Card>
            </div>
        </div>

        <!-- Modals -->
        <!-- Logout Sessions Modal -->
        <Dialog v-model:visible="confirmingLogout" :style="{ width: '450px' }" header="Logout Other Browser Sessions" modal :dismissableMask="true"
            :closeOnEscape="true" class="p-4">
            <div class="mb-4">
                <p class="text-gray-600">Please enter your password to confirm you would like to logout of your other
                    browser
                    sessions.</p>
                <InputGroup class="mt-4">
                    <InputGroupAddon>
                        <i class="pi pi-lock"></i>
                    </InputGroupAddon>
                    <Password v-model="logoutForm.password" placeholder="Password" :feedback="false" toggleMask />
                </InputGroup>
            </div>
            <template #footer>
                <div class="flex justify-end gap-2">
                    <Button label="Cancel" class="p-button-text" @click="confirmingLogout = false" />
                    <Button severity="danger" label="Logout Other Sessions" icon="pi pi-sign-out"
                        @click="logoutOtherBrowserSessions" :loading="logoutForm.processing" />
                </div>
            </template>
        </Dialog>

        <!-- Delete Account Modal -->
        <Dialog v-model:visible="confirmingUserDeletion" header="Delete Account" modal :dismissableMask="true"
            :closeOnEscape="true" class="p-4" :style="{ width: '450px' }">
            <div class="mb-4">
                <p class="text-gray-600">Once your account is deleted, all of its resources and data will be permanently
                    deleted. Please enter your password to confirm you would like to permanently delete your account.
                </p>
                <InputGroup class="mt-4">
                    <InputGroupAddon>
                        <i class="pi pi-lock"></i>
                    </InputGroupAddon>
                    <Password v-model="deleteForm.password" placeholder="Password" :feedback="false" toggleMask />
                </InputGroup>
            </div>
            <template #footer>
                <div class="flex justify-end gap-2">
                    <Button label="Cancel" class="p-button-text" @click="confirmingUserDeletion = false" />
                    <Button severity="danger" label="Delete Account" icon="pi pi-trash" @click="deleteUser"
                        :loading="deleteForm.processing" />
                </div>
            </template>
        </Dialog>
    </AppLayout>
</template>
