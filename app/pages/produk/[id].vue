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
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <!-- Image Section -->
        <div class="sticky top-24 self-start">
          <div
            class="aspect-4/3 bg-gray-50 rounded-2xl overflow-hidden p-8 border border-gray-100 relative group">
            <!-- Default Image (Fallback) -->
            <img
              :src="product.image"
              :alt="product.name"
              class="absolute inset-0 w-full h-full object-contain p-8 transition-all duration-500 group-hover:scale-105"
              :class="
                !selectedColor ? 'opacity-100 z-10' : 'opacity-0 z-0 delay-100'
              " />

            <!-- Color Variant Images -->
            <template v-if="product.colors && product.colors.length > 0">
              <img
                v-for="(color, index) in product.colors"
                :key="index"
                :src="color.image"
                :alt="`${product.name} - ${color.name}`"
                class="absolute inset-0 w-full h-full object-contain p-8 transition-all duration-500 group-hover:scale-105"
                :class="
                  selectedColor === color
                    ? 'opacity-100 z-10'
                    : 'opacity-0 z-0 delay-100'
                " />
            </template>
          </div>

          <!-- Color Variants -->
          <div
            v-if="product.colors && product.colors.length > 0"
            class="mt-6 flex flex-col items-center">
            <div class="flex flex-wrap gap-3 justify-center mb-3">
              <button
                v-for="(color, index) in product.colors"
                :key="index"
                @click="selectedColor = color"
                class="group relative w-10 h-10 rounded-full border-2 transition-all flex items-center justify-center shadow-sm"
                :class="
                  selectedColor === color
                    ? 'border-red-600 ring-2 ring-red-100 scale-110'
                    : 'border-white ring-1 ring-gray-200 hover:scale-105'
                "
                :style="{ backgroundColor: color.hex || '#ccc' }"
                :title="color.name">
                <!-- Checkmark for selected -->
                <span
                  v-if="selectedColor === color"
                  class="text-white drop-shadow-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="3"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-check">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </span>
              </button>
            </div>
            <div class="text-center" v-if="selectedColor">
              <p class="text-gray-900 font-bold">{{ selectedColor.name }}</p>
            </div>
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
            <div class="space-y-6">
              <template v-if="product.specs && !Array.isArray(product.specs)">
                <div v-for="group in orderedSpecs" :key="group.name">
                  <h4
                    class="font-bold text-gray-800 uppercase text-sm border-b pb-1 mb-3">
                    {{ group.name }}
                  </h4>
                  <div class="grid grid-cols-1 gap-y-2">
                    <div
                      v-for="(spec, index) in group.items"
                      :key="index"
                      class="flex justify-between py-2 border-b border-gray-50 last:border-0 hover:bg-gray-50 px-2 rounded-lg transition-colors">
                      <span class="text-gray-500 font-medium text-sm">{{
                        spec.label
                      }}</span>
                      <span class="text-gray-900 font-bold text-sm">{{
                        spec.value
                      }}</span>
                    </div>
                  </div>
                </div>
              </template>

              <!-- Legacy Fallback -->
              <template v-else>
                <div class="grid grid-cols-1 gap-y-3">
                  <div
                    v-for="(spec, index) in product.specs"
                    :key="index"
                    class="flex justify-between py-2 border-b border-gray-50 last:border-0 hover:bg-gray-50 px-2 rounded-lg transition-colors">
                    <span class="text-gray-500 font-medium">{{
                      spec.label
                    }}</span>
                    <span class="text-gray-900 font-bold">{{
                      spec.value
                    }}</span>
                  </div>
                </div>
              </template>
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

// Spec Ordering Logic
const specOrder = ["Mesin", "Rangka", "Dimensi", "Kelistrikan"];
const orderedSpecs = computed(() => {
  if (
    !product.value ||
    !product.value.specs ||
    Array.isArray(product.value.specs)
  ) {
    return [];
  }

  const specs = product.value.specs;
  const keys = Object.keys(specs).sort((a, b) => {
    const startA = specOrder.indexOf(a);
    const startB = specOrder.indexOf(b);

    // If both are in the known order list
    if (startA !== -1 && startB !== -1) {
      return startA - startB;
    }
    // If only A is in the list, A comes first
    if (startA !== -1) return -1;
    // If only B is in the list, B comes first
    if (startB !== -1) return 1;
    // Neither in list, sort alphabetically/default
    return a.localeCompare(b);
  });

  return keys.map((key) => ({
    name: key,
    items: specs[key],
  }));
});

const selectedColor = ref<{ name: string; image: string; hex: string } | null>(
  null
);

// Reset selected color when product changes
watch(product, (newVal) => {
  if (newVal && newVal.colors && newVal.colors.length > 0) {
    selectedColor.value = newVal.colors[0]; // Default to first color
  } else {
    selectedColor.value = null;
  }
});

// Determine which image to show
const currentImage = computed(() => {
  if (selectedColor.value && selectedColor.value.image) {
    return selectedColor.value.image;
  }
  return product.value?.image;
});

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
