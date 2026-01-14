<template>
  <footer class="bg-gray-900 text-white pt-16 pb-8">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
        <!-- Brand Info -->
        <div>
          <h3 class="text-2xl font-bold mb-6 text-white">
            <span class="text-red-500">YAMAHA</span> DETA DENPASAR
          </h3>
          <p class="text-gray-400 leading-relaxed mb-6">
            Dealer Resmi Motor Yamaha Terbaik, Terbesar, Termurah, Terpercaya,
            Terdekat di Denpasar. Melayani pembelian motor YAMAHA CASH maupun
            CREDIT.
          </p>
          <div class="flex gap-4">
            <!-- Social Icons placeholders -->
            <a
              v-if="profile?.instagram"
              :href="`https://instagram.com/${profile.instagram.replace(
                '@',
                ''
              )}`"
              target="_blank"
              class="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-red-600 transition-colors">
              <span class="sr-only">Instagram</span>
              <!-- Simple IG Icon SVG -->
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
                class="feather feather-instagram">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path
                  d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
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
                to="/produk"
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
          <ul class="space-y-4" v-if="profile">
            <li class="flex items-start gap-3">
              <span class="text-red-500 mt-1">👤</span>
              <span class="text-gray-400 font-bold">{{ profile.nama }}</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="text-red-500 mt-1">📍</span>
              <span class="text-gray-400">{{ profile.alamat }}</span>
            </li>
            <li class="flex items-center gap-3">
              <span class="text-red-500">📞</span>
              <a
                :href="`tel:${profile.nomor_hp}`"
                class="text-gray-400 hover:text-white"
                >{{ profile.nomor_hp }}</a
              >
            </li>
            <li class="flex items-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                class="w-5 h-5 text-red-500"
                viewBox="0 0 16 16">
                <path
                  d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
              </svg>
              <a
                :href="`https://wa.me/${formatPhoneForWhatsapp(
                  profile.nomor_hp
                )}`"
                target="_blank"
                class="text-gray-400 hover:text-white"
                >WhatsApp Kami</a
              >
            </li>
            <li class="flex items-center gap-3" v-if="profile.instagram">
              <span class="text-red-500">📷</span>
              <a
                :href="`https://instagram.com/${profile.instagram.replace(
                  '@',
                  ''
                )}`"
                target="_blank"
                class="text-gray-400 hover:text-white"
                >Instagram</a
              >
            </li>
          </ul>
          <!-- Loading state or fallback -->
          <ul class="space-y-4" v-else>
            <li class="text-gray-500">Loading contact info...</li>
          </ul>
        </div>
      </div>

      <div
        class="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
        <p>
          &copy; {{ new Date().getFullYear() }} Yamaha Deta Denpasar |
          <a href="https://dzakwandp.id" target="_blank">dzakwandp.id.</a> All
          rights reserved.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const { profiles } = useProfile();
const profile = computed(() => profiles.value[0]);

const formatPhoneForWhatsapp = (phone: string) => {
  if (!phone) return "";
  // Remove non-numeric characters
  let cleanPhone = phone.replace(/\D/g, "");
  // Replace leading 0 with 62
  if (cleanPhone.startsWith("0")) {
    cleanPhone = "62" + cleanPhone.slice(1);
  }
  return cleanPhone;
};
</script>
