<template>
  <div>
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-3xl font-bold text-gray-800">Profil</h1>
        <p class="text-gray-500 mt-1">Kelola data profil tim</p>
      </div>
      <NuxtLink
        to="/dashadmin/profil/create"
        class="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-colors shadow-lg shadow-red-200">
        <span>+</span> Tambah Profil
      </NuxtLink>
    </div>

    <div
      class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <table class="w-full">
        <thead class="bg-gray-50 border-b border-gray-100">
          <tr>
            <th
              class="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
              Profil
            </th>
            <th
              class="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
              Kontak
            </th>
            <th
              class="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
              Sosial Media
            </th>
            <th
              class="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr
            v-for="profile in profiles"
            :key="profile.id"
            class="hover:bg-gray-50 transition-colors">
            <td class="px-6 py-4">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-full bg-gray-100 overflow-hidden">
                  <img
                    v-if="profile.photo"
                    :src="profile.photo"
                    class="w-full h-full object-cover" />
                  <div
                    v-else
                    class="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                    N/A
                  </div>
                </div>
                <div>
                  <div class="font-bold text-gray-900">{{ profile.nama }}</div>
                  <div class="text-sm text-gray-500 truncate max-w-[200px]">
                    {{ profile.alamat }}
                  </div>
                </div>
              </div>
            </td>
            <td class="px-6 py-4">
              <div class="text-sm">
                <div class="text-gray-900">{{ profile.email }}</div>
                <div class="text-gray-500">{{ profile.nomor_hp }}</div>
              </div>
            </td>
            <td class="px-6 py-4">
              <div class="text-sm text-gray-600">
                {{ profile.instagram || "-" }}
              </div>
            </td>
            <td class="px-6 py-4 text-right">
              <div class="flex items-center justify-end gap-2">
                <NuxtLink
                  :to="`/dashadmin/profil/${profile.id}`"
                  class="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  ✏️
                </NuxtLink>
                <button
                  @click="handleDelete(profile.id, profile.nama)"
                  class="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                  🗑️
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Empty State -->
      <div v-if="profiles.length === 0" class="p-12 text-center text-gray-400">
        <div class="text-4xl mb-4">👥</div>
        <p>Belum ada data profil.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "admin",
});

const { profiles, deleteProfile } = useProfile();

import Swal from "sweetalert2";

const handleDelete = async (id: string, name: string) => {
  const result = await Swal.fire({
    title: `Hapus "${name}"?`,
    text: "Profil yang dihapus tidak dapat dikembalikan!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Ya, Hapus!",
    cancelButtonText: "Batal",
  });

  if (!result.isConfirmed) return;

  try {
    await deleteProfile(id);
    Swal.fire({
      title: "Berhasil!",
      text: "Profil berhasil dihapus.",
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
    });
  } catch (e) {
    console.error(e);
    Swal.fire({
      title: "Error!",
      text: "Gagal menghapus profil.",
      icon: "error",
    });
  }
};
</script>
