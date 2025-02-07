import { defineStore } from 'pinia';
import axios from 'axios';
import axiosRetry from 'axios-retry';

const apiUrl = import.meta.env.VITE_API_URL;

export const chartStore = defineStore('chart', {
    state: () => ({
        chartData: [],
    }),
    actions: {
        setupAxiosRetry() {
            axiosRetry(axios, {
                retries: 5,
                retryDelay: axiosRetry.exponentialDelay,
                shouldRetry: (error) => {
                    return error.response && error.response.status === 503;
                },
            });
        },
        async fetchChartData() {
            this.setupAxiosRetry();
            try {
                await axios.get(`${apiUrl}/fetch-data`);
            } catch (error) {
                console.error('Error fetching chart data:', error);
            }
        },
        async getStoredData() {
            this.setupAxiosRetry();
            try {
                const response = await axios.get(`${apiUrl}/get-stored-data`);
                this.chartData = response.data;
            } catch (error) {
                console.error('Error fetching chart data:', error);
            }
        },
    },
});
