<script setup>
import AppLayout from "@/Layouts/AppLayout.vue";
import Button from "primevue/button";

import StatsCards from '@/Components/Dashboard/StatsCards.vue'
import ChartSection from '@/Components/Dashboard/ChartSection.vue'
import RecentOrders from '@/Components/Dashboard/RecentOrders.vue'
</script>

<template>
  <AppLayout>
    <StatsCards />
    <ChartSection />
    <RecentOrders />
  </AppLayout>
</template>
