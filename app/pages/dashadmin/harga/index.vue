<template>
  <div>
    <div class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-3xl font-bold text-gray-800">Daftar Harga / Brosur</h1>
        <p class="text-gray-500 mt-2">Kelola gambar brosur dan daftar harga.</p>
      </div>
      <NuxtLink
        to="/dashadmin/harga/create"
        class="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg hover:shadow-red-900/30 flex items-center gap-2">
        <span>+</span> Upload Brosur
      </NuxtLink>
    </div>

    <!-- Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="item in hargaList"
        :key="item.id"
        class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-md transition-all">
        <!-- Cover Image -->
        <div class="aspect-[4/5] relative overflow-hidden bg-gray-100">
          <img
            :src="getCoverUrl(item)"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />

          <!-- Multi-image Indicator -->
          <div
            v-if="item.images && item.images.length > 1"
            class="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded-md backdrop-blur-sm">
            +{{ item.images.length - 1 }} Foto
          </div>

          <div
            class="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              @click="handleDelete(item.id)"
              class="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 shadow-sm">
              🗑️
            </button>
          </div>
        </div>

        <div class="p-4">
          <p class="text-gray-600 text-sm line-clamp-2">
            {{ item.description || "Tanpa deskripsi" }}
          </p>
          <div class="text-xs text-gray-400 mt-3 pt-3 border-t">
            {{ formatDate(item.createdAt) }}
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="hargaList.length === 0"
      class="text-center py-20 bg-gray-50 rounded-3xl mt-8">
      <p class="text-2xl font-bold text-gray-400 mb-2">
        Belum ada brosur harga
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Timestamp } from "firebase/firestore";
import Swal from "sweetalert2";

definePageMeta({
  layout: "admin",
});

const { getHargaList, deleteHarga } = useHarga();
const hargaList = ref<any[]>([]);

onMounted(async () => {
  hargaList.value = await getHargaList();
});

const getCoverUrl = (item: any) => {
  if (item.images && item.images.length > 0) return item.images[0];
  return item.image || ""; // Fallback
};

const handleDelete = async (id: string) => {
  const result = await Swal.fire({
    title: "Hapus Brosur?",
    text: "Data yang dihapus tidak dapat dikembalikan!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Ya, Hapus!",
    cancelButtonText: "Batal",
  });

  if (!result.isConfirmed) return;

  try {
    await deleteHarga(id);
    Swal.fire({
      title: "Berhasil!",
      text: "Brosur berhasil dihapus.",
      icon: "success",
      timer: 2000,
      showConfirmButton: false,
    });
    // Refresh list
    hargaList.value = await getHargaList();
  } catch (e) {
    console.error(e);
    Swal.fire({
      title: "Error!",
      text: "Gagal menghapus brosur.",
      icon: "error",
    });
  }
};

const formatDate = (timestamp: Timestamp) => {
  if (!timestamp) return "-";
  return new Date(timestamp.toDate()).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
</script>
