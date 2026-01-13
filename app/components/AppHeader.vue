<template>
  <header class="bg-white sticky top-0 z-50 shadow-sm border-b border-gray-100">
    <nav class="container mx-auto px-4 h-16 flex items-center justify-between">
      <!-- Logo -->
      <NuxtLink to="/" class="flex items-center gap-2">
        <img src="@/assets/image/logo.png" class="w-10" />
        <img src="@/assets/image/yamaha.png" class="h-6" />
      </NuxtLink>

      <!-- Desktop Menu -->
      <div class="hidden md:flex items-center gap-8">
        <NuxtLink
          to="/"
          class="text-sm font-medium text-gray-700 hover:text-red-600 transition-colors uppercase tracking-wide"
          >Home</NuxtLink
        >
        <NuxtLink
          to="/products"
          class="text-sm font-medium text-gray-700 hover:text-red-600 transition-colors uppercase tracking-wide"
          >Produk</NuxtLink
        >
        <NuxtLink
          to="/pricelist"
          class="text-sm font-medium text-gray-700 hover:text-red-600 transition-colors uppercase tracking-wide"
          >Harga</NuxtLink
        >
        <NuxtLink
          to="/promo"
          class="text-sm font-medium text-gray-700 hover:text-red-600 transition-colors uppercase tracking-wide"
          >Promo</NuxtLink
        >
        <NuxtLink
          to="/contact"
          class="px-5 py-2.5 rounded-full bg-red-600 text-white text-sm font-bold hover:bg-red-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
          Hubungi Kami
        </NuxtLink>
      </div>

      <!-- Mobile Menu Button -->
      <button
        class="md:hidden p-2 text-gray-600"
        @click="isMenuOpen = !isMenuOpen">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round">
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </button>
    </nav>

    <!-- Mobile Menu -->
    <div v-if="isMenuOpen" class="md:hidden border-t border-gray-100 bg-white">
      <div class="container mx-auto px-4 py-4 flex flex-col gap-4">
        <NuxtLink
          to="/"
          class="text-base font-medium text-gray-800 py-2 border-b border-gray-50"
          @click="isMenuOpen = false"
          >Home</NuxtLink
        >
        <NuxtLink
          to="/products"
          class="text-base font-medium text-gray-800 py-2 border-b border-gray-50"
          @click="isMenuOpen = false"
          >Produk</NuxtLink
        >
        <NuxtLink
          to="/pricelist"
          class="text-base font-medium text-gray-800 py-2 border-b border-gray-50"
          @click="isMenuOpen = false"
          >Harga</NuxtLink
        >
        <NuxtLink
          to="/promo"
          class="text-base font-medium text-gray-800 py-2 border-b border-gray-50"
          @click="isMenuOpen = false"
          >Promo</NuxtLink
        >
        <NuxtLink
          to="/contact"
          class="text-base font-medium text-red-600 py-2"
          @click="isMenuOpen = false"
          >Hubungi Kami</NuxtLink
        >
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const isMenuOpen = ref(false);
</script>
