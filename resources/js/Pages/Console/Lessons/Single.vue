<script setup>
import AppLayout from "@/Layouts/AppLayout.vue";
import { ref } from 'vue';
import Button from 'primevue/button';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import { router, Link } from '@inertiajs/vue3';
import EditLessonModal from "@/Components/Lessons/EditLessonModal.vue";
import DeleteLessonModal from "@/Components/Lessons/DeleteLessonModal.vue";
import VideoPlayer from "@/Components/Lessons/VideoPlayer.vue";
import VideoContent from "@/Components/Lessons/VideoContent.vue";

// Remove instructor from lesson data
const lesson = ref({
    id: 1,
    title: 'Introduction to Algebra',
    description: 'Learn the basics of algebraic expressions and equations. This comprehensive lesson covers fundamental concepts that will help you build a strong foundation in mathematics.',
    youtubeId: 'M-P4QBt-FWw',
    grade: '10',
    tags: ['Mathematics', 'Algebra', 'Basics'],
    createdAt: '2024-01-15',
    views: 1234,
    duration: '45:30'
});

const activeTab = ref(0);

const editModal = ref(false);
const deleteModal = ref(false);
const grades = ref(['6', '7', '8', '9', '10', '11']);
const tags = ref(['Mathematics', 'Physics', 'Chemistry', 'Biology']);

const handleEdit = () => {
    editModal.value = true;
};

const handleDelete = () => {
    deleteModal.value = true;
};

const updateLesson = (updatedLesson) => {
    lesson.value = { ...lesson.value, ...updatedLesson };
    editModal.value = false;
};

const deleteLesson = () => {
    // Navigate back to lessons list after delete
    router.visit(route('console.lessons.index'));
};
</script>

<template>
    <AppLayout>
        <div class="w-full space-y-6">
            <!-- Add Back Button and Header Section -->
            <div class="flex flex-col md:flex-row md:items-center gap-4 mb-6">
                <Link :href="route('console.lessons.index')">
                <Button icon="pi pi-arrow-left" rounded text severity="secondary" aria-label="Back" />
                </Link>
                <h1 class="text-xl md:text-2xl font-semibold text-gray-900">
                    Watch Lesson
                </h1>
            </div>

            <!-- Video and Primary Info Section -->
            <div class="w-full">
                <div class="bg-white rounded-xl overflow-hidden shadow-sm">
                    <VideoPlayer :youtube-id="lesson.youtubeId" />
                    <VideoContent 
                        :lesson="lesson"
                        @edit="handleEdit"
                        @delete="handleDelete"
                    />
                </div>
            </div>

            <!-- Tabs Section -->
            <div class="bg-white rounded-xl shadow-sm overflow-hidden">
                <TabView v-model:activeIndex="activeTab">
                    <TabPanel header="Description">
                        <div class="p-4">
                            <p class="text-gray-600 whitespace-pre-line">
                                {{ lesson.description }}
                            </p>
                        </div>
                    </TabPanel>
                    <TabPanel header="Resources">
                        <div class="p-4">
                            <p class="text-gray-600">
                                No resources available for this lesson.
                            </p>
                        </div>
                    </TabPanel>
                </TabView>
            </div>
        </div>

        <!-- Add modals at the end of the template -->
        <EditLessonModal v-model:visible="editModal" :lesson="lesson" :grades="grades" :tags="tags"
            @save="updateLesson" />
        <DeleteLessonModal v-model:visible="deleteModal" :lesson="lesson" @confirm="deleteLesson" />
    </AppLayout>
</template>

<style scoped>
:deep(.p-tabview-panels) {
    padding: 0;
}

:deep(.p-tabview-nav) {
    border-bottom: 1px solid #e5e7eb;
}

:deep(.p-tabview-nav-link) {
    color: #4b5563;
}

:deep(.p-tabview-selected .p-tabview-nav-link) {
    color: #2563eb;
    border-color: #3b82f6;
}
</style>