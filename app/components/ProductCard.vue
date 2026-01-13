<template>
  <div
    class="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col h-full">
    <!-- Image Container with Hover Effect -->
    <div class="relative aspect-4/3 bg-gray-50 overflow-hidden">
      <!-- Placeholder for image - in real app would be dynamic -->
      <div class="absolute inset-0 bg-gray-200" v-if="!imageLoaded"></div>
      <img
        ref="imgEl"
        :src="image"
        :alt="name"
        loading="lazy"
        class="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500"
        @load="imageLoaded = true" />
      <div
        class="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md z-10"
        v-if="tag">
        {{ tag }}
      </div>
    </div>

    <!-- Content -->
    <div class="p-6 flex flex-col grow">
      <div class="mb-4">
        <span
          class="text-xs font-bold text-gray-400 uppercase tracking-wider"
          >{{ category }}</span
        >
        <h3
          class="text-xl font-bold text-gray-800 mb-1 group-hover:text-red-600 transition-colors">
          {{ name }}
        </h3>
      </div>

      <div class="mt-auto">
        <p class="text-xs text-gray-500 mb-1">Harga Mulai</p>
        <p class="text-lg font-bold text-red-600">Rp {{ price }}</p>

        <NuxtLink
          :to="`/product/${id}`"
          class="mt-4 block w-full py-3 bg-gray-900 text-white text-center rounded-xl font-medium hover:bg-red-600 transition-colors shadow-lg shadow-gray-200">
          Lihat Detail
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  id: string | number;
  name: string;
  category: string;
  price: string;
  image: string;
  tag?: string;
}>();

const imageLoaded = ref(false);
const imgEl = ref<HTMLImageElement | null>(null);

onMounted(() => {
  if (imgEl.value?.complete) {
    imageLoaded.value = true;
  }
});
</script>
