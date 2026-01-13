<template>
  <div class="flex h-screen bg-gray-100 font-sans">
    <!-- Sidebar -->
    <aside class="w-64 bg-gray-900 text-white shrink-0 hidden md:flex flex-col">
      <div class="p-6 border-b border-gray-800">
        <h1 class="text-xl font-bold tracking-tight">
          <span class="text-red-600">DETA</span> ADMIN
        </h1>
      </div>

      <nav class="flex-1 p-4 space-y-2">
        <NuxtLink
          to="/dashadmin"
          class="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-800 rounded-xl transition-colors"
          active-class="bg-gray-800 text-white font-medium">
          <span>📊</span> Dashboard
        </NuxtLink>
        <NuxtLink
          to="/dashadmin/categories"
          class="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-800 rounded-xl transition-colors"
          active-class="bg-gray-800 text-white font-medium">
          <span>🏷️</span> Kategori
        </NuxtLink>
        <NuxtLink
          to="/dashadmin/products"
          class="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-800 rounded-xl transition-colors"
          active-class="bg-gray-800 text-white font-medium">
          <span>📦</span> Produk
        </NuxtLink>
        <NuxtLink
          to="/dashadmin/profiles"
          class="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-800 rounded-xl transition-colors"
          active-class="bg-gray-800 text-white font-medium">
          <span>👤</span> Profil
        </NuxtLink>
        <NuxtLink
          to="/dashadmin/banners"
          class="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-800 rounded-xl transition-colors"
          active-class="bg-gray-800 text-white font-medium">
          <span>🖼️</span> Banner
        </NuxtLink>
        <a
          href="/"
          target="_blank"
          class="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-800 rounded-xl transition-colors mt-8 border-t border-gray-800">
          <span>🌐</span> Lihat Website
        </a>
      </nav>

      <div class="p-4 border-t border-gray-800">
        <button
          @click="handleLogout"
          class="flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-gray-800 rounded-xl transition-colors w-full text-left">
          <span>🚪</span> Keluar
        </button>
        <div class="mt-4 text-xs text-gray-500 text-center">
          &copy; 2024 Yamaha Deta Bali
        </div>
      </div>
    </aside>

    <!-- Content Area -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- Mobile Header -->
      <header
        class="md:hidden bg-white h-16 border-b flex items-center justify-between px-4">
        <span class="font-bold">Admin Panel</span>
        <div class="flex gap-4">
          <NuxtLink to="/dashadmin" class="text-sm text-blue-600"
            >Home</NuxtLink
          >
          <button @click="handleLogout" class="text-sm text-red-600">
            Logout
          </button>
        </div>
      </header>

      <!-- Main Content -->
      <main class="flex-1 overflow-auto p-8">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
const { logout } = useAuth();

const handleLogout = () => {
  if (confirm("Apakah anda yakin ingin keluar?")) {
    logout();
  }
};
</script>
