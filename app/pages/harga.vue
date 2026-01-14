<template>
  <div class="bg-white min-h-screen pb-20">
    <!-- Header -->
    <div class="bg-gray-900 text-white py-20 px-4 mb-12">
      <div class="container mx-auto text-center">
        <h1 class="text-4xl md:text-5xl font-extrabold mb-4">
          Daftar Harga & Brosur
        </h1>
        <p class="text-gray-400 max-w-2xl mx-auto text-lg">
          Cek harga terbaru dan promo menarik motor impianmu di sini.
        </p>
      </div>
    </div>

    <div class="container mx-auto px-4">
      <!-- Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="(item, index) in hargaList"
          :key="item.id"
          @click="openGallery(index)"
          class="aspect-[4/5] bg-gray-100 rounded-2xl overflow-hidden cursor-pointer hover:shadow-xl transition-all group relative border border-gray-100 flex flex-col">
          <!-- Cross-compatibility check for PDF URLs from older edits: just ignore/filter them or try to show image -->
          <img
            :src="getCoverUrl(item)"
            :alt="item.description || 'Brosur Yamaha'"
            class="w-full h-full object-cover"
            onerror="this.src='https://placehold.co/400x500?text=No+Image'" />

          <!-- Multi-page indicator -->
          <div
            v-if="item.images && item.images.length > 1"
            class="absolute top-4 right-4 bg-black/50 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold border border-white/20">
            {{ item.images.length }} Halaman
          </div>

          <!-- Hover Overlay -->
          <div
            class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
            <div
              class="bg-white/90 backdrop-blur-sm px-6 py-2 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 font-bold text-gray-900 shadow-xl">
              🔍 Lihat Brosur
            </div>
          </div>

          <!-- Caption -->
          <div
            class="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent pt-20">
            <p class="text-white font-medium line-clamp-2 text-lg leading-snug">
              {{ item.description || "Tanpa deskripsi" }}
            </p>
            <p class="text-xs text-gray-300 mt-2 font-medium">
              📅 {{ formatDate(item.createdAt) }}
            </p>
          </div>

          <!-- Hidden Gallery for ViewerJS -->
          <div :id="`gallery-hidden-${index}`" class="hidden">
            <img
              v-for="(img, imgIdx) in item.images || [item.image]"
              :key="imgIdx"
              :src="img"
              :alt="`${item.description || 'Brosur'} - Halaman ${
                imgIdx + 1
              }`" />
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="loading" class="py-20 text-center">
        <div class="animate-pulse flex flex-col items-center">
          <div class="h-64 w-64 bg-gray-200 rounded-xl mb-4"></div>
          <p class="text-gray-400">Memuat data harga...</p>
        </div>
      </div>

      <div
        v-else-if="hargaList.length === 0"
        class="text-center py-20 bg-gray-50 rounded-3xl">
        <p class="text-2xl font-bold text-gray-400 mb-2">
          Belum ada brosur harga
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Timestamp } from "firebase/firestore";
import Viewer from "viewerjs";
import "viewerjs/dist/viewer.css";

useHead({
  title: "Daftar Harga | Yamaha Deta Denpasar",
});

const { getHargaList } = useHarga();
const hargaList = ref<any[]>([]);
const loading = ref(true);
let currentViewer: Viewer | null = null;

onMounted(async () => {
  try {
    hargaList.value = await getHargaList();
  } catch (e) {
    console.error(e);
  } finally {
    loading.value = false;
  }
});

const getCoverUrl = (item: any) => {
  if (item.images && item.images.length > 0) return item.images[0];
  return item.image || ""; // Fallback
};

const openGallery = (index: number) => {
  // If there's an open viewer, destroy it
  if (currentViewer) {
    currentViewer.destroy();
  }

  const galleryContainer = document.getElementById(`gallery-hidden-${index}`);
  if (galleryContainer) {
    currentViewer = new Viewer(galleryContainer, {
      hidden: () => {
        if (currentViewer) {
          currentViewer.destroy();
          currentViewer = null;
        }
      },
      toolbar: {
        zoomIn: 1,
        zoomOut: 1,
        oneToOne: 1,
        reset: 1,
        prev: 1,
        play: {
          show: 1,
          size: "large",
        },
        next: 1,
        rotateLeft: 1,
        rotateRight: 1,
        flipHorizontal: 1,
        flipVertical: 1,
      },
      title: [1, (image, imageData) => `${image.alt}`],
    });

    currentViewer.show();
  }
};

onUnmounted(() => {
  if (currentViewer) {
    currentViewer.destroy();
  }
});

const formatDate = (timestamp: Timestamp) => {
  if (!timestamp) return "-";
  return new Date(timestamp.toDate()).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};
</script>
