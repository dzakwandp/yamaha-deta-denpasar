<template>
  <div class="py-12 bg-white">
    <div class="container mx-auto px-4">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-extrabold text-gray-900 mb-4">
          Produk Yamaha
        </h1>
        <p class="text-gray-500 max-w-2xl mx-auto">
          Temukan motor impianmu dari berbagai kategori terbaik Yamaha.
          Sesuaikan dengan gaya berkendara dan kebutuhanmu.
        </p>
      </div>

      <!-- Filters -->
      <div class="flex flex-wrap justify-center gap-2 mb-12">
        <button
          @click="activeCategory = 'All'"
          class="px-6 py-2 rounded-full text-sm font-bold transition-all border-2"
          :class="
            activeCategory === 'All'
              ? 'bg-red-600 border-red-600 text-white shadow-lg shadow-red-200'
              : 'bg-white border-gray-200 text-gray-600 hover:border-red-600 hover:text-red-600'
          ">
          Semua
        </button>
        <button
          v-for="cat in categories"
          :key="cat"
          @click="activeCategory = cat"
          class="px-6 py-2 rounded-full text-sm font-bold transition-all border-2"
          :class="
            activeCategory === cat
              ? 'bg-red-600 border-red-600 text-white shadow-lg shadow-red-200'
              : 'bg-white border-gray-200 text-gray-600 hover:border-red-600 hover:text-red-600'
          ">
          {{ cat }}
        </button>
      </div>

      <!-- Product Grid -->
      <div
        v-if="filteredProducts.length > 0"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div v-for="product in filteredProducts" :key="product.id">
          <ProductCard
            :id="product.id"
            :name="product.name"
            :category="product.category"
            :price="product.price"
            :image="product.image"
            :tag="product.tag" />
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-20 bg-gray-50 rounded-3xl">
        <p class="text-2xl font-bold text-gray-400 mb-2">
          Tidak ada produk ditemukan
        </p>
        <p class="text-gray-500">Coba pilih kategori lain</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: "Produk Yamaha | Yamaha Deta Denpasar",
  meta: [
    {
      name: "description",
      content:
        "Lihat daftar lengkap motor Yamaha terbaru. NMAX, XMAX, Aerox, Fazzio, Grand Filano dan lainnya.",
    },
  ],
});

const { products } = useProducts();
const { categories: categoryDocs } = useCategory();

// Extract just names for the filter buttons, or use objects if needed.
// Based on current implementation, activeCategory stores the name string.
const categories = computed(() => {
  if (!categoryDocs.value) return [];
  return categoryDocs.value.map((c) => c.name);
});
const activeCategory = ref("All");

const filteredProducts = computed(() => {
  if (activeCategory.value === "All") {
    return products.value;
  }
  return products.value.filter((p) => p.category === activeCategory.value);
});
</script>
