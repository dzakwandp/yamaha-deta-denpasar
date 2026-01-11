<template>
  <div class="container mx-auto px-4 py-20 text-center">
    <h1 class="text-3xl font-bold mb-8">Admin Tools</h1>
    <button
      @click="runSeed"
      class="px-6 py-3 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 transition-colors"
      :disabled="loading">
      {{ loading ? "Seeding..." : "Seed Database" }}
    </button>
  </div>
</template>

<script setup lang="ts">
const loading = ref(false);
const db = useFirestore();

const runSeed = async () => {
  loading.value = true;
  try {
    await seedDatabase(db);
  } finally {
    loading.value = false;
  }
};
</script>
