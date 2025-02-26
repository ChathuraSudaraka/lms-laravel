<script setup>
import Button from 'primevue/button';
import Card from 'primevue/card';

const props = defineProps({
    student: {
        type: Object,
        required: true
    }
});
</script>

<template>
    <div class="space-y-6">
        <!-- Student Contact -->
        <Card>
            <template #title>
                <div class="flex items-center justify-between">
                    <span>Student Contact Details</span>
                    <Button 
                        icon="pi pi-pencil" 
                        text 
                        rounded 
                        severity="secondary"
                        v-tooltip.left="'Edit Details'"
                    />
                </div>
            </template>
            <template #content>
                <div class="space-y-4">
                    <div class="flex items-center gap-3">
                        <i class="pi pi-envelope text-gray-400"></i>
                        <div>
                            <p class="text-sm text-gray-500">Email Address</p>
                            <p class="text-gray-900">{{ student.email }}</p>
                        </div>
                    </div>
                    <div class="flex items-center gap-3">
                        <i class="pi pi-phone text-gray-400"></i>
                        <div>
                            <p class="text-sm text-gray-500">Phone Number</p>
                            <p class="text-gray-900">{{ student.phone || '+94 71 234 5678' }}</p>
                        </div>
                    </div>
                    <div class="flex items-center gap-3">
                        <i class="pi pi-map-marker text-gray-400"></i>
                        <div>
                            <p class="text-sm text-gray-500">Address</p>
                            <p class="text-gray-900">{{ student.address || '123 Main St, Colombo 07' }}</p>
                        </div>
                    </div>
                </div>
            </template>
        </Card>

        <!-- Guardian Contact -->
        <Card>
            <template #title>
                <div class="flex items-center justify-between">
                    <span>Guardian Contact Details</span>
                    <Button 
                        icon="pi pi-pencil" 
                        text 
                        rounded 
                        severity="secondary"
                        v-tooltip.left="'Edit Details'"
                    />
                </div>
            </template>
            <template #content>
                <div class="space-y-4">
                    <div class="flex items-center gap-3">
                        <i class="pi pi-user text-gray-400"></i>
                        <div>
                            <p class="text-sm text-gray-500">Guardian Name</p>
                            <p class="text-gray-900">{{ student.guardianName || 'Parent Name' }}</p>
                        </div>
                    </div>
                    <div class="flex items-center gap-3">
                        <i class="pi pi-envelope text-gray-400"></i>
                        <div>
                            <p class="text-sm text-gray-500">Email Address</p>
                            <p class="text-gray-900">{{ student.guardianEmail || 'parent@example.com' }}</p>
                        </div>
                    </div>
                    <div class="flex items-center gap-3">
                        <i class="pi pi-phone text-gray-400"></i>
                        <div>
                            <p class="text-sm text-gray-500">Phone Number</p>
                            <p class="text-gray-900">{{ student.guardianPhone || '+94 71 987 6543' }}</p>
                        </div>
                    </div>
                    <div class="flex items-center gap-3">
                        <i class="pi pi-briefcase text-gray-400"></i>
                        <div>
                            <p class="text-sm text-gray-500">Occupation</p>
                            <p class="text-gray-900">{{ student.guardianOccupation || 'Business' }}</p>
                        </div>
                    </div>
                </div>
            </template>
        </Card>

        <!-- Emergency Contact -->
        <Card>
            <template #title>
                <div class="flex items-center justify-between">
                    <span>Emergency Contact</span>
                    <Button 
                        icon="pi pi-pencil" 
                        text 
                        rounded 
                        severity="secondary"
                        v-tooltip.left="'Edit Details'"
                    />
                </div>
            </template>
            <template #content>
                <div class="space-y-4">
                    <div class="flex items-center gap-3">
                        <i class="pi pi-user text-gray-400"></i>
                        <div>
                            <p class="text-sm text-gray-500">Contact Name</p>
                            <p class="text-gray-900">{{ student.emergencyName || 'Emergency Contact' }}</p>
                        </div>
                    </div>
                    <div class="flex items-center gap-3">
                        <i class="pi pi-phone text-gray-400"></i>
                        <div>
                            <p class="text-sm text-gray-500">Phone Number</p>
                            <p class="text-gray-900">{{ student.emergencyPhone || '+94 71 555 5555' }}</p>
                        </div>
                    </div>
                    <div class="flex items-center gap-3">
                        <i class="pi pi-heart text-gray-400"></i>
                        <div>
                            <p class="text-sm text-gray-500">Relationship</p>
                            <p class="text-gray-900">{{ student.emergencyRelation || 'Uncle' }}</p>
                        </div>
                    </div>
                </div>
            </template>
        </Card>
    </div>
</template>

<style scoped>
:deep(.p-card) {
    box-shadow: none;
    border: 1px solid #e5e7eb;
}

:deep(.p-card-title) {
    font-size: 1.125rem;
    font-weight: 600;
    color: #111827;
}

:deep(.p-card-content) {
    padding-top: 1rem;
}
</style>