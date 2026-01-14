<template>
  <div>
    <h1 class="text-3xl font-bold text-gray-800 mb-8">Edit Artikel</h1>
    <ArticleForm
      v-if="article"
      :initial-data="article"
      @submit="handleUpdate"
      :loading="loading" />
    <div v-else class="text-center py-12 text-gray-500">Memuat artikel...</div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "admin",
});

const route = useRoute();
const router = useRouter();
const { getArticle, updateArticle } = useArticle();

const articleId = route.params.id as string;
const article = ref<any>(null);
const loading = ref(false);

onMounted(async () => {
  article.value = await getArticle(articleId);
});

const handleSubmit = async ({
  data,
  file,
}: {
  data: any;
  file: File | null;
}) => {
  loading.value = true;
  try {
    await updateArticle(articleId, data, file);
    await Swal.fire({
      title: "Berhasil!",
      text: "Artikel berhasil diupdate!",
      icon: "success",
      timer: 2000,
      showConfirmButton: false,
    });
    router.push("/dashadmin/artikel");
  } catch (e) {
    console.error(e);
    Swal.fire({
      title: "Error!",
      text: "Gagal mengupdate artikel.",
      icon: "error",
    });
  } finally {
    loading.value = false;
  }
};
</script>
