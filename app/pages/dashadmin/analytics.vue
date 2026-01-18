<template>
  <div class="p-8">
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-900">Google Search Analytics</h1>
      <p class="text-gray-500">
        Performance data from Google Search Console (Last 30 Days)
      </p>
    </div>

    <!-- Stats Cards -->
    <div
      class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
      v-if="!loading && stats">
      <div class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <p class="text-xs font-bold text-gray-400 uppercase">Total Clicks</p>
        <p class="text-3xl font-bold text-gray-900 mt-2">{{ stats.clicks }}</p>
      </div>
      <div class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <p class="text-xs font-bold text-gray-400 uppercase">
          Total Impressions
        </p>
        <p class="text-3xl font-bold text-gray-900 mt-2">
          {{ stats.impressions }}
        </p>
      </div>
      <div class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <p class="text-xs font-bold text-gray-400 uppercase">Avg. CTR</p>
        <p class="text-3xl font-bold text-gray-900 mt-2">
          {{ (stats.ctr * 100).toFixed(2) }}%
        </p>
      </div>
      <div class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <p class="text-xs font-bold text-gray-400 uppercase">Avg. Position</p>
        <p class="text-3xl font-bold text-gray-900 mt-2">
          {{ stats.position.toFixed(1) }}
        </p>
      </div>
    </div>

    <!-- Chart -->
    <div
      class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm min-h-[400px]">
      <div
        v-if="loading"
        class="flex flex-col items-center justify-center h-80">
        <div
          class="animate-spin w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full mb-4"></div>
        <p class="text-gray-500">Loading analytics data...</p>
      </div>

      <div
        v-else-if="error"
        class="flex flex-col items-center justify-center h-80 text-center">
        <p class="text-red-500 font-bold mb-2">Failed to load data</p>
        <p class="text-gray-500 text-sm max-w-md">{{ error }}</p>
      </div>

      <div v-else class="h-96">
        <Line :data="chartData" :options="chartOptions" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "vue-chartjs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const loading = ref(true);
const error = ref("");
const rows = ref<any[]>([]);

const fetchData = async () => {
  try {
    loading.value = true;
    const { data, error: fetchError } = await useFetch("/api/analytics");

    if (fetchError.value) {
      error.value =
        "Server Error: " +
        fetchError.value.statusMessage +
        " (" +
        fetchError.value.statusCode +
        ")";
      if (fetchError.value.data?.message) {
        error.value += " - " + fetchError.value.data.message;
      }
      return;
    }

    if (data.value && (data.value as any).success) {
      rows.value = (data.value as any).data;
    } else {
      error.value =
        (data.value as any)?.error || "Unknown error (Data is null)";
    }
  } catch (e: any) {
    error.value = e.message;
  } finally {
    loading.value = false;
  }
};

const stats = computed(() => {
  if (!rows.value.length) return null;

  const totalClicks = rows.value.reduce((acc, row) => acc + row.clicks, 0);
  const totalImpressions = rows.value.reduce(
    (acc, row) => acc + row.impressions,
    0
  );
  const avgCtr =
    rows.value.reduce((acc, row) => acc + row.ctr, 0) / rows.value.length;
  const avgPosition =
    rows.value.reduce((acc, row) => acc + row.position, 0) / rows.value.length;

  return {
    clicks: totalClicks,
    impressions: totalImpressions,
    ctr: avgCtr,
    position: avgPosition,
  };
});

const chartData = computed(() => {
  return {
    labels: rows.value.map((row) => new Date(row.keys[0]).toLocaleDateString()),
    datasets: [
      {
        label: "Clicks",
        borderColor: "#DC2626",
        backgroundColor: "#FCA5A5",
        data: rows.value.map((row) => row.clicks),
        yAxisID: "y",
      },
      {
        label: "Impressions",
        borderColor: "#2563EB",
        backgroundColor: "#93C5FD",
        data: rows.value.map((row) => row.impressions),
        yAxisID: "y1",
      },
    ],
  };
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: "index" as const,
    intersect: false,
  },
  plugins: {
    legend: {
      position: "top" as const,
    },
  },
  scales: {
    y: {
      type: "linear" as const,
      display: true,
      position: "left" as const,
      title: {
        display: true,
        text: "Clicks",
      },
    },
    y1: {
      type: "linear" as const,
      display: true,
      position: "right" as const,
      grid: {
        drawOnChartArea: false,
      },
      title: {
        display: true,
        text: "Impressions",
      },
    },
  },
};

onMounted(() => {
  fetchData();
});

definePageMeta({
  layout: "admin",
});
</script>
