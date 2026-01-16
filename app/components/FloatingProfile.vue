<template>
  <div
    v-if="profile"
    class="fixed bottom-6 right-6 z-50 flex flex-col items-end"
    ref="floatingProfileRef">
    <!-- Popup -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="transform scale-95 opacity-0 translate-y-4"
      enter-to-class="transform scale-100 opacity-100 translate-y-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="transform scale-100 opacity-100 translate-y-0"
      leave-to-class="transform scale-95 opacity-0 translate-y-4">
      <div
        v-if="isOpen"
        class="mb-4 bg-white rounded-2xl shadow-2xl border border-gray-100 w-72 overflow-hidden relative">
        <!-- Decor -->
        <div
          class="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-full -mr-16 -mt-16 z-0"></div>
        <div
          class="absolute bottom-0 left-0 w-24 h-24 bg-gray-50 rounded-full -ml-12 -mb-12 z-0"></div>

        <div
          class="relative z-10 pt-8 pb-6 px-5 text-center flex flex-col items-center">
          <div
            class="w-20 h-20 mb-3 rounded-full border-4 border-white shadow-lg overflow-hidden bg-gray-100">
            <img :src="profile.photo" class="w-full h-full object-cover" />
          </div>

          <h3 class="font-bold text-gray-900 text-lg">{{ profile.nama }}</h3>
          <p
            class="text-xs text-red-600 font-bold uppercase tracking-wide mb-4">
            Sales Executive
          </p>

          <div class="space-y-3 w-full">
            <a
              :href="`https://wa.me/${formatPhoneForWhatsapp(
                profile.nomor_hp
              )}?text=Halo ${
                profile.nama
              }, saya ingin konsultasi motor Yamaha.`"
              target="_blank"
              class="flex items-center justify-center gap-2 w-full py-2.5 bg-green-500 hover:bg-green-600 text-white rounded-xl font-bold transition-all shadow-md hover:shadow-green-500/20 text-sm">
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
              Chat WhatsApp
            </a>
            <a
              :href="`tel:${profile.nomor_hp}`"
              class="flex items-center justify-center gap-2 w-full py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold transition-all text-sm">
              <span>📞</span>
              <span>{{ profile.nomor_hp }}</span>
            </a>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Floating Button -->
    <button
      @click="isOpen = !isOpen"
      class="group relative w-16 h-16 rounded-full shadow-xl border-4 border-white overflow-hidden transition-transform hover:scale-105 focus:outline-none ring-2 ring-red-600/20"
      :class="isOpen ? 'ring-4 ring-offset-2 ring-red-600' : ''">
      <img :src="profile.photo" class="w-full h-full object-cover" />

      <!-- Online Badge -->
      <span
        class="absolute bottom-1 right-1 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></span>

      <!-- Tooltip -->
      <div
        v-if="!isOpen"
        class="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-xs font-bold py-1.5 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
        Chat Sales
        <div
          class="absolute top-1/2 -right-1 -translate-y-1/2 border-4 border-transparent border-l-gray-900"></div>
      </div>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";

const { profiles } = useProfile();
const profile = computed(() => profiles.value[0]);
const isOpen = ref(false);
const floatingProfileRef = ref(null);

const formatPhoneForWhatsapp = (phone: string) => {
  if (!phone) return "";
  let cleanPhone = phone.replace(/\D/g, "");
  if (cleanPhone.startsWith("0")) {
    cleanPhone = "62" + cleanPhone.slice(1);
  }
  return cleanPhone;
};

// Close when clicking outside
const handleClickOutside = (e: MouseEvent) => {
  if (
    floatingProfileRef.value &&
    !(floatingProfileRef.value as HTMLElement).contains(e.target as Node)
  ) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>
