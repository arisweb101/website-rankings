<template>
    <div id="app" class="w-full flex flex-col items-center justify-center p-6">
        <h1 class="text-2xl">Website Google Rankings</h1>
        <div
            class="relative w-full m-8 flex flex-col items-center justify-center p-6"
        >
            <div
                v-if="isLoading"
                class="absolute bg-gray-50 flex flex-col items-center justify-center top-0 left-0 right-0 bottom-0 bg-opacity-25 z-10"
            >
                <img
                    src="@/assets/loader.gif"
                    alt="loading"
                    class="container mx-auto p-4 w-[150px]"
                />
            </div>

            <ChartTable :chartData="chartData" />
        </div>

        <button
            @click="getData"
            class="cursor-pointer mt-4 bg-blue-500 text-white p-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
            <span v-if="isLoading">...Loading</span>
            <span v-else>Reload Website Rankings</span>
        </button>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import ChartTable from './components/ChartTable.vue';
import { chartStore } from './stores/chartStore';

const store = chartStore();
const isLoading = ref(false);
const chartData = ref();

const getData = async () => {
    isLoading.value = true;
    try {
        await store.fetchChartData();
        await store.getStoredData();
        chartData.value = store.chartData;
    } catch (error) {
    } finally {
        setTimeout(() => {
            isLoading.value = false;
        }, 6000);
    }
};

onMounted(async () => {
    getData();
});
</script>

<style scoped></style>
