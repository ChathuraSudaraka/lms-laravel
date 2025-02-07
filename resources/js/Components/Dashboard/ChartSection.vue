<template>
  <div class="grid grid-cols-12 gap-4 md:gap-6">
    <!-- Main Chart -->
    <div class="col-span-12 lg:col-span-8">
      <Card class="!border-none">
        <template #title>
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-semibold">Order Status</h3>
            <div class="flex space-x-2">
              <Button v-for="period in periods" 
                      :key="period" 
                      :label="period" 
                      class="p-button-text p-button-sm" />
            </div>
          </div>
        </template>
        <template #content>
          <apexchart
            type="area"
            height="350"
            :options="chartOptions"
            :series="chartSeries"
          />
        </template>
      </Card>
    </div>

    <!-- Side Stats -->
    <div class="col-span-12 lg:col-span-4 space-y-4">
      <!-- Location Stats -->
      <Card class="!border-none">
        <template #title>
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-semibold">Sales by Locations</h3>
          </div>
        </template>
        <template #content>
          <div class="space-y-4">
            <div v-for="location in locations" :key="location.name" class="flex items-center justify-between">
              <span>{{ location.name }}</span>
              <div class="flex items-center space-x-2">
                <ProgressBar :value="location.value" class="w-32" />
                <span>{{ location.value }}%</span>
              </div>
            </div>
          </div>
        </template>
      </Card>

      <!-- New Component: Top Products -->
      <Card class="!border-none">
        <template #title>
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-semibold">Top Products</h3>
          </div>
        </template>
        <template #content>
          <div class="space-y-4">
            <div v-for="product in topProducts" :key="product.name" 
                 class="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <img :src="product.image" class="w-10 h-10 rounded-lg object-cover" />
              <div class="ml-3 flex-1">
                <h4 class="text-sm font-medium">{{ product.name }}</h4>
                <p class="text-xs text-gray-500">{{ product.sold }} sold</p>
              </div>
              <span class="text-sm font-semibold">{{ product.revenue }}</span>
            </div>
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Card from 'primevue/card'
import Button from 'primevue/button'
import ProgressBar from 'primevue/progressbar'
import VueApexCharts from 'vue3-apexcharts'

const apexchart = VueApexCharts
const periods = ['Daily', 'Weekly', 'Monthly']

// Chart configurations moved from AppLayout
const chartSeries = ref([
  {
    name: 'Orders',
    data: [400, 300, 500, 350, 450, 300, 400]
  },
  {
    name: 'Sales',
    data: [300, 400, 300, 450, 300, 400, 300]
  }
])

const chartOptions = ref({
  // ... same chart options as before ...
})

const locations = ref([
  { name: 'Canada', value: 75 },
  { name: 'Russia', value: 75 }
])

const topProducts = ref([
  {
    name: 'Product A',
    sold: '452 units',
    revenue: '$45,200',
    image: '/path/to/image'
  },
  {
    name: 'Product B',
    sold: '385 units',
    revenue: '$38,500',
    image: '/path/to/image'
  },
  // Add more products...
])
</script>
