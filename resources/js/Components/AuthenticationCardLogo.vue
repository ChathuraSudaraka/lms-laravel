<script setup>
import { Link } from '@inertiajs/vue3';
</script>

<template>
    <Link :href="route('home')" class="flex items-center gap-2">
        <img src="/logo.png" alt="Logo" class="w-16 h-16" />
        <span class="text-2xl font-bold">SCIENCE<span class="text-primary-500">LAB</span></span>
    </Link>
</template>
