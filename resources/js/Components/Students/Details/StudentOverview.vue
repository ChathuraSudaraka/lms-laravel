<script setup>
import Avatar from 'primevue/avatar';
import Tag from 'primevue/tag';

const props = defineProps({
    student: {
        type: Object,
        required: true
    }
});

const getFeeStatusSeverity = (status) => {
    const severities = {
        paid: 'success',
        pending: 'warning',
        unpaid: 'danger'
    };
    return severities[status] || 'info';
};
</script>

<template>
    <div class="space-y-6">
        <!-- Basic Info Card -->
        <div class="flex flex-col md:flex-row gap-6">
            <div class="flex items-start gap-4">
                <Avatar 
                    :image="student.photoUrl" 
                    size="xlarge" 
                    shape="circle"
                    class="w-20 h-20"
                />
                <div>
                    <h2 class="text-xl font-semibold text-gray-900">{{ student.name }}</h2>
                    <p class="text-sm text-gray-500">Student ID: {{ student.id }}</p>
                    <div class="flex items-center gap-2 mt-2">
                        <Tag :value="'Grade ' + student.grade" severity="info" />
                        <Tag :value="student.status" :severity="student.status === 'Active' ? 'success' : 'warning'" />
                        <Tag :value="student.feeStatus" :severity="getFeeStatusSeverity(student.feeStatus)" />
                    </div>
                </div>
            </div>
        </div>

        <!-- Statistics Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="bg-gray-50 rounded-lg p-4">
                <h3 class="text-sm font-medium text-gray-500 mb-1">Attendance Rate</h3>
                <p class="text-2xl font-semibold text-gray-900">95%</p>
            </div>
            <div class="bg-gray-50 rounded-lg p-4">
                <h3 class="text-sm font-medium text-gray-500 mb-1">Average Grade</h3>
                <p class="text-2xl font-semibold text-gray-900">A-</p>
            </div>
            <div class="bg-gray-50 rounded-lg p-4">
                <h3 class="text-sm font-medium text-gray-500 mb-1">Enrolled Courses</h3>
                <p class="text-2xl font-semibold text-gray-900">4</p>
            </div>
        </div>

        <!-- Additional Information -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <h3 class="text-lg font-medium text-gray-900 mb-4">Academic Information</h3>
                <div class="space-y-3">
                    <div class="flex justify-between py-2 border-b">
                        <span class="text-gray-600">Grade Level</span>
                        <span class="font-medium text-gray-900">{{ student.grade }}</span>
                    </div>
                    <div class="flex justify-between py-2 border-b">
                        <span class="text-gray-600">Enrollment Date</span>
                        <span class="font-medium text-gray-900">Sept 2023</span>
                    </div>
                    <div class="flex justify-between py-2 border-b">
                        <span class="text-gray-600">Academic Year</span>
                        <span class="font-medium text-gray-900">2023/24</span>
                    </div>
                </div>
            </div>

            <div>
                <h3 class="text-lg font-medium text-gray-900 mb-4">Administrative Details</h3>
                <div class="space-y-3">
                    <div class="flex justify-between py-2 border-b">
                        <span class="text-gray-600">Status</span>
                        <span class="font-medium text-gray-900">{{ student.status }}</span>
                    </div>
                    <div class="flex justify-between py-2 border-b">
                        <span class="text-gray-600">Fee Status</span>
                        <span class="font-medium text-gray-900">{{ student.feeStatus }}</span>
                    </div>
                    <div class="flex justify-between py-2 border-b">
                        <span class="text-gray-600">Last Updated</span>
                        <span class="font-medium text-gray-900">{{ new Date().toLocaleDateString() }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>