<template>
    <div class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-2">
                <label class="text-gray-600 font-medium">Quiz Name</label>
                <InputText v-model="formData.name" placeholder="Enter quiz name" class="w-full" />
            </div>
            <div class="space-y-2">
                <label class="text-gray-600 font-medium">Subject</label>
                <Dropdown v-model="formData.subject" :options="subjects" optionLabel="name" 
                    placeholder="Select subject" class="w-full" />
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="space-y-2">
                <label class="text-gray-600 font-medium">Grade</label>
                <Dropdown v-model="formData.grade" :options="grades" 
                    placeholder="Select grade" class="w-full" />
            </div>
            <div class="space-y-2">
                <label class="text-gray-600 font-medium">Time Limit (minutes)</label>
                <InputNumber v-model="formData.timeLimit" placeholder="Enter time limit" 
                    class="w-full" :min="1" />
            </div>
            <div class="space-y-2">
                <label class="text-gray-600 font-medium">Questions Per Quiz</label>
                <InputNumber v-model="formData.questionsPerQuiz" placeholder="Number of questions" 
                    class="w-full" :min="1" />
            </div>
        </div>

        <div class="space-y-2">
            <label class="text-gray-600 font-medium">Description</label>
            <Textarea v-model="formData.description" rows="4" class="w-full" 
                placeholder="Enter quiz description" />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-2">
                <label class="text-gray-600 font-medium">Deadline</label>
                <InputGroup class="w-full">
                    <InputGroupAddon>
                        <i class="pi pi-calendar"></i>
                    </InputGroupAddon>
                    <DatePicker v-model="formData.deadline" showTime showIcon="false" class="w-full" />
                </InputGroup>
            </div>
            <div class="space-y-2">
                <label class="text-gray-600 font-medium">Total Marks</label>
                <InputNumber v-model="formData.totalMarks" placeholder="Enter total marks" 
                    class="w-full" :min="1" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, defineEmits, watch } from 'vue';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Dropdown from 'primevue/dropdown';
import Textarea from 'primevue/textarea';
import DatePicker from 'primevue/datepicker';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';

const emit = defineEmits(['update']);

const subjects = [
    { name: 'Mathematics', code: 'math' },
    { name: 'Science', code: 'science' },
    { name: 'English', code: 'english' },
    // Add more subjects as needed
];

const grades = ['6', '7', '8', '9', '10', '11', '12', '13'];

const formData = ref({
    name: '',
    subject: null,
    grade: null,
    timeLimit: null,
    questionsPerQuiz: null,
    description: '',
    deadline: null,
    totalMarks: null
});

watch(formData, (newValue) => {
    emit('update', newValue);
}, { deep: true });
</script>

<style scoped>
:deep(.p-datepicker) {
    width: 100%;
}

:deep(.p-datepicker input) {
    width: 100%;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
}

:deep(.p-inputgroup .p-inputgroup-addon) {
    min-width: 3rem;
    justify-content: center;
}
</style>
