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
            <!-- Name -->
            <div class="flex items-start gap-4">
              <div
                class="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-xl shrink-0">
                👧🏻
              </div>
              <div>
                <h3 class="font-bold text-lg text-gray-900 mb-1">
                  {{ profile.nama }}
                </h3>
              </div>
            </div>

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
                    '',
                  )}`"
                  target="_blank"
                  class="text-gray-600 hover:text-red-600 font-medium transition-colors">
                  {{ profile.instagram }}
                </a>
              </div>
            </div>

            <!-- TikTok -->
            <div class="flex items-start gap-4" v-if="profile.tiktok">
              <div
                class="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-xl shrink-0">
                🎵
              </div>
              <div>
                <h3 class="font-bold text-lg text-gray-900 mb-1">TikTok</h3>
                <a
                  :href="profile.tiktok"
                  target="_blank"
                  class="text-gray-600 hover:text-red-600 font-medium transition-colors">
                  {{ profile.tiktok.replace("https://www.tiktok.com/", "") }}
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Image (1:1 Aspect Ratio) -->
        <div
          class="md:w-max w-2/3 max-w-md mx-auto md:max-w-none md:mx-0 aspect-square rounded-2xl overflow-hidden shadow-lg relative group">
          <img
            :src="
              profile.photo ||
              'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2069&auto=format&fit=crop'
            "
            class="w-full h-full object-cover"
            :alt="profile.nama || 'Yamaha Deta Denpasar'" />
        </div>

        <!-- maps view -->
        <div
          class="md:w-1/2 w-[80%] mx-auto rounded-md overflow-hidden shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3944.5828025266333!2d115.2374632!3d-8.6359881!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd23f006c7f9ec1%3A0x646dc136794ad36f!2sYAMAHA%20DETA%20GATSU%20TIMUR!5e0!3m2!1sid!2sid!4v1768628676045!5m2!1sid!2sid"
            width="600"
            height="450"
            style="border: 0"
            allowfullscreen
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade">
          </iframe>
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
