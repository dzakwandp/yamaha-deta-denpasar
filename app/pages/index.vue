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
              to="/products"
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
            class="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all text-center group cursor-pointer border border-gray-100">
            <div
              class="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-red-50 transition-colors text-2xl">
              {{ cat.icon }}
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
            to="/products"
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
            to="/products"
            class="inline-block px-6 py-3 border border-gray-200 rounded-xl font-bold text-gray-700 hover:bg-gray-50">
            Lihat Semua Produk
          </NuxtLink>
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
          to="/contact"
          class="inline-flex items-center gap-2 px-8 py-4 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-green-900/30">
          <span>💬</span> Chat WhatsApp Sekarang
        </NuxtLink>
      </div>
    </section>
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

const categories = [
  { name: "MAXi", icon: "💎" },
  { name: "Classy", icon: "🛵" },
  { name: "Matic", icon: "⚡" },
  { name: "Sport", icon: "🏎️" },
  { name: "Off Road", icon: "⛰️" },
  { name: "Moped", icon: "🏍️" },
];

const { products } = useProducts();
const { banners } = useBanners();
const featuredProducts = products;

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

onMounted(() => {
  startInterval();
});

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
