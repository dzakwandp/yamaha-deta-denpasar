<template>
  <div>
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold text-gray-800">Manajemen Jenis Produk</h1>
      <NuxtLink
        to="/dashadmin/jenis/create"
        class="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2">
        <span>+</span> Tambah Jenis
      </NuxtLink>
    </div>

    <div
      class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <table class="w-full">
        <thead class="bg-gray-50 border-b border-gray-100">
          <tr>
            <th class="px-6 py-4 text-left text-sm font-bold text-gray-700">
              Name
            </th>
            <th class="px-6 py-4 text-right text-sm font-bold text-gray-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr
            v-for="jenis in jenisList"
            :key="jenis.id"
            class="hover:bg-gray-50 transition-colors">
            <td class="px-6 py-4">
              <span class="font-bold text-gray-900">{{ jenis.name }}</span>
            </td>
            <td class="px-6 py-4 text-right">
              <div class="flex justify-end gap-3">
                <button
                  @click="router.push(`/dashadmin/jenis/${jenis.id}`)"
                  class="text-blue-600 hover:text-blue-800 font-medium text-sm">
                  Edit
                </button>
                <button
                  @click="handleDelete(jenis.id, jenis.name)"
                  class="text-red-600 hover:text-red-800 font-medium text-sm">
                  Hapus
                </button>
              </div>
            </td>
          </tr>
          <tr v-if="jenisList.length === 0">
            <td colspan="2" class="px-6 py-12 text-center text-gray-500">
              Belum ada data jenis produk
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "admin",
});

const { jenisList, deleteJenis } = useJenis();
const router = useRouter();

import Swal from "sweetalert2";

const handleDelete = async (id: string, name: string) => {
  const result = await Swal.fire({
    title: `Hapus "${name}"?`,
    text: "Jenis Produk yang dihapus tidak dapat dikembalikan!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Ya, Hapus!",
    cancelButtonText: "Batal",
  });

  if (!result.isConfirmed) return;

  try {
    await deleteJenis(id);
    Swal.fire({
      title: "Berhasil!",
      text: "Data berhasil dihapus.",
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
    });
  } catch (e) {
    console.error(e);
    Swal.fire({
      title: "Error!",
      text: "Gagal menghapus data.",
      icon: "error",
    });
  }
};
</script>
