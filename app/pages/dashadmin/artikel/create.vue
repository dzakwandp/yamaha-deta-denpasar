<template>
  <div>
    <h1 class="text-3xl font-bold text-gray-800 mb-8">Tulis Artikel Baru</h1>
    <ArticleForm @submit="handleSubmit" :loading="loading" />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "admin",
});

const { createArticle } = useArticle();
const router = useRouter();
const loading = ref(false);

const handleSubmit = async ({ data, file }: { data: any; file: File }) => {
  loading.value = true;
  try {
    await createArticle(data, file);
    await Swal.fire({
      title: "Berhasil!",
      text: "Artikel berhasil diterbitkan!",
      icon: "success",
      timer: 2000,
      showConfirmButton: false,
    });
    router.push("/dashadmin/artikel");
  } catch (e) {
    console.error(e);
    Swal.fire({
      title: "Error!",
      text: "Gagal membuat artikel.",
      icon: "error",
    });
  } finally {
    loading.value = false;
  }
};
</script>
