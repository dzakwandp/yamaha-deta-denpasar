<template>
  <div>
    <h1 class="text-3xl font-bold text-gray-800 mb-8">Tulis Artikel Baru</h1>
    <ArticleForm @submit="handleCreate" :loading="loading" />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "admin",
});

const { createArticle } = useArticle();
const router = useRouter();
const loading = ref(false);

const handleCreate = async ({ data, file }: { data: any; file: File }) => {
  loading.value = true;
  try {
    await createArticle(data, file);
    alert("Artikel berhasil diterbitkan!");
    router.push("/dashadmin/artikel");
  } catch (e) {
    console.error(e);
    alert("Gagal membuat artikel");
  } finally {
    loading.value = false;
  }
};
</script>
