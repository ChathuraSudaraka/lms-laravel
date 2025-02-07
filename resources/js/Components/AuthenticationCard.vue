<script setup>
import Card from 'primevue/card';
</script>

<template>
    <div class="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
        <div class="mb-8">
            <slot name="logo" />
        </div>

        <Card class="auth-card w-full sm:max-w-md">
            <template #content>
                <slot />
            </template>
        </Card>
    </div>
</template>

<style scoped>
:deep(.auth-card) {
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
}

:deep(.p-card) {
    background-color: white;
    border-radius: 0.5rem;
}

:deep(.p-card-content) {
    padding: 1.5rem;
}
</style>
