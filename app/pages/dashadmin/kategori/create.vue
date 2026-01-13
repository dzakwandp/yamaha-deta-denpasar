<template>
  <div>
    <h1 class="text-3xl font-bold text-gray-800 mb-8">Tambah Kategori Baru</h1>
    <CategoryForm @submit="handleCreate" :loading="loading" />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "admin",
});

const { createCategory } = useCategory();
const router = useRouter();
const loading = ref(false);

const handleCreate = async ({ data, file }: { data: any; file: File }) => {
  loading.value = true;
  try {
    await createCategory(data, file);
    alert("Kategori berhasil dibuat!");
    router.push("/dashadmin/kategori");
  } catch (e) {
    console.error(e);
    alert("Gagal membuat kategori");
  } finally {
    loading.value = false;
  }
};
</script>
