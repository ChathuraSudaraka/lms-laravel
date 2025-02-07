<template>
  <div class="min-h-screen bg-gray-100">
    <Sidebar />

    <div :class="[
      'transition-all duration-300',
      sidebarStore.isCollapsed ? 'ml-[4.5rem]' : 'ml-64'
    ]">
      <Header :userPhotoUrl="$page.props.auth.user.profile_photo_url" />

      <main class="p-6">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import { Head } from '@inertiajs/vue3'
import { useSidebarStore } from '@/Stores/sidebarStore'
import Sidebar from '@/Components/Dashboard/Sidebar.vue'
import Header from '@/Components/Dashboard/Header.vue'

const sidebarStore = useSidebarStore()
</script>
