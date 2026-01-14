<template>
  <div class="py-12 bg-white">
    <div class="container mx-auto px-4">
      <div class="text-center mb-12">
        <h1 class="text-4xl font-extrabold text-gray-900 mb-4">
          Artikel & Berita
        </h1>
        <p class="text-gray-500 max-w-2xl mx-auto">
          Dapatkan informasi terbaru seputar motor Yamaha, tips perawatan, dan
          promo menarik.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <NuxtLink
          v-for="article in articles"
          :key="article.id"
          :to="`/artikel/${article.id}-${article.slug}`"
          class="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-gray-100 flex flex-col">
          <div class="aspect-video overflow-hidden">
            <img
              :src="
                article.picture ||
                'https://ui-avatars.com/api/?name=' + article.judul
              "
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              :alt="article.judul" />
          </div>
          <div class="p-6 flex-1 flex flex-col">
            <div class="flex items-center gap-2 text-xs text-gray-400 mb-3">
              <span class="flex items-center gap-1"
                >📅 {{ formatDate(article.createdAt) }}</span
              >
              <span>•</span>
              <span class="flex items-center gap-1"
                >✍️ {{ article.penulisName || "Admin" }}</span
              >
            </div>
            <h2
              class="text-xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors line-clamp-2">
              {{ article.judul }}
            </h2>
            <div
              class="text-gray-500 text-sm line-clamp-3 mb-4"
              v-html="stripHtml(article.artikel)"></div>
            <div
              class="mt-auto pt-4 border-t border-gray-50 flex items-center text-red-600 font-bold text-sm group-hover:gap-2 transition-all">
              Baca Selengkapnya <span>→</span>
            </div>
          </div>
        </NuxtLink>
      </div>

      <div
        v-if="articles.length === 0"
        class="text-center py-20 bg-gray-50 rounded-3xl">
        <p class="text-2xl font-bold text-gray-400 mb-2">Belum ada artikel</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Timestamp } from "firebase/firestore";

useHead({
  title: "Artikel & Berita | Yamaha Deta Denpasar",
  meta: [
    {
      name: "description",
      content:
        "Baca artikel terbaru seputar motor Yamaha, tips perawatan, dan info promo.",
    },
  ],
});

const { getArticles } = useArticle();
const articles = ref<any[]>([]);

// Prefetch data on server side would be better, but sticking to client-side pattern used so far
onMounted(async () => {
  articles.value = await getArticles();
});

const formatDate = (timestamp: Timestamp) => {
  if (!timestamp) return "-";
  return new Date(timestamp.toDate()).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const stripHtml = (html: string) => {
  // Basic strip tags for excerpt
  if (!html) return "";
  const tmp = document.createElement("DIV");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
};
</script>
