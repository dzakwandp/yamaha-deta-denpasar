<template>
  <div>
    <h1 class="text-3xl font-bold text-gray-800 mb-8">Dashboard Overview</h1>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <!-- Stats Card -->
      <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 class="text-gray-500 text-sm font-medium mb-2">Total Produk</h3>
        <p class="text-4xl font-bold text-gray-900">{{ products.length }}</p>
      </div>
    </div>

    <div
      class="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
      <h2 class="text-xl font-bold mb-4">Aksi Cepat</h2>
      <div class="flex justify-center gap-4">
        <NuxtLink
          to="/dashadmin/products/create"
          class="px-6 py-3 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 transition-colors">
          + Tambah Produk Baru
        </NuxtLink>
        <NuxtLink
          to="/dashadmin/products"
          class="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-bold hover:bg-gray-200 transition-colors">
          Kelola Produk
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "admin",
});

const { products } = useProducts();
</script>
