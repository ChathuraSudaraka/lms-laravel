<template>
  <Link
    v-if="route"
    :href="route"
    class="block"
    :class="{ 'focus:outline-none': true }"
  >
    <button
      @click="handleClick"
      :class="[
        'w-full flex items-center rounded-lg transition-all duration-200 relative',
        'text-left focus:outline-none focus:ring-2 focus:ring-primary-500/20',
        sidebarStore.isCollapsed ? 'justify-center p-1.5' : 'px-4 py-2.5',
        active ? 
          'bg-gradient-to-r from-primary-500/10 to-primary-500/5 text-primary-700' : 
          'text-gray-600 hover:bg-white'
      ]"
      v-tooltip.right="sidebarStore.isCollapsed && !sidebarStore.isMobile ? label : ''"
    >
      <div :class="[
        'rounded-lg flex items-center justify-center transition-all',
        sidebarStore.isCollapsed ? 'w-10 h-10' : 'w-8 h-8 mr-3',
        active ? 'bg-primary-100' : 'bg-gray-50 hover:bg-gray-100'
      ]">
        <i :class="[
          'pi', icon, 'transition-colors',
          sidebarStore.isCollapsed ? 'text-xl' : 'text-lg',
          active ? 'text-primary-600' : 'text-gray-400'
        ]"></i>
      </div>
      <template v-if="!sidebarStore.isCollapsed">
        <span :class="[
          'font-medium transition-colors',
          active ? 'text-primary-900' : 'text-gray-600'
        ]">{{ label }}</span>
        <Badge 
          v-if="badge" 
          :value="badge" 
          :severity="badgeType" 
          class="ml-auto transform scale-90"
        />
      </template>
      <Badge 
        v-else-if="badge" 
        :value="badge" 
        :severity="badgeType" 
        class="absolute -top-0.5 -right-0.5 transform scale-85"
      />
    </button>
  </Link>

  <button
    v-else
    @click="handleClick"
    :class="[
      'w-full flex items-center rounded-lg transition-all duration-200 relative',
      'text-left focus:outline-none focus:ring-2 focus:ring-primary-500/20',
      sidebarStore.isCollapsed ? 'justify-center p-1.5' : 'px-4 py-2.5',
      active ? 
        'bg-gradient-to-r from-primary-500/10 to-primary-500/5 text-primary-700' : 
        'text-gray-600 hover:bg-white'
    ]"
    v-tooltip.right="sidebarStore.isCollapsed && !sidebarStore.isMobile ? label : ''"
  >
    <div :class="[
      'rounded-lg flex items-center justify-center transition-all',
      sidebarStore.isCollapsed ? 'w-10 h-10' : 'w-8 h-8 mr-3',
      active ? 'bg-primary-100' : 'bg-gray-50 hover:bg-gray-100'
    ]">
      <i :class="[
        'pi', icon, 'transition-colors',
        sidebarStore.isCollapsed ? 'text-xl' : 'text-lg',
        active ? 'text-primary-600' : 'text-gray-400'
      ]"></i>
    </div>
    <template v-if="!sidebarStore.isCollapsed">
      <span :class="[
        'font-medium transition-colors',
        active ? 'text-primary-900' : 'text-gray-600'
      ]">{{ label }}</span>
      <Badge 
        v-if="badge" 
        :value="badge" 
        :severity="badgeType" 
        class="ml-auto transform scale-90"
      />
    </template>
    <Badge 
      v-else-if="badge" 
      :value="badge" 
      :severity="badgeType" 
      class="absolute -top-0.5 -right-0.5 transform scale-85"
    />
  </button>
</template>

<script setup>
import { useSidebarStore } from '@/Stores/sidebarStore'
import Badge from 'primevue/badge'
import { Link } from '@inertiajs/vue3'

// Remove any tooltip directive registration if present

const props = defineProps({
  label: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  active: {
    type: Boolean,
    default: false
  },
  badge: {
    type: [String, Number],
    default: null
  },
  badgeType: {
    type: String,
    default: 'primary'
  },
  route: {
    type: String,
    default: null
  },
  params: {
    type: Object,
    default: () => ({})
  }
})

const sidebarStore = useSidebarStore()

function handleClick() {
  if (props.route) {
    sidebarStore.closeSidebar()
  }
}
</script>

<style scoped>
.p-badge {
  border-radius: 50%;
  min-width: 1.5rem;
  height: 1.5rem;
  padding: 0;
}
</style>
