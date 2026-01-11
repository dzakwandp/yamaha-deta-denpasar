<template>
  <footer class="bg-gray-900 text-white pt-16 pb-8">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
        <!-- Brand Info -->
        <div>
          <h3 class="text-2xl font-bold mb-6 text-white">
            <span class="text-red-500">YAMAHA</span> DETA BALI
          </h3>
          <p class="text-gray-400 leading-relaxed mb-6">
            Dealer Resmi Motor Yamaha Terbaik, Terbesar, Termurah, Terpercaya,
            Terdekat di Bali. Melayani pembelian motor YAMAHA CASH maupun
            CREDIT.
          </p>
          <div class="flex gap-4">
            <!-- Social Icons placeholders -->
            <a
              href="#"
              class="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-red-600 transition-colors">
              <span class="sr-only">Facebook</span>
              F
            </a>
            <a
              href="#"
              class="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-red-600 transition-colors">
              <span class="sr-only">Instagram</span>
              I
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h4
            class="text-lg font-bold mb-6 text-white border-b border-gray-800 pb-2 inline-block">
            Menu Cepat
          </h4>
          <ul class="space-y-3">
            <li>
              <NuxtLink
                to="/products"
                class="text-gray-400 hover:text-red-500 transition-colors"
                >Daftar Produk</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                to="/pricelist"
                class="text-gray-400 hover:text-red-500 transition-colors"
                >Daftar Harga</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                to="/promo"
                class="text-gray-400 hover:text-red-500 transition-colors"
                >Promo Terbaru</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                to="/syarat-kredit"
                class="text-gray-400 hover:text-red-500 transition-colors"
                >Syarat Kredit</NuxtLink
              >
            </li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h4
            class="text-lg font-bold mb-6 text-white border-b border-gray-800 pb-2 inline-block">
            Hubungi Kami
          </h4>
          <ul class="space-y-4">
            <li class="flex items-start gap-3">
              <span class="text-red-500 mt-1">📍</span>
              <span class="text-gray-400"
                >Jl. Hayam Wuruk No.155, Sumerta Kelod, Denpasar Tim., Kota
                Denpasar, Bali 80239</span
              >
            </li>
            <li class="flex items-center gap-3">
              <span class="text-red-500">📞</span>
              <a href="tel:083129956328" class="text-gray-400 hover:text-white"
                >0831-2995-6328</a
              >
            </li>
            <li class="flex items-center gap-3">
              <span class="text-red-500">📱</span>
              <a
                href="https://wa.me/6283129956328"
                class="text-gray-400 hover:text-white"
                >WhatsApp Kami</a
              >
            </li>
          </ul>
        </div>
      </div>

      <div
        class="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
        <p>
          &copy; {{ new Date().getFullYear() }} Yamaha Deta Bali. All rights
          reserved.
        </p>
      </div>
    </div>
  </footer>
</template>
