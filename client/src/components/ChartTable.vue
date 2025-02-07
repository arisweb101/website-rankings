<template>
    <div class="w-[100%] h-[65vh]">
        <Line :data="chartData" :options="chartOptions" />
    </div>
</template>

<script setup>
import { ref, watch, defineProps } from 'vue';
import { Line } from 'vue-chartjs';
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
} from 'chart.js';

const props = defineProps({
    chartData: Array, // You can use `Array` or leave it without a type
});

ChartJS.register(
    Title,
    Tooltip,
    Legend,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement
);

const chartData = ref({
    labels: [],
    datasets: [
        {
            label: '',
            backgroundColor: '',
            borderColor: '',
            fill: false,
            data: [],
        },
    ],
});

let dataFromStore = ref([]);

const chartOptions = ref({
    responsive: true,
    maintainAspectRatio: false,
});

watch(
    () => props.chartData,
    (newData) => {
        if (Array.isArray(newData)) {
            try {
                dataFromStore.value = props.chartData;

                const uniqueDates = [
                    ...new Set(dataFromStore.value.map((item) => item.date)),
                ].sort();

                const groupedData = dataFromStore.value.reduce((acc, item) => {
                    if (!acc[item.domain]) {
                        acc[item.domain] = {};
                    }
                    acc[item.domain][item.date] = item.score;
                    return acc;
                }, {});

                const chartLabels = uniqueDates;

                const getRandomColor = () => {
                    return `hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)`;
                };

                const formattedChartLabels = chartLabels.map((date) =>
                    new Intl.DateTimeFormat('en-US', {
                        month: 'short',
                        day: '2-digit',
                        year: 'numeric',
                        hour: 'numeric',
                        minute: '2-digit',
                        hour12: true,
                    }).format(new Date(date))
                );

                const datasets = Object.keys(groupedData).map((domain) => ({
                    label: domain,
                    backgroundColor: getRandomColor(),
                    borderColor: getRandomColor(),
                    fill: false,
                    data: chartLabels.map(
                        (date) => groupedData[domain][date] || null
                    ),
                }));

                chartData.value = {
                    labels: formattedChartLabels,
                    datasets: datasets,
                };
            } catch (error) {
                console.error('Error processing chart data:', error);
            }
        }
    },
    { immediate: true }
);
</script>

<style scoped></style>
