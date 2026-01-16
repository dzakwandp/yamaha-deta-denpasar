<template>
  <div>
    <!-- Hero Section -->
    <section
      class="relative bg-gray-900 text-white overflow-hidden h-[800px] flex items-center group">
      <!-- Background Carousel -->
      <div class="absolute inset-0 z-0">
        <div
          v-if="banners.length > 0"
          v-for="(banner, index) in banners"
          :key="banner.id"
          class="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          :class="index === currentSlide ? 'opacity-100' : 'opacity-0'">
          <img
            :src="banner.image"
            alt="Hero Background"
            class="w-full h-full object-cover" />
        </div>
        <!-- Fallback Static Image -->
        <div v-else class="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=2070&auto=format&fit=crop"
            alt="Yamaha Background"
            class="w-full h-full object-cover" />
        </div>

        <!-- Gradient Overlay -->
        <div
          class="absolute inset-0 bg-linear-to-r from-gray-900 via-gray-900/80 to-transparent z-10"></div>
      </div>

      <div
        class="container mx-auto px-4 relative z-20 flex flex-col md:flex-row items-center">
        <div class="md:w-1/2 space-y-6">
          <div
            class="inline-block bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-2 animate-fade-in-up">
            DEALER RESMI TERBAIK DI BALI
          </div>
          <h1
            class="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight">
            YAMAHA <br />
            <span
              class="text-transparent bg-clip-text bg-linear-to-r from-red-500 to-orange-500"
              >SEMAKIN DI DEPAN</span
            >
          </h1>
          <p class="text-lg text-gray-300 max-w-lg">
            Dapatkan promo spesial untuk pembelian NMAX "Turbo", Aerox, dan
            Fazzio Hybrid. Proses cepat, syarat mudah, dan pelayanan terbaik.
          </p>
          <div class="flex gap-4 pt-4">
            <NuxtLink
              to="/produk"
              class="px-8 py-4 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold transition-all transform hover:-translate-y-1 shadow-lg shadow-red-900/50">
              Lihat Produk
            </NuxtLink>
            <NuxtLink
              to="/promo"
              class="px-8 py-4 bg-transparent border-2 border-white hover:bg-white hover:text-gray-900 text-white rounded-xl font-bold transition-all">
              Promo Terbaru
            </NuxtLink>
          </div>
        </div>
      </div>
      <!-- Carousel Indicators (Optional) -->
      <div
        v-if="banners.length > 1"
        class="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        <button
          v-for="(_, index) in banners"
          :key="index"
          @click="setSlide(index)"
          class="w-2 h-2 rounded-full transition-all"
          :class="
            index === currentSlide
              ? 'bg-red-600 w-8'
              : 'bg-white/50 hover:bg-white'
          "></button>
      </div>
    </section>

    <!-- Categories Section -->
    <section class="py-20 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold mb-4">Kategori Produk</h2>
          <div class="w-20 h-1 bg-red-600 mx-auto rounded-full"></div>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div
            v-for="cat in categories"
            :key="cat.name"
            @click="navigateToCategory(cat.name)"
            class="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all text-center group cursor-pointer border border-gray-100">
            <div
              class="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-red-50 transition-colors overflow-hidden">
              <img
                :src="
                  cat.image || 'https://ui-avatars.com/api/?name=' + cat.name
                "
                class="w-full h-full object-cover"
                :alt="cat.name" />
            </div>
            <h3 class="font-bold text-gray-800 group-hover:text-red-600">
              {{ cat.name }}
            </h3>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="py-20 bg-white">
      <div class="container mx-auto px-4">
        <div class="flex justify-between items-end mb-12">
          <div>
            <h2 class="text-3xl font-bold mb-2">Produk Unggulan</h2>
            <p class="text-gray-500">
              Pilihan motor terbaik untuk menemani aktivitasmu
            </p>
          </div>
          <NuxtLink
            to="/produk"
            class="hidden md:flex items-center text-red-600 font-bold hover:gap-2 transition-all">
            Lihat Semua <span class="ml-1">→</span>
          </NuxtLink>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <ProductCard
            v-for="product in featuredProducts"
            :key="product.id"
            :id="product.id"
            :name="product.name"
            :category="product.category"
            :price="product.price"
            :image="product.image"
            :tag="product.tag" />
        </div>

        <div class="mt-12 text-center md:hidden">
          <NuxtLink
            to="/produk"
            class="inline-block px-6 py-3 border border-gray-200 rounded-xl font-bold text-gray-700 hover:bg-gray-50">
            Lihat Semua Produk
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Sales Profile Section -->
    <section class="py-20 bg-gray-50" v-if="profile">
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
              Kenalan dengan Sales Kami
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

    <!-- Promo Banner -->
    <section class="py-20 bg-gray-900 text-white relative overflow-hidden">
      <div class="container mx-auto px-4 relative z-10 text-center">
        <h2 class="text-3xl md:text-5xl font-bold mb-6">
          Butuh Simulasi Kredit?
        </h2>
        <p class="text-gray-400 mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
          Kami bantu hitungkan angsuran termurah sesuai budget kamu. Dapatkan
          bunga ringan dan proses cepat.
        </p>
        <NuxtLink
          to="/kontak"
          class="inline-flex items-center gap-2 px-8 py-4 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-green-900/30">
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
          Chat WhatsApp Sekarang
        </NuxtLink>
      </div>
    </section>
    <!-- Sales Profile Popup -->
    <Transition
      enter-active-class="transition ease-out duration-300"
      enter-from-class="opacity-0 scale-90"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition ease-in duration-200"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-90">
      <div
        v-if="showProfilePopup && profile"
        class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <!-- Backdrop -->
        <div
          class="absolute inset-0 bg-black/60 backdrop-blur-sm"
          @click="showProfilePopup = false"></div>

        <!-- Card -->
        <div
          class="relative bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden transform">
          <!-- Decor -->
          <div
            class="absolute top-0 right-0 w-48 h-48 bg-red-50 rounded-full -mr-24 -mt-24 z-0"></div>
          <div
            class="absolute bottom-0 left-0 w-32 h-32 bg-gray-50 rounded-full -ml-16 -mb-16 z-0"></div>

          <!-- Close Button -->
          <button
            @click="showProfilePopup = false"
            class="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full transition-colors">
            <span class="text-gray-700 font-bold">×</span>
          </button>

          <!-- Content -->
          <div
            class="relative z-10 pt-10 pb-8 px-6 text-center flex flex-col items-center">
            <!-- Image -->
            <div class="relative w-32 h-32 mb-4">
              <div
                class="w-full h-full rounded-full border-4 border-white shadow-lg overflow-hidden bg-gray-100">
                <img
                  v-if="profile.photo"
                  :src="profile.photo"
                  :alt="profile.nama"
                  class="w-full h-full object-cover" />
                <div
                  v-else
                  class="w-full h-full flex items-center justify-center text-gray-400">
                  <span class="text-4xl">👤</span>
                </div>
              </div>
            </div>

            <h3 class="text-xl font-bold text-gray-900 mb-1">
              {{ profile.nama }}
            </h3>
            <p class="text-red-600 text-sm font-bold uppercase tracking-wide">
              Sales Executive
            </p>

            <div class="mt-6 space-y-3 w-full">
              <a
                :href="`https://wa.me/${formatPhoneForWhatsapp(
                  profile.nomor_hp
                )}?text=Halo ${
                  profile.nama
                }, saya ingin tanya promo motor Yamaha.`"
                target="_blank"
                class="flex items-center justify-center gap-2 w-full py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-green-500/30">
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
              <button
                @click="showProfilePopup = false"
                class="w-full py-3 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-xl font-bold transition-colors">
                Lihat Website
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
// SEO Meta
useHead({
  title: "Yamaha Deta Denpasar - Official Dealer",
  meta: [
    {
      name: "description",
      content:
        "Dealer Resmi Yamaha Denpasar Terbaik. Jual NMAX, Aerox, Fazzio, R15. Cash & Kredit Bunga Murah.",
    },
  ],
});

const { categories } = useCategory();
const router = useRouter();

const navigateToCategory = (categoryName: string) => {
  router.push({
    path: "/produk",
    query: { category: categoryName },
  });
};

const { products } = useProducts();
const { banners } = useBanners();
const { profiles } = useProfile();

const profile = computed(() => profiles.value[0]);
const showProfilePopup = ref(false);

const formatPhoneForWhatsapp = (phone: string) => {
  if (!phone) return "";
  let cleanPhone = phone.replace(/\D/g, "");
  if (cleanPhone.startsWith("0")) {
    cleanPhone = "62" + cleanPhone.slice(1);
  }
  return cleanPhone;
};

// Show popup on mount with delay
onMounted(() => {
  startInterval();
  setTimeout(() => {
    showProfilePopup.value = true;
  }, 500); // 1.5s delay
});

const featuredProducts = computed(() => {
  if (!products.value) return [];
  // Filter only products with is_featured === true
  return products.value.filter(
    (p: any) => p.is_featured === true || p.is_featured === 1
  );
});

// Carousel Logic
const currentSlide = ref(0);
const carouselInterval = ref<NodeJS.Timeout | null>(null);

const nextSlide = () => {
  if (banners.value.length === 0) return;
  currentSlide.value = (currentSlide.value + 1) % banners.value.length;
};

const prevSlide = () => {
  if (banners.value.length === 0) return;
  currentSlide.value =
    (currentSlide.value - 1 + banners.value.length) % banners.value.length;
};

const setSlide = (index: number) => {
  currentSlide.value = index;
  resetInterval();
};

const startInterval = () => {
  carouselInterval.value = setInterval(nextSlide, 5000);
};

const stopInterval = () => {
  if (carouselInterval.value) {
    clearInterval(carouselInterval.value);
    carouselInterval.value = null;
  }
};

const resetInterval = () => {
  stopInterval();
  startInterval();
};

onUnmounted(() => {
  stopInterval();
});
</script>

<style scoped>
.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out;
}
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
