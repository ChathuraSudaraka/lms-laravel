<template>
  <div class="grid grid-cols-12 gap-4 md:gap-6 mt-6">
    <!-- Orders Table -->
    <div class="col-span-12 xl:col-span-8">
      <Card class="!border-none">
        <template #title>
          <div class="flex justify-between items-center">
            <h3 class="text-lg font-semibold">Recent Orders</h3>
            <Button label="Show All Orders" class="p-button-text p-button-sm" />
          </div>
        </template>
        <template #content>
          <DataTable :value="orders" :paginator="true" :rows="5" responsiveLayout="scroll">
            <Column field="id" header="Id"></Column>
            <Column field="customerName" header="Customer Name"></Column>
            <Column field="product" header="Product"></Column>
            <Column field="amount" header="Amount"></Column>
            <Column field="status" header="Status">
              <template #body="slotProps">
                <Tag :value="slotProps.data.status" :severity="getStatusSeverity(slotProps.data.status)" />
              </template>
            </Column>
          </DataTable>
        </template>
      </Card>
    </div>

    <!-- New Component: Recent Activities -->
    <div class="col-span-12 xl:col-span-4">
      <Card class="!border-none">
        <template #title>
          <div class="flex justify-between items-center">
            <h3 class="text-lg font-semibold">Recent Activities</h3>
          </div>
        </template>
        <template #content>
          <Timeline :value="activities" class="customized-timeline">
            <template #content="slotProps">
              <div class="flex flex-col">
                <span class="text-sm font-medium">{{ slotProps.item.title }}</span>
                <small class="text-gray-500">{{ slotProps.item.time }}</small>
              </div>
            </template>
          </Timeline>
        </template>
      </Card>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Card from 'primevue/card'
import Button from 'primevue/button'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Tag from 'primevue/tag'
import Timeline from 'primevue/timeline'

const orders = ref([
  // ... same orders data as before ...
])

const getStatusSeverity = (status) => {
  switch (status) {
    case 'Completed':
      return 'success'
    case 'Pending':
      return 'warning'
    default:
      return 'info'
  }
}

const activities = ref([
  {
    title: 'New order received #1234',
    time: '15 minutes ago',
    icon: 'pi pi-shopping-cart',
    color: 'blue'
  },
  {
    title: 'Payment processed for order #1233',
    time: '2 hours ago',
    icon: 'pi pi-check-circle',
    color: 'green'
  },
  // Add more activities...
])
</script>

<style scoped>
.customized-timeline .p-timeline-event-content,
.customized-timeline .p-timeline-event-opposite {
  font-size: 0.875rem; /* text-sm */
}

.customized-timeline .p-timeline-event {
  min-height: 0;
}

.customized-timeline .p-timeline-event-connector {
  height: 100%;
}
</style>
