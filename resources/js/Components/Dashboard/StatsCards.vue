<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6">
    <Card v-for="stat in stats" :key="stat.title" class="shadow-sm !border-none">
      <template #title>
        <div class="flex justify-between items-center">
          <div>
            <p class="text-sm text-gray-500">{{ stat.title }}</p>
            <h2 class="text-2xl font-bold mt-1">{{ stat.value }}</h2>
            <div class="flex items-center mt-2 space-x-2">
              <Badge :value="stat.change" :severity="stat.trend === 'up' ? 'success' : 'danger'" />
              <span class="text-xs text-gray-500">vs last month</span>
            </div>
          </div>
          <div :class="['w-12 h-12 rounded-lg flex items-center justify-center', stat.bgColor]">
            <i :class="['pi text-xl', stat.icon, stat.iconColor]"></i>
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup>
import Card from 'primevue/card'
import Badge from 'primevue/badge'
import Button from 'primevue/button'

const stats = [
  { 
    title: 'TOTAL EARNINGS', 
    value: '$559,250', 
    change: '+1.25%',
    trend: 'up',
    icon: 'pi-info-circle',
    bgColor: 'bg-primary-50',
    iconColor: 'text-primary-600'
  },
  { 
    title: 'TOTAL ORDERS', 
    value: '59,250', 
    change: '+2.25%',
    trend: 'up',
    icon: 'pi-shopping-cart',
    bgColor: 'bg-blue-50',
    iconColor: 'text-blue-600'
  },
  { 
    title: 'TOTAL CUSTOMERS', 
    value: '34,250', 
    change: '-0.25%',
    trend: 'down',
    icon: 'pi-users',
    bgColor: 'bg-green-50',
    iconColor: 'text-green-600'
  },
  { 
    title: 'MY BALANCE', 
    value: '$225,450', 
    change: '+4.25%',
    trend: 'up',
    icon: 'pi-wallet',
    bgColor: 'bg-orange-50',
    iconColor: 'text-orange-600'
  }
]
</script>
