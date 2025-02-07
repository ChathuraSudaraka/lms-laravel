<template>
  <header class="bg-white border-b border-gray-100">
    <div class="flex items-center justify-between px-4 md:px-6 py-4">
      <!-- Search Section -->
      <div class="hidden md:flex items-center flex-1 max-w-2xl">
        <span class="p-input-icon-left w-full">
          <InputGroup class="w-full">
            <InputGroupAddon>
              <i class="pi pi-search text-gray-400"></i>
            </InputGroupAddon>
            <InputText 
              type="text" 
              v-model="search" 
              placeholder="Search anything..." 
              class="w-full border-0 bg-gray-50/80 focus:bg-white transition-colors"
            />
            <InputGroupAddon class="hidden lg:flex">
              <Kbd>⌘K</Kbd>
            </InputGroupAddon>
          </InputGroup>
        </span>
      </div>

      <!-- Mobile Search Button -->
      <Button 
        icon="pi pi-search"
        class="block md:!hidden p-button-rounded p-button-text p-button-plain"
        @click="toggleMobileSearch"
      />

      <!-- Actions Section -->
      <div class="flex items-center space-x-2 md:space-x-6">
        <!-- Notifications -->
        <div class="relative hidden sm:block">
          <Button 
            icon="pi pi-bell" 
            class="p-button-rounded p-button-text p-button-plain hover:bg-gray-50"
            badge="2"
            badge-class="bg-red-500"
            v-tooltip.bottom="'Notifications'"
          />
        </div>

        <!-- Messages -->
        <div class="relative hidden sm:block">
          <Button 
            icon="pi pi-envelope" 
            class="p-button-rounded p-button-text p-button-plain hover:bg-gray-50"
            badge="3"
            badge-class="bg-blue-500"
            v-tooltip.bottom="'Messages'"
          />
        </div>

        <!-- Divider -->
        <div class="hidden sm:block h-8 w-px bg-gray-200"></div>

        <!-- User Profile -->
        <div class="flex items-center space-x-3">
          <Link :href="route('profile.show')">
            <Avatar 
              :image="userPhotoUrl" 
              shape="circle" 
              size="normal"
              class="ring-2 ring-primary-100 cursor-pointer hover:ring-primary-200 transition-all"
            />
          </Link>
          <div class="hidden md:block">
            <Link 
              :href="route('profile.show')"
              class="hover:text-primary-600 transition-colors"
            >
              <h3 class="text-sm font-medium text-gray-700">{{ userName }}</h3>
              <p class="text-xs text-gray-500">{{ userRole }}</p>
            </Link>
          </div>
          <Button 
            icon="pi pi-chevron-down"
            class="p-button-rounded p-button-text p-button-plain !p-2"
            @click="toggleMenu"
            aria-haspopup="true"
            aria-controls="user-menu"
          />
        </div>
      </div>
    </div>

    <!-- Mobile Search Overlay -->
    <div v-if="showMobileSearch" class="md:hidden px-4 pb-4">
      <InputGroup class="w-full">
        <InputGroupAddon>
          <i class="pi pi-search text-gray-400"></i>
        </InputGroupAddon>
        <InputText 
          type="text" 
          v-model="search" 
          placeholder="Search anything..." 
          class="w-full border-0 bg-gray-50/80 focus:bg-white transition-colors"
        />
      </InputGroup>
    </div>

    <!-- User Menu -->
    <Menu 
      id="user-menu"
      ref="menu" 
      :model="menuItems" 
      :popup="true"
      class="!min-w-[200px]"
    />
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Link, router } from '@inertiajs/vue3';
import InputText from 'primevue/inputtext'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import Button from 'primevue/button'
import Avatar from 'primevue/avatar'
import Menu from 'primevue/menu'
import Kbd from './Kbd.vue'
import Tooltip from 'primevue/tooltip'

const props = defineProps({
  userPhotoUrl: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    default: 'John Doe'
  },
  userRole: {
    type: String,
    default: 'Administrator'
  }
})

const search = ref('')
const showMobileSearch = ref(false)
const menu = ref()

const toggleMobileSearch = () => {
  showMobileSearch.value = !showMobileSearch.value
}

const toggleMenu = (event) => {
  menu.value.toggle(event)
}

const handleLogout = () => {
  router.post(route('logout'));
};

const menuItems = [
  {
    label: 'Profile',
    icon: 'pi pi-user',
    command: () => router.get(route('profile.show'))
  },
  {
    label: 'Settings',
    icon: 'pi pi-cog',
    command: () => router.get(route('console.settings'))
  },
  { separator: true },
  {
    label: 'Messages',
    icon: 'pi pi-envelope',
    class: 'sm:hidden', // Only show on mobile
    badge: '3',
    badgeClass: 'bg-blue-500'
  },
  {
    label: 'Notifications',
    icon: 'pi pi-bell',
    class: 'sm:hidden', // Only show on mobile
    badge: '2',
    badgeClass: 'bg-red-500'
  },
  { separator: true },
  {
    label: 'Sign Out',
    icon: 'pi pi-power-off',
    class: 'text-red-500',
    command: handleLogout
  }
];

// Add keyboard shortcut for search
const handleKeydown = (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
    event.preventDefault();
    search.value = '';
    showMobileSearch.value = true;
  }
};

// Add event listener for keyboard shortcut
onMounted(() => {
  document.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown);
});
</script>

<style scoped>
:deep(.p-menu) {
  border: none;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  border-radius: 0.75rem;
}

:deep(.p-menu .p-menuitem-link) {
  padding: 0.5rem 1rem;
}

:deep(.p-menu .p-menuitem-link:not(.p-disabled):hover) {
  background-color: #f9fafb;
}

:deep(.p-menu .p-menuitem-link .p-menuitem-icon) {
  color: #9ca3af;
}

:deep(.p-menu .p-menuitem-link .p-menuitem-text) {
  color: #374151;
}

:deep(.p-menu .p-menuitem-link:not(.p-disabled):hover .p-menuitem-text) {
  color: var(--primary-600);
}

:deep(.p-menu .p-menuitem-link .p-badge) {
  margin-left: auto;
}
</style>
