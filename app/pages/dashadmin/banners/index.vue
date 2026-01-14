<template>
  <div>
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold text-gray-800">Banner Web</h1>
      <NuxtLink
        to="/dashadmin/banners/create"
        class="px-6 py-3 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 transition-colors shadow-lg shadow-red-900/20">
        + Tambah Banner
      </NuxtLink>
    </div>

    <!-- Grid Layout for Banners -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="banner in banners"
        :key="banner.id"
        class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group relative">
        <div class="aspect-video bg-gray-100 relative">
          <img
            :src="banner.image"
            class="w-full h-full object-cover"
            alt="Banner Image" />

          <!-- Delete Overlay -->
          <div
            class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <button
              @click="handleDelete(banner.id!)"
              class="px-4 py-2 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 transition-colors">
              Hapus
            </button>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div
        v-if="banners.length === 0"
        class="col-span-full py-12 text-center text-gray-500 bg-gray-50 rounded-xl border-dashed border-2 border-gray-200">
        Belum ada banner. Silakan tambah banner baru.
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// import { db } from "@/firebase"; // Removed invalid import
import { doc, deleteDoc } from "firebase/firestore";
import Swal from "sweetalert2";

definePageMeta({
  layout: "admin",
});

const { banners } = useBanners();
const db = useFirestore(); // Use composable instead

const handleDelete = async (id: string) => {
  const result = await Swal.fire({
    title: "Hapus Banner?",
    text: "Banner yang dihapus tidak dapat dikembalikan!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Ya, Hapus!",
    cancelButtonText: "Batal",
  });

  if (!result.isConfirmed) return;

  try {
    await deleteDoc(doc(db, "banners", id));
    Swal.fire({
      title: "Berhasil!",
      text: "Banner berhasil dihapus.",
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
    });
  } catch (e) {
    console.error(e);
    Swal.fire({
      title: "Error!",
      text: "Gagal menghapus banner.",
      icon: "error",
    });
  }
};
</script>
