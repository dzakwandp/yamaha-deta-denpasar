<template>
  <div class="bg-white min-h-screen pb-20">
    <!-- Hero Image -->
    <div v-if="article" class="w-full h-[400px] md:h-[500px] relative">
      <img
        :src="article.picture"
        class="w-full h-full object-cover"
        :alt="article.judul" />
      <div
        class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
      <div class="absolute bottom-0 left-0 w-full p-8 md:p-12">
        <div class="container mx-auto max-w-4xl">
          <div class="flex items-center gap-4 text-white/80 text-sm mb-4">
            <span
              class="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold"
              >ARTIKEL</span
            >
            <span>📅 {{ formatDate(article.createdAt) }}</span>
            <span>✍️ {{ article.penulisName || "Admin" }}</span>
          </div>
          <h1
            class="text-3xl md:text-5xl font-extrabold text-white leading-tight">
            {{ article.judul }}
          </h1>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div v-if="article" class="container mx-auto px-4 max-w-4xl mt-12">
      <!-- Breadcrumb -->
      <NuxtLink
        to="/artikel"
        class="inline-flex items-center gap-2 text-gray-500 hover:text-red-600 mb-8 font-medium">
        ← Kembali ke Artikel
      </NuxtLink>

      <div class="prose prose-lg prose-red max-w-none">
        <div v-html="article.artikel"></div>
      </div>

      <!-- Share / Footer -->
      <div class="mt-12 pt-8 border-t border-gray-100">
        <p class="text-gray-500 italic">
          Ditulis oleh
          <span class="font-bold text-gray-900">{{ article.penulisName }}</span>
        </p>
      </div>
    </div>

    <!-- Loading / Not Found -->
    <div v-else class="min-h-screen flex items-center justify-center">
      <div v-if="loading" class="animate-pulse flex flex-col items-center">
        <div class="h-4 bg-gray-200 rounded w-48 mb-4"></div>
        <p class="text-gray-400">Memuat artikel...</p>
      </div>
      <div v-else class="text-center">
        <h2 class="text-2xl font-bold text-gray-800 mb-2">
          Artikel Tidak Ditemukan
        </h2>
        <NuxtLink to="/artikel" class="text-red-600 hover:underline"
          >Kembali ke Daftar</NuxtLink
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Timestamp } from "firebase/firestore";

const route = useRoute();
const { getArticle } = useArticle();
const article = ref<any>(null);
const loading = ref(true);

const articleSlug = route.params.slug as string;

// Fetch data
onMounted(async () => {
  try {
    // Extract ID from slug param (format: id-slug)
    const id = articleSlug.split("-")[0];
    if (!id) throw new Error("Invalid article URL");

    article.value = await getArticle(id);
    console.log("Fetched article:", article.value); // Debug log
  } catch (e) {
    console.error(e);
  } finally {
    loading.value = false;
  }
});

useSeoMeta({
  title: () =>
    article.value
      ? `${article.value.judul} | Yamaha Deta Denpasar`
      : "Artikel Yamaha Deta Denpasar",
  ogTitle: () =>
    article.value
      ? `${article.value.judul} | Yamaha Deta Denpasar`
      : "Artikel Yamaha Deta Denpasar",
  description: () =>
    article.value
      ? `Baca artikel ${article.value.judul} di Yamaha Deta Denpasar. ${
          article.value.artikel.substring(0, 150).replace(/<[^>]*>?/gm, "") +
          "..."
        }`
      : "Berita dan Tips terbaru seputar motor Yamaha.",
  ogDescription: () =>
    article.value
      ? `Baca artikel ${article.value.judul} di Yamaha Deta Denpasar. ${
          article.value.artikel.substring(0, 150).replace(/<[^>]*>?/gm, "") +
          "..."
        }`
      : "Berita dan Tips terbaru seputar motor Yamaha.",
  ogImage: () => article.value?.picture,
  twitterCard: "summary_large_image",
});

useSchemaOrg([
  defineArticle({
    headline: () => article.value?.judul,
    image: () => article.value?.picture,
    datePublished: () =>
      article.value?.createdAt
        ? new Date(article.value.createdAt.toDate()).toISOString()
        : undefined,
    dateModified: () =>
      article.value?.updatedAt
        ? new Date(article.value.updatedAt.toDate()).toISOString()
        : undefined,
    author: [
      {
        name: () => article.value?.penulisName || "Admin",
      },
    ],
  }),
]);

const formatDate = (timestamp: Timestamp) => {
  if (!timestamp) return "-";
  return new Date(timestamp.toDate()).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};
</script>

<style>
/* Safe quill styles for public view */
.prose img {
  border-radius: 0.75rem;
  box-shadow:
    0 4px 6px -1px rgb(0 0 0 / 0.1),
    0 2px 4px -2px rgb(0 0 0 / 0.1);
}
.prose h1,
.prose h2,
.prose h3 {
  color: #111827;
  font-weight: 800;
}
</style>
