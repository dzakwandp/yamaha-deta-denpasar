<template>
  <div>
    <div class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-3xl font-bold text-gray-800">Kategori</h1>
        <p class="text-gray-500 mt-2">Kelola kategori produk motor Yamaha</p>
      </div>
      <NuxtLink
        to="/dashadmin/kategori/create"
        class="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg hover:shadow-red-900/30 flex items-center gap-2">
        <span>+</span> Tambah Kategori
      </NuxtLink>
    </div>

    <!-- Table -->
    <div
      class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50 border-b border-gray-100">
            <tr>
              <th
                class="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                Foto
              </th>
              <th
                class="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                Nama Kategori
              </th>
              <th
                class="px-6 py-4 text-right text-sm font-semibold text-gray-600">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr
              v-for="category in categories"
              :key="category.id"
              class="hover:bg-gray-50 transition-colors group">
              <td class="px-6 py-4 w-24">
                <div
                  class="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden border border-gray-200">
                  <img
                    :src="
                      category.image ||
                      'https://ui-avatars.com/api/?name=' + category.name
                    "
                    class="w-full h-full object-cover"
                    :alt="category.name" />
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="font-bold text-gray-900">{{ category.name }}</div>
              </td>
              <td class="px-6 py-4 text-right">
                <div class="flex items-center justify-end gap-2">
                  <NuxtLink
                    :to="`/dashadmin/kategori/${category.id}`"
                    class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Edit">
                    ✏️
                  </NuxtLink>
                  <button
                    @click="handleDelete(category.id)"
                    class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Hapus">
                    🗑️
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="categories.length === 0">
              <td colspan="3" class="px-6 py-12 text-center text-gray-500">
                Belum ada kategori.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "admin",
});

const { categories, deleteCategory } = useCategory();

import Swal from "sweetalert2";

const handleDelete = async (id: string, name: string) => {
  const result = await Swal.fire({
    title: `Hapus "${name}"?`,
    text: "Kategori yang dihapus tidak dapat dikembalikan!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Ya, Hapus!",
    cancelButtonText: "Batal",
  });

  if (!result.isConfirmed) return;

  try {
    await deleteCategory(id);
    Swal.fire({
      title: "Berhasil!",
      text: "Kategori berhasil dihapus.",
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
    });
  } catch (e) {
    console.error(e);
    Swal.fire({
      title: "Error!",
      text: "Gagal menghapus kategori.",
      icon: "error",
    });
  }
};
</script>
