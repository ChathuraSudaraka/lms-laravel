<template>
  <div :class="['fixed left-0 top-0 h-full bg-white shadow-sm border-r border-gray-100 flex flex-col transition-all duration-300 z-50',
    sidebarStore.isCollapsed ? 'w-[4.5rem]' : 'w-64']">
    <!-- Collapse Button -->
    <Button v-show="!sidebarStore.isMobile" @click="sidebarStore.toggleSidebar"
      class="!absolute -right-3 top-12 !w-6 !h-6 !p-0" :class="{ '!rotate-180': sidebarStore.isCollapsed }"
      severity="secondary" rounded text raised>
      <i class="pi pi-angle-left text-xs"></i>
    </Button>

    <!-- Logo Section -->
    <div class="p-4 border-b border-gray-50 flex items-center justify-between">
      <div v-if="!sidebarStore.isCollapsed" class="flex items-center space-x-3">
        <div class="w-10 h-10 rounded-lg flex items-center justify-center overflow-hidden">
          <img src="/logo.png" alt="Logo" class="w-full h-full object-cover">
        </div>
        <h1 class="text-xl font-bold">
          SCIENCE<span class="text-primary-500">LAB</span></h1>
      </div>
      <!-- Collapsed Logo -->
      <div v-else class="w-full flex justify-center">
        <div class="w-9 h-9 rounded-lg flex items-center justify-center overflow-hidden">
          <img src="/logo.png" alt="Logo" class="w-full h-full object-cover">
        </div>
      </div>
    </div>

    <!-- Main Navigation -->
    <nav class="flex-1 overflow-y-auto py-2 bg-gray-50/30">
      <!-- Main Menu -->
      <div class="px-2">
        <h2 class="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1 px-4"
          v-show="!sidebarStore.isCollapsed">Main Menu</h2>
        <div class="space-y-0.5">
          <MenuItem v-for="item in filteredMainMenu" :key="item.label" v-bind="item"
            :active="item.route && currentPath === getPath(item.route)" />
        </div>
      </div>

      <!-- Management -->
      <div v-if="filteredManagementMenu.length > 0" class="px-2 mt-4">
        <h2 class="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2 px-4"
          v-show="!sidebarStore.isCollapsed">{{ isStudent() ? 'Resources' : 'Management' }}</h2>
        <div class="space-y-0.5">
          <MenuItem v-for="item in filteredManagementMenu" :key="item.label" v-bind="item"
            :active="item.route && currentPath === getPath(item.route)" />
        </div>
      </div>
    </nav>

    <!-- Support Section -->
    <div class="p-2 bg-gradient-to-b from-gray-50/50 to-gray-50/80">
      <div v-if="!sidebarStore.isCollapsed">
        <div class="bg-white rounded-xl p-4 mb-4 shadow-sm ring-1 ring-gray-100">
          <div class="flex items-center mb-2">
            <div class="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center mr-3">
              <i class="pi pi-question-circle text-primary-600"></i>
            </div>
            <span class="font-medium text-gray-900">Need Help?</span>
          </div>
          <p class="text-xs text-gray-500 mb-3">Contact our 24/7 customer support team</p>
          <button
            class="w-full px-4 py-2 text-sm bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-lg hover:from-primary-700 hover:to-primary-600 transition-all duration-200 flex items-center justify-center shadow-sm">
            <i class="pi pi-envelope mr-2"></i>
            Contact Support
          </button>
        </div>

        <!-- Quick Actions -->
        <div class="flex justify-between px-2">
          <button class="p-2 hover:bg-white rounded-lg transition-colors" v-tooltip.top="'Settings'">
            <i class="pi pi-cog text-gray-400 hover:text-primary-600 transition-colors"></i>
          </button>
          <button class="p-2 hover:bg-white rounded-lg transition-colors" v-tooltip.top="'Help Center'">
            <i class="pi pi-question-circle text-gray-400 hover:text-primary-600 transition-colors"></i>
          </button>
          <button class="p-2 hover:bg-white rounded-lg transition-colors" v-tooltip.top="'Notifications'">
            <i class="pi pi-bell text-gray-400 hover:text-primary-600 transition-colors"></i>
          </button>
        </div>
      </div>
      <div v-else class="flex justify-center">
        <button class="p-3 hover:bg-white rounded-xl transition-colors" v-tooltip.right="'Need Help?'">
          <i class="pi pi-question-circle text-xl text-primary-600"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, computed } from 'vue'
import { useSidebarStore } from '@/Stores/sidebarStore'
import { usePage } from '@inertiajs/vue3'
import MenuItem from './MenuItem.vue'
import Button from 'primevue/button'
import { isStudent } from '@/Utils/IsStudent'

// Remove the Tooltip import since it's globally registered
const sidebarStore = useSidebarStore()
const page = usePage()
const userRole = computed(() => page.props.auth.user.role);

// Compute the current URL path.
const currentPath = computed(() => {
  return new URL(page.url, window.location.origin).pathname
})

// Helper to extract pathname from a route URL.
function getPath(routeUrl) {
  return new URL(routeUrl, window.location.origin).pathname
}

// Add resize listener
onMounted(() => {
  window.addEventListener('resize', sidebarStore.handleResize)
  sidebarStore.handleResize() // Initial check
})

onUnmounted(() => {
  window.removeEventListener('resize', sidebarStore.handleResize)
})

const mainMenuItems = [
  {
    label: 'Overview',
    icon: 'pi-chart-line',
    route: route('console.dashboard'),
    allowedRoles: ['admin', 'moderator', 'student']
  },
  {
    label: 'Students',
    icon: 'pi-users',
    route: route('console.students'),
    allowedRoles: ['admin', 'moderator']
  },
  {
    label: 'Moderators',
    icon: 'pi-user-edit',
    route: route('console.moderators'),
    allowedRoles: ['admin']
  },
]

const managementItems = [
  {
    label: 'Lessons',
    icon: 'pi-book',
    route: route('console.lessons.index'),
    allowedRoles: ['admin', 'moderator', 'student']
  },
  {
    label: 'Quizzes',
    icon: 'pi-check-square',
    route: route('console.quizzes.index'),
    allowedRoles: ['admin', 'moderator', 'student']
  },
  {
    label: 'Products',
    icon: 'pi-box',
    route: route('console.products'),
    allowedRoles: ['admin', , 'student']
  }
]

// Filter items based on user role
const filteredMainMenu = computed(() => 
  mainMenuItems.filter(item => item.allowedRoles.includes(userRole.value))
);

const filteredManagementMenu = computed(() => 
  managementItems.filter(item => item.allowedRoles.includes(userRole.value))
);
</script>

<style scoped>
:deep(.p-button.p-button-text) {
  color: #64748b;
}

:deep(.p-button.p-button-text:hover) {
  background: #f8fafc;
}

:deep(.p-button.p-button-text.active) {
  color: #7c3aed;
  background: #f5f3ff;
}

.from-primary-600 {
  --tw-gradient-from: #9333EA;
  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgb(147 51 234 / 0));
}

.to-primary-500 {
  --tw-gradient-to: #A855F7;
}

.p-button.p-button-raised {
  box-shadow: 0 2px 6px -1px rgb(0 0 0 / 0.2);
}

:deep(.p-button.p-button-text) {
  background: white !important;
  transition: all 0.3s;
}

:deep(.p-button.p-button-text:hover) {
  background: rgb(243 244 246) !important;
  transform: scale(1.1);
}
</style>
