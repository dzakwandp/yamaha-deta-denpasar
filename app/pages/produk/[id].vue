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
        <div class="md:sticky top-24 self-start">
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
              Whatsapp Widya
            </a>
            <button
              v-if="product.brochure"
              @click="openBrochure(product.brochure)"
              class="flex-1 px-8 py-4 bg-gray-900 hover:bg-gray-800 text-white text-center rounded-xl font-bold transition-all shadow-lg hover:shadow-gray-900/20 flex items-center justify-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-book-open">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
              </svg>
              Lihat Brosur
            </button>
            <a
              v-else
              href="#"
              class="flex-1 px-8 py-4 bg-gray-200 text-gray-400 text-center rounded-xl font-bold cursor-not-allowed flex items-center justify-center gap-2">
              Brosur Belum Tersedia
            </a>
          </div>

          <!-- Specs Table -->
          <div>
            <h3 class="text-xl font-bold mb-4 border-b pb-2">
              Spesifikasi Singkat
            </h3>
            <div class="space-y-6">
              <template v-if="product.specs && !Array.isArray(product.specs)">
                <div
                  v-for="group in orderedSpecs"
                  :key="group.name"
                  class="border-b border-gray-100 last:border-0">
                  <button
                    @click="toggleSpecGroup(group.name)"
                    class="w-full flex justify-between items-center py-4 text-left group focus:outline-none">
                    <h4
                      class="font-bold text-gray-800 uppercase text-sm group-hover:text-red-600 transition-colors">
                      {{ group.name }}
                    </h4>
                    <span
                      class="transition-transform duration-300 transform"
                      :class="isGroupOpen(group.name) ? 'rotate-180' : ''">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="text-gray-400">
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </span>
                  </button>

                  <div
                    v-show="isGroupOpen(group.name)"
                    class="grid grid-cols-1 gap-y-2 pb-6 animate-fade-in-down">
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

    <!-- Sales Profile Section -->
    <section class="py-20 bg-gray-50 border-t border-gray-100" v-if="profile">
      <div class="container mx-auto px-4">
        <div
          class="max-w-4xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-xl flex flex-col md:flex-row items-center gap-8 md:gap-12 relative overflow-hidden">
          <!-- Decor -->
          <div
            class="absolute top-0 right-0 w-64 h-64 bg-red-50 rounded-full -mr-32 -mt-32 z-0"></div>
          <div
            class="absolute bottom-0 left-0 w-48 h-48 bg-gray-50 rounded-full -ml-24 -mb-24 z-0"></div>

          <!-- Image -->
          <div class="relative z-10 w-48 h-48 md:w-64 md:h-64 shrink-0">
            <div
              class="w-full h-full rounded-full border-4 border-white shadow-lg overflow-hidden">
              <img
                v-if="profile.photo"
                :src="profile.photo"
                :alt="profile.nama"
                class="w-full h-full object-cover" />
              <div
                v-else
                class="w-full h-full bg-gray-200 flex items-center justify-center text-4xl text-gray-400">
                👤
              </div>
            </div>
            <!-- Badge -->
            <div
              class="absolute bottom-4 right-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
              Official Sales
            </div>
          </div>

          <!-- Content -->
          <div class="relative z-10 text-center md:text-left flex-1">
            <h2 class="text-3xl font-bold text-gray-900 mb-2">
              Pemesanan Hubungi Sales Kami
            </h2>
            <p class="text-gray-500 mb-6">
              Dapatkan konsultasi gratis dan penawaran terbaik untuk motor
              Yamaha impian Anda.
            </p>

            <div class="space-y-4">
              <div>
                <h3 class="text-2xl font-bold text-gray-900">
                  {{ profile.nama }}
                </h3>
                <p
                  class="text-red-600 font-bold uppercase text-sm tracking-wide">
                  Sales Executive
                </p>
              </div>

              <div
                class="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-2">
                <a
                  :href="`https://wa.me/${formatPhoneForWhatsapp(
                    profile.nomor_hp
                  )}?text=Halo ${
                    profile.nama
                  }, saya ingin konsultasi motor Yamaha.`"
                  target="_blank"
                  class="px-8 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-green-500/30 flex items-center justify-center gap-2">
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
                  Chat Widya
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
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
import "viewerjs/dist/viewer.css";
import Viewer from "viewerjs";
const route = useRoute();
const { getProductById } = useProducts();
const { profiles } = useProfile();

const profile = computed(() => profiles.value[0]);

const formatPhoneForWhatsapp = (phone: string) => {
  if (!phone) return "";
  let cleanPhone = phone.replace(/\D/g, "");
  if (cleanPhone.startsWith("0")) {
    cleanPhone = "62" + cleanPhone.slice(1);
  }
  return cleanPhone;
};

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

// Accordion State
const openSpecGroups = ref<string[]>(["Mesin"]);

const toggleSpecGroup = (groupName: string) => {
  if (openSpecGroups.value.includes(groupName)) {
    openSpecGroups.value = openSpecGroups.value.filter(
      (name) => name !== groupName
    );
  } else {
    openSpecGroups.value.push(groupName);
  }
};

const isGroupOpen = (groupName: string) => {
  return openSpecGroups.value.includes(groupName);
};

// Brochure Viewer Logic
const openBrochure = (url: string) => {
  // Check if it's a PDF
  if (url.toLowerCase().endsWith(".pdf")) {
    window.open(url, "_blank");
    return;
  }

  // Create a hidden image element
  const image = document.createElement("img");
  image.src = url;
  image.alt = "Brochure";
  image.style.display = "none";
  document.body.appendChild(image);

  // Initialize Viewer
  const viewer = new Viewer(image, {
    hidden: () => {
      viewer.destroy();
      document.body.removeChild(image);
    },
    toolbar: {
      zoomIn: 1,
      zoomOut: 1,
      oneToOne: 1,
      reset: 1,
      prev: 0,
      play: {
        show: 0,
        size: "large",
      },
      next: 0,
      rotateLeft: 1,
      rotateRight: 1,
      flipHorizontal: 1,
      flipVertical: 1,
    },
  });

  viewer.show();
};

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
