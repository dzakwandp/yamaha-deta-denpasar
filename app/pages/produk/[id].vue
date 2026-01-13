<template>
  <div v-if="product" class="bg-white min-h-[80vh]">
    <!-- Breadcrumb -->
    <div class="bg-gray-50 border-b border-gray-100">
      <div class="container mx-auto px-4 py-4 text-sm text-gray-500">
        <NuxtLink to="/" class="hover:text-red-600">Home</NuxtLink>
        <span class="mx-2">/</span>
        <NuxtLink to="/produk" class="hover:text-red-600">Produk</NuxtLink>
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                class="w-5 h-5"
                viewBox="0 0 16 16">
                <path
                  d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
              </svg>
              Whatsapp Sales
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
      ? `${product.value.name} | Yamaha Deta Denpasar`
      : "Produk Tidak Ditemukan"
  ),
  meta: [
    {
      name: "description",
      content: computed(() =>
        product.value
          ? `Beli ${product.value.name} di Yamaha Deta Denpasar. Harga Promo Rp ${product.value.price}. ${product.value.description}`
          : ""
      ),
    },
  ],
});
</script>
