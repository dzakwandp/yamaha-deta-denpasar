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

      <!-- Product Groups by Jenis (Show only when All) -->
      <div v-if="activeCategory === 'All'" class="space-y-16">
        <div v-for="group in groupedProducts" :key="group.jenisId">
          <!-- Group Header -->
          <div class="flex items-center gap-4 mb-8">
            <h2 class="text-2xl font-bold text-gray-900">
              {{ group.jenisName }}
            </h2>
            <div class="h-1 flex-1 bg-gray-100 rounded-full"></div>
          </div>

          <!-- Product Grid -->
          <div
            v-if="group.products.length > 0"
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div v-for="product in group.products" :key="product.id">
              <ProductCard
                :id="product.id"
                :name="product.name"
                :category="product.category"
                :price="product.price"
                :image="product.image"
                :tag="product.tag" />
            </div>
          </div>
          <div v-else class="text-gray-400 italic">
            Belum ada produk untuk kategori ini.
          </div>
        </div>
      </div>

      <!-- Filtered Grid (Show when specific category selected) -->
      <div
        v-if="activeCategory !== 'All' && filteredProducts.length > 0"
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

      <!-- Ungrouped / Legacy Products (Optional, if any don't have a jenis) -->
      <div
        v-if="ungroupedProducts.length > 0"
        class="mt-16 pt-16 border-t border-gray-100">
        <div class="flex items-center gap-4 mb-8">
          <h2 class="text-2xl font-bold text-gray-900">Lainnya</h2>
          <div class="h-1 flex-1 bg-gray-100 rounded-full"></div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div v-for="product in ungroupedProducts" :key="product.id">
            <ProductCard
              :id="product.id"
              :name="product.name"
              :category="product.category"
              :price="product.price"
              :image="product.image"
              :tag="product.tag" />
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div
        v-if="groupedProducts.length === 0 && ungroupedProducts.length === 0"
        class="text-center py-20 bg-gray-50 rounded-3xl">
        <p class="text-2xl font-bold text-gray-400 mb-2">
          Tidak ada produk ditemukan
        </p>
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
const { jenisList } = useJenis();
const { categories: categoryDocs } = useCategory();

// Extract just names for the filter buttons
const categories = computed(() => {
  if (!categoryDocs.value) return [];
  return categoryDocs.value.map((c) => c.name);
});
const activeCategory = ref("All");

// Filtered products for when a specific category is selected
const filteredProducts = computed(() => {
  if (activeCategory.value === "All") {
    // If All, we actually typically use the Grouped View,
    // but just in case we need a flat list or for legacy fallback:
    return products.value;
  }
  return products.value.filter((p) => p.category === activeCategory.value);
});

// Group products by 'jenis_id'
const groupedProducts = computed(() => {
  if (!jenisList.value || !products.value) return [];

  // Map jenis to create groups
  const groups = jenisList.value.map((jenis) => {
    // Filter products for this jenis
    const groupProducts = products.value
      .filter((p) => p.jenis_id === jenis.id)
      .sort((a, b) => {
        // Sort by sort_index (ascending)
        const indexA = a.sort_index || 999;
        const indexB = b.sort_index || 999;
        return indexA - indexB;
      });

    return {
      jenisId: jenis.id,
      jenisName: jenis.name,
      products: groupProducts,
    };
  });

  // Filter out groups that have no products (optional, but requested to "group produk")
  // The user didn't explicitly say hide empty groups, but usually good practice.
  // However, the prompt says "grouped product as the same jenis", so having headers is key.
  // Let's keep them even if empty or maybe filter? Let's keep for now.
  return groups;
});

// Capture products that don't have a valid jenis_id assigned (only show in All view)
const ungroupedProducts = computed(() => {
  if (!jenisList.value || !products.value) return [];
  const validIds = new Set(jenisList.value.map((j) => j.id));
  return products.value.filter((p) => !p.jenis_id || !validIds.has(p.jenis_id));
});
</script>
