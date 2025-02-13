<template>
    <div class="bg-white p-4 rounded-lg shadow-sm">
        <div class="flex items-center justify-between mb-2">
            <span class="text-gray-600">Time Remaining</span>
            <span :class="{'text-red-500': timeLeft < 300}" class="font-bold text-xl">
                {{ formatTime(timeLeft) }}
            </span>
        </div>
        <ProgressBar 
            :value="Math.floor(progress)" 
            :class="{'bg-red-100': timeLeft < 300}"
            :pt="{
                root: { class: 'h-2' },
                value: { class: getProgressBarColor }
            }" />
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import ProgressBar from 'primevue/progressbar';

const props = defineProps({
    duration: {
        type: Number,
        required: true
    }
});

const emit = defineEmits(['timeout', 'update']);

const timeLeft = ref(props.duration);
const timer = ref(null);

const progress = computed(() => {
    return ((props.duration - timeLeft.value) / props.duration) * 100;
});

const getProgressBarColor = computed(() => {
    if (timeLeft.value < 300) return 'bg-red-500'; // Less than 5 minutes
    if (timeLeft.value < 600) return 'bg-yellow-500'; // Less than 10 minutes
    return 'bg-green-500';
});

const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    
    if (hours > 0) {
        return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

onMounted(() => {
    timer.value = setInterval(() => {
        if (timeLeft.value > 0) {
            timeLeft.value--;
            emit('update', timeLeft.value);
        } else {
            clearInterval(timer.value);
            emit('timeout');
        }
    }, 1000);
});

onUnmounted(() => {
    if (timer.value) clearInterval(timer.value);
});
</script>
