<template>
    <div class="bg-white p-6 rounded-lg shadow-sm">
        <!-- Question Header -->
        <div class="mb-6">
            <h3 class="text-lg font-medium text-gray-900 mb-2">
                Question {{ questionNumber + 1 }}
            </h3>
            <div class="text-gray-700">{{ question.text }}</div>
            
            <!-- Question Image -->
            <Image v-if="question.hasImage" 
                :src="question.image"
                :alt="'Question ' + (questionNumber + 1)"
                preview
                class="mt-4 max-w-full rounded-lg"
                imageClass="max-h-[300px] object-contain" />
        </div>

        <!-- Answers -->
        <div class="space-y-3">
            <div v-for="(answer, index) in question.answers" 
                :key="index"
                class="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer"
                :class="{ 
                    'bg-blue-50 border border-blue-200': selectedAnswer?.answerId === index,
                    'opacity-60': disabled
                }"
                @click="selectAnswer(index)">
                
                <RadioButton 
                    :value="index"
                    :modelValue="selectedAnswer?.answerId"
                    :disabled="disabled" />
                
                <div class="flex-1">
                    <div class="text-gray-700">{{ answer.text }}</div>
                    
                    <!-- Answer Reasoning -->
                    <div v-if="selectedAnswer?.reasoning" class="mt-2">
                        <InputText
                            v-model="selectedAnswer.reasoning"
                            placeholder="Add your reasoning (optional)"
                            :disabled="disabled"
                            class="w-full" />
                    </div>
                    
                    <!-- Answer Image -->
                    <Image v-if="answer.hasImage" 
                        :src="answer.image"
                        :alt="'Answer ' + (index + 1)"
                        preview
                        class="mt-2 max-w-full rounded-lg"
                        imageClass="max-h-[200px] object-contain" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import RadioButton from 'primevue/radiobutton';
import Image from 'primevue/image';
import InputText from 'primevue/inputtext';

const props = defineProps({
    question: {
        type: Object,
        required: true
    },
    questionNumber: {
        type: Number,
        required: true
    },
    initialAnswer: {
        type: Object,
        default: null
    },
    disabled: {
        type: Boolean,
        default: false
    }
});

const emit = defineEmits(['answer']);

const selectedAnswer = ref(props.initialAnswer || null);

const selectAnswer = (index) => {
    if (!props.disabled) {
        selectedAnswer.value = {
            answerId: index,
            questionId: props.question.id,
            reasoning: selectedAnswer.value?.reasoning || '',
            timestamp: new Date().toISOString()
        };
        emit('answer', selectedAnswer.value);
    }
};

watch(() => props.initialAnswer, (newValue) => {
    selectedAnswer.value = newValue;
});
</script>
