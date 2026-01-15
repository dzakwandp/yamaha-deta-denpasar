<template>
  <div>
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold text-gray-800">Daftar Produk</h1>
      <NuxtLink
        to="/dashadmin/produk/create"
        class="px-6 py-3 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 transition-colors shadow-lg shadow-red-900/20">
        + Tambah Produk
      </NuxtLink>
    </div>

    <div
      class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr
            class="bg-gray-50 border-b border-gray-100 text-xs uppercase text-gray-500 font-bold tracking-wider">
            <th class="p-6">Produk</th>
            <th class="p-6">Kategori</th>
            <th class="p-6">Harga</th>
            <th class="p-6 text-right">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="product in products"
            :key="product.id"
            class="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors group">
            <td class="p-6">
              <div class="flex items-center gap-4">
                <div
                  class="w-16 h-12 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                  <img
                    :src="product.image"
                    class="w-full h-full object-cover" />
                </div>
                <div>
                  <div class="font-bold text-gray-900">{{ product.name }}</div>
                  <div class="text-xs text-gray-400" v-if="product.tag">
                    Tag: {{ product.tag }}
                  </div>
                </div>
              </div>
            </td>
            <td class="p-6">
              <span
                class="inline-block px-3 py-1 bg-gray-100 rounded-full text-xs font-bold text-gray-600"
                >{{ product.category }}</span
              >
            </td>
            <td class="p-6 font-medium text-gray-900">
              Rp {{ product.price }}
            </td>
            <td class="p-6 text-right">
              <div
                class="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <NuxtLink
                  :to="`/dashadmin/produk/${product.id}`"
                  class="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-sm font-bold hover:bg-blue-100">
                  Edit
                </NuxtLink>
                <button
                  @click="handleDuplicate(product)"
                  class="px-3 py-1.5 bg-gray-50 text-gray-600 rounded-lg text-sm font-bold hover:bg-gray-100"
                  title="Duplikat">
                  📋
                </button>
                <button
                  @click="handleDelete(product.id, product.name)"
                  class="px-3 py-1.5 bg-red-50 text-red-600 rounded-lg text-sm font-bold hover:bg-red-100">
                  Hapus
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-if="products.length === 0" class="p-12 text-center text-gray-500">
        Belum ada produk. Silakan tambah produk baru.
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "admin",
});

import Swal from "sweetalert2";

const { products, deleteProduct, duplicateProduct } = useProducts();
const db = useFirestore();

const handleDelete = async (id: string, name: string) => {
  const result = await Swal.fire({
    title: `Hapus ${name}?`,
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
    await deleteProduct(id);
    Swal.fire({
      title: "Berhasil!",
      text: "Produk berhasil dihapus.",
      icon: "success",
      timer: 2000,
      showConfirmButton: false,
    });
  } catch (e) {
    console.error(e);
    Swal.fire({
      title: "Gagal!",
      text: "Gagal menghapus produk.",
      icon: "error",
    });
  }
};

const handleDuplicate = async (product: any) => {
  const result = await Swal.fire({
    title: `Duplikat ${product.name}?`,
    text: "Akan membuat salinan produk ini.",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Ya, Duplikat!",
    cancelButtonText: "Batal",
  });

  if (!result.isConfirmed) return;

  try {
    await duplicateProduct(product);
    Swal.fire({
      title: "Berhasil!",
      text: "Produk berhasil diduplikat.",
      icon: "success",
      timer: 2000,
      showConfirmButton: false,
    });
  } catch (e) {
    console.error(e);
    Swal.fire({
      title: "Gagal!",
      text: "Gagal menduplikat produk.",
      icon: "error",
    });
  }
};
</script>
