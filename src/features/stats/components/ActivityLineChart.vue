<script setup>
import {
  CategoryScale,
  Chart,
  LinearScale,
  LineElement,
  PointElement,
  Legend,
  Colors,
  Filler,
  Tooltip,
} from 'chart.js';
import { computed } from 'vue';
import { getDaysRange } from '../../../utils/date';
import { getChartColor } from '../../../core/chart/chart.util';
import { theme } from '../../../core/theme';
import { Line } from 'vue-chartjs';

const props = defineProps({
  start: Date,
  end: Date,
  data: Array,
});

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Legend,
  Colors,
  Filler,
  Tooltip,
);

const chartData = computed(() => {
  return {
    labels: getDaysRange(props.start, props.end, 'DD MMM'),
    datasets: [
      {
        label: 'Habit Dilakukan',
        fill: true,
        backgroundColor: getChartColor('blue', 0.3),
        borderColor: getChartColor('blue'),
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 4,
        pointHitRadius: 12,
        data: props.data,
      },
    ],
  };
});
const options = computed(() => {
  return {
    scales: {
      x: {
        grid: {
          color: theme.value === 'light' ? '#d1d5db' : '#4b5563',
        },
        ticks: {
          color: theme.value === 'light' ? '#d1d5db' : '#4b5563',
        },
      },
      y: {
        grid: {
          color: theme.value === 'light' ? '#d1d5db' : '#4b5563',
        },
        ticks: {
          color: theme.value === 'light' ? '#d1d5db' : '#4b5563',
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: theme.value === 'light' ? '#4b5563' : '#d1d5db',
        },
      },
    },
  };
});
</script>

<template>
  <Line :data="chartData" :options="options" />
</template>
