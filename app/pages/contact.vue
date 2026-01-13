<template>
  <div class="py-12 min-h-screen bg-gray-50">
    <div class="container mx-auto px-4">
      <!-- Simple Header -->
      <div class="text-center mb-16">
        <h1 class="text-4xl font-extrabold text-gray-900 mb-4">Hubungi Kami</h1>
        <p class="text-xl text-gray-500 max-w-2xl mx-auto">
          Kami siap membantu Anda. Jangan ragu untuk menghubungi kami.
        </p>
      </div>

      <div
        v-if="profile"
        class="flex flex-col md:flex-row gap-8 md:gap-16 items-start">
        <!-- Contact Info -->
        <div class="w-full md:w-1/2 space-y-8">
          <div>
            <h2 class="text-3xl font-bold text-gray-900 mb-6">
              Informasi Kontak
            </h2>
            <p class="text-gray-600 mb-8 text-lg">
              Kunjungi dealer kami atau hubungi kami melalui saluran berikut.
              Tim kami siap melayani kebutuhan motor Yamaha Anda.
            </p>
          </div>

          <div class="space-y-6">
            <!-- Address -->
            <div class="flex items-start gap-4">
              <div
                class="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-xl shrink-0">
                📍
              </div>
              <div>
                <h3 class="font-bold text-lg text-gray-900 mb-1">Alamat</h3>
                <p class="text-gray-600 leading-relaxed">
                  {{ profile.alamat }}
                </p>
              </div>
            </div>

            <!-- Phone -->
            <div class="flex items-start gap-4">
              <div
                class="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-xl shrink-0">
                📱
              </div>
              <div>
                <h3 class="font-bold text-lg text-gray-900 mb-1">
                  Telepon / WhatsApp
                </h3>
                <a
                  :href="`https://wa.me/${formatPhone(profile.nomor_hp)}`"
                  target="_blank"
                  class="text-gray-600 hover:text-red-600 font-medium transition-colors">
                  {{ profile.nomor_hp }}
                </a>
              </div>
            </div>

            <!-- Email -->
            <div class="flex items-start gap-4">
              <div
                class="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-xl shrink-0">
                ✉️
              </div>
              <div>
                <h3 class="font-bold text-lg text-gray-900 mb-1">Email</h3>
                <a
                  :href="`mailto:${profile.email}`"
                  class="text-gray-600 hover:text-red-600 font-medium transition-colors">
                  {{ profile.email }}
                </a>
              </div>
            </div>

            <!-- Social -->
            <div class="flex items-start gap-4">
              <div
                class="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-xl shrink-0">
                📷
              </div>
              <div>
                <h3 class="font-bold text-lg text-gray-900 mb-1">Instagram</h3>
                <a
                  :href="`https://instagram.com/${profile.instagram.replace(
                    '@',
                    ''
                  )}`"
                  target="_blank"
                  class="text-gray-600 hover:text-red-600 font-medium transition-colors">
                  {{ profile.instagram }}
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Image (1:1 Aspect Ratio) -->
        <div
          class="w-full md:w-1/2 flex items-center justify-center order-first md:order-last">
          <div
            class="w-full max-w-md mx-auto md:max-w-none md:mx-0 aspect-square rounded-2xl overflow-hidden shadow-lg relative group">
            <img
              :src="
                profile.photo ||
                'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2069&auto=format&fit=crop'
              "
              class="w-1/2 h-1/2 object-cover"
              :alt="profile.nama || 'Yamaha Showroom'" />

            <!-- Map Link Overlay -->
            <a
              :href="`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                profile.alamat
              )}`"
              target="_blank"
              class="absolute bottom-6 right-6 bg-white/90 backdrop-blur-sm text-gray-900 px-6 py-3 rounded-full font-bold shadow-lg hover:bg-red-600 hover:text-white transition-all flex items-center gap-2 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 duration-300">
              <span>🗺️</span> Buka Maps
            </a>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-else class="text-center py-20">
        <div
          class="animate-spin w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full mx-auto mb-4"></div>
        <p class="text-gray-500">Memuat informasi kontak...</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: "Hubungi Kami | Yamaha Deta Denpasar",
  meta: [
    {
      name: "description",
      content:
        "Hubungi Yamaha Deta Denpasar. Alamat, Telepon, WhatsApp, dan lokasi showroom kami.",
    },
  ],
});

const { profiles } = useProfile();

// Safely get the first profile
const profile = computed(() => {
  return profiles.value && profiles.value.length > 0 ? profiles.value[0] : null;
});

const formatPhone = (phone: string) => {
  if (!phone) return "";
  // Simple formatter to ensure it's WhatsApp friendly (62 format)
  let p = phone.replace(/\D/g, "");
  if (p.startsWith("0")) {
    p = "62" + p.slice(1);
  }
  return p;
};
</script>
