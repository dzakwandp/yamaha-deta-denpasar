<template>
  <div>
    <div class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-3xl font-bold text-gray-800">Artikel</h1>
        <p class="text-gray-500 mt-2">
          Kelola artikel dan blog post, bagikan informasi terbaru!
        </p>
      </div>
      <NuxtLink
        to="/dashadmin/artikel/create"
        class="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg hover:shadow-red-900/30 flex items-center gap-2">
        <span>+</span> Tulis Artikel
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
                Cover
              </th>
              <th
                class="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                Judul & Penulis
              </th>
              <th
                class="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                Tanggal
              </th>
              <th
                class="px-6 py-4 text-right text-sm font-semibold text-gray-600">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr
              v-for="article in articles"
              :key="article.id"
              class="hover:bg-gray-50 transition-colors group">
              <td class="px-6 py-4 w-32">
                <div
                  class="w-20 h-14 rounded-lg bg-gray-100 overflow-hidden border border-gray-200">
                  <img
                    :src="
                      article.picture ||
                      'https://ui-avatars.com/api/?name=' + article.judul
                    "
                    class="w-full h-full object-cover"
                    :alt="article.judul" />
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="font-bold text-gray-900 mb-1 max-w-sm truncate">
                  {{ article.judul }}
                </div>
                <div class="text-xs text-gray-500 flex items-center gap-1">
                  <span>✍️</span> {{ article.penulisName || "Unknown" }}
                </div>
              </td>
              <td class="px-6 py-4 text-sm text-gray-500">
                {{ formatDate(article.createdAt) }}
              </td>
              <td class="px-6 py-4 text-right">
                <div class="flex items-center justify-end gap-2">
                  <NuxtLink
                    :to="`/dashadmin/artikel/${article.id}`"
                    class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Edit">
                    ✏️
                  </NuxtLink>
                  <button
                    @click="handleDelete(article.id)"
                    class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Hapus">
                    🗑️
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="articles.length === 0">
              <td colspan="4" class="px-6 py-12 text-center text-gray-500">
                Belum ada artikel. Yuk tulis sesuatu!
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Timestamp } from "firebase/firestore";

definePageMeta({
  layout: "admin",
});

const { getArticles, deleteArticle } = useArticle();
const articles = ref<any[]>([]);

onMounted(async () => {
  articles.value = await getArticles();
});

const handleDelete = async (id: string) => {
  if (confirm("Apakah anda yakin ingin menghapus artikel ini?")) {
    try {
      await deleteArticle(id);
      // Refresh list
      articles.value = await getArticles();
    } catch (e) {
      console.error(e);
      alert("Gagal menghapus artikel");
    }
  }
};

const formatDate = (timestamp: Timestamp) => {
  if (!timestamp) return "-";
  return new Date(timestamp.toDate()).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};
</script>
