<template>
  <div v-if="product" class="bg-white min-h-[80vh]">
    <!-- Breadcrumb -->
    <div class="bg-gray-50 border-b border-gray-100">
      <div class="container mx-auto px-4 py-4 text-sm text-gray-500">
        <NuxtLink to="/" class="hover:text-red-600">Home</NuxtLink>
        <span class="mx-2">/</span>
        <NuxtLink to="/products" class="hover:text-red-600">Produk</NuxtLink>
        <span class="mx-2">/</span>
        <span class="text-gray-900 font-medium">{{ product.name }}</span>
      </div>
    </div>

    <div class="container mx-auto px-4 py-12">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
        <!-- Image Section -->
        <div>
          <div
            class="aspect-4/3 bg-gray-50 rounded-2xl overflow-hidden flex items-center justify-center p-8 border border-gray-100">
            <img
              :src="product.image"
              :alt="product.name"
              class="max-w-full max-h-full object-contain hover:scale-105 transition-transform duration-500" />
          </div>
        </div>

        <!-- Info Section -->
        <div>
          <div class="mb-2">
            <span
              class="inline-block bg-gray-900 text-white text-xs font-bold px-3 py-1 rounded-full"
              >{{ product.category }}</span
            >
            <span
              v-if="product.tag"
              class="ml-2 inline-block bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full"
              >{{ product.tag }}</span
            >
          </div>

          <h1 class="text-4xl font-extrabold text-gray-900 mb-4">
            {{ product.name }}
          </h1>

          <div class="mb-6">
            <p class="text-sm text-gray-500 mb-1">Harga OTR Denpasar Mulai</p>
            <p class="text-3xl font-bold text-red-600">
              Rp {{ product.price }}
            </p>
          </div>

          <p class="text-gray-600 leading-relaxed mb-8 text-lg">
            {{ product.description }}
          </p>

          <!-- Action Buttons -->
          <div class="flex flex-col sm:flex-row gap-4 mb-10">
            <a
              :href="`https://wa.me/6281943447363?text=Halo, saya tertarik dengan ${product.name}`"
              target="_blank"
              class="flex-1 px-8 py-4 bg-green-600 hover:bg-green-700 text-white text-center rounded-xl font-bold transition-all shadow-lg hover:shadow-green-900/20 flex items-center justify-center gap-2">
              <span>📱</span> Whatsapp Sales
            </a>
            <a
              href="#"
              class="flex-1 px-8 py-4 bg-gray-900 hover:bg-gray-800 text-white text-center rounded-xl font-bold transition-all shadow-lg hover:shadow-gray-900/20">
              Unduh Brosur
            </a>
          </div>

          <!-- Specs Table -->
          <div>
            <h3 class="text-xl font-bold mb-4 border-b pb-2">
              Spesifikasi Singkat
            </h3>
            <div class="grid grid-cols-1 gap-y-3">
              <div
                v-for="(spec, index) in product.specs"
                :key="index"
                class="flex justify-between py-2 border-b border-gray-50 last:border-0 hover:bg-gray-50 px-2 rounded-lg transition-colors">
                <span class="text-gray-500 font-medium">{{ spec.label }}</span>
                <span class="text-gray-900 font-bold">{{ spec.value }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="min-h-[60vh] flex items-center justify-center">
    <div class="text-center">
      <h2 class="text-2xl font-bold text-gray-900 mb-2">
        Produk Tidak Ditemukan
      </h2>
      <NuxtLink to="/" class="text-red-600 hover:underline"
        >Kembali ke Home</NuxtLink
      >
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const { getProductById } = useProducts();

// Helper to reliably parse ID
const productId = computed(() => {
  const id = Array.isArray(route.params.id)
    ? route.params.id[0]
    : (route.params.id as string);
  return parseInt(id || "0");
});

const product = computed(() => getProductById(productId.value));

// SEO
useHead({
  title: computed(() =>
    product.value
      ? `${product.value.name} | Yamaha Deta Bali`
      : "Produk Tidak Ditemukan"
  ),
  meta: [
    {
      name: "description",
      content: computed(() =>
        product.value
          ? `Beli ${product.value.name} di Yamaha Deta Bali. Harga Promo Rp ${product.value.price}. ${product.value.description}`
          : ""
      ),
    },
  ],
});
</script>
