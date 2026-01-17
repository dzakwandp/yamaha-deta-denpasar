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
          to="/produk"
          class="text-sm font-medium text-gray-700 hover:text-red-600 transition-colors uppercase tracking-wide"
          >Produk</NuxtLink
        >
        <NuxtLink
          to="/artikel"
          class="text-sm font-medium text-gray-700 hover:text-red-600 transition-colors uppercase tracking-wide"
          >Artikel</NuxtLink
        >
        <NuxtLink
          to="/harga"
          class="text-sm font-medium text-gray-700 hover:text-red-600 transition-colors uppercase tracking-wide"
          >Harga</NuxtLink
        >
        <NuxtLink
          to="/promo"
          class="text-sm font-medium text-gray-700 hover:text-red-600 transition-colors uppercase tracking-wide"
          >Promo</NuxtLink
        >
        <NuxtLink
          to="/kontak"
          class="px-5 py-2.5 rounded-full bg-red-600 text-white text-sm font-bold hover:bg-red-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
          Hubungi Kami
        </NuxtLink>

        <!-- Desktop Avatar -->
        <div class="relative" ref="contactPopupRef">
          <button
            v-if="profile"
            @click.stop="isContactOpen = !isContactOpen"
            class="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-100 hover:border-red-600 transition-colors focus:outline-none">
            <img
              :src="profile.photo"
              class="w-full h-full object-cover"
              :alt="profile.nama" />
          </button>

          <!-- Contact Overlay -->
          <Transition
            enter-active-class="transition duration-200 ease-out"
            enter-from-class="transform scale-95 opacity-0"
            enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-75 ease-in"
            leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0">
            <div
              v-if="isContactOpen && profile"
              class="absolute right-0 mt-4 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50">
              <div class="p-6">
                <div class="flex items-center gap-4 mb-6">
                  <div
                    class="w-16 h-16 rounded-full overflow-hidden border border-gray-100">
                    <img
                      :src="profile.photo"
                      class="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 class="font-bold text-gray-900">{{ profile.nama }}</h3>
                    <p class="text-xs text-red-600 font-bold">
                      Sales Executive
                    </p>
                  </div>
                </div>

                <div class="space-y-4">
                  <a
                    :href="`https://wa.me/${profile.nomor_hp.replace(
                      /\D/g,
                      ''
                    )}`"
                    target="_blank"
                    class="flex items-center gap-3 p-3 bg-green-50 text-green-700 rounded-xl hover:bg-green-100 transition-colors">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="w-4 h-4"
                      viewBox="0 0 16 16">
                      <path
                        d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
                    </svg>
                    <span class="text-sm font-bold">Chat WhatsApp</span>
                  </a>
                  <a
                    :href="`tel:${profile.nomor_hp}`"
                    class="flex items-center gap-3 p-3 bg-gray-50 text-gray-700 rounded-xl hover:bg-gray-100 transition-colors">
                    <span>📞</span>
                    <span class="text-sm font-bold">{{
                      profile.nomor_hp
                    }}</span>
                  </a>
                  <a
                    href="https://share.google/ChvX6TwrCtHEyb4ay"
                    target="_blank"
                    class="flex items-start gap-3 p-3 text-gray-600 text-sm hover:bg-gray-50 rounded-xl transition-colors">
                    <span class="mt-0.5">📍</span>
                    <span>{{ profile.alamat }}</span>
                  </a>
                </div>

                <div
                  class="mt-6 pt-4 border-t border-gray-100 text-center text-xs text-gray-400">
                  Yamaha Deta Denpasar
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>

      <!-- Mobile Actions -->
      <div class="md:hidden flex items-center gap-4">
        <!-- Mobile Avatar -->
        <div class="relative">
          <button
            v-if="profile"
            @click.stop="isContactOpen = !isContactOpen"
            class="w-9 h-9 rounded-full overflow-hidden border-2 border-gray-100 hover:border-red-600 transition-colors focus:outline-none">
            <img
              :src="profile.photo"
              class="w-full h-full object-cover"
              :alt="profile.nama" />
          </button>
          <!-- Mobile Overlay (Right aligned) -->
          <div
            v-if="isContactOpen && profile"
            class="absolute right-0 top-full mt-4 w-72 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50">
            <!-- Content Duplicated (Sorry for DRY violation, but safer for quick reliable UI) -->
            <div class="p-5">
              <div class="flex items-center gap-3 mb-5">
                <div
                  class="w-12 h-12 rounded-full overflow-hidden border border-gray-100">
                  <img
                    :src="profile.photo"
                    class="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 class="font-bold text-gray-900 text-sm">
                    {{ profile.nama }}
                  </h3>
                  <p class="text-[10px] text-red-600 font-bold">
                    Sales Executive
                  </p>
                </div>
              </div>

              <div class="space-y-3">
                <a
                  :href="`https://wa.me/${profile.nomor_hp.replace(/\D/g, '')}`"
                  target="_blank"
                  class="flex items-center gap-3 p-3 bg-green-50 text-green-700 rounded-xl hover:bg-green-100 transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="w-4 h-4"
                    viewBox="0 0 16 16">
                    <path
                      d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
                  </svg>
                  <span class="text-xs font-bold">Chat WhatsApp</span>
                </a>
                <a
                  :href="`tel:${profile.nomor_hp}`"
                  class="flex items-center gap-3 p-3 bg-gray-50 text-gray-700 rounded-xl hover:bg-gray-100 transition-colors">
                  <span>📞</span>
                  <span class="text-xs font-bold">{{ profile.nomor_hp }}</span>
                </a>
                <a
                  href="https://share.google/ChvX6TwrCtHEyb4ay"
                  target="_blank"
                  class="flex items-start gap-3 p-3 bg-gray-50 text-gray-700 rounded-xl hover:bg-gray-100 transition-colors">
                  <span class="mt-0.5">📍</span>
                  <span class="text-xs font-bold">{{ profile.alamat }}</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <button class="p-2 text-gray-600" @click="isMenuOpen = !isMenuOpen">
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
      </div>
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
          to="/produk"
          class="text-base font-medium text-gray-800 py-2 border-b border-gray-50"
          @click="isMenuOpen = false"
          >Produk</NuxtLink
        >
        <NuxtLink
          to="/artikel"
          class="text-base font-medium text-gray-800 py-2 border-b border-gray-50"
          @click="isMenuOpen = false"
          >Artikel</NuxtLink
        >
        <NuxtLink
          to="/harga"
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
          to="/kontak"
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
const isContactOpen = ref(false);
const { profiles } = useProfile();
const profile = computed(() => profiles.value[0]);

// Close contact popup when clicking outside
const contactPopupRef = ref(null);
onMounted(() => {
  document.addEventListener("click", (e) => {
    // @ts-ignore
    if (contactPopupRef.value && !contactPopupRef.value.contains(e.target)) {
      isContactOpen.value = false;
    }
  });
});
</script>
