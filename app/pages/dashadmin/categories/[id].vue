<template>
  <div>
    <h1 class="text-3xl font-bold text-gray-800 mb-8">Edit Kategori</h1>
    <CategoryForm
      v-if="category"
      :initial-data="category"
      @submit="handleUpdate"
      :loading="loading" />
    <div v-else class="text-center py-12 text-gray-500">Memuat data...</div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "admin",
});

const route = useRoute();
const router = useRouter();
const { getCategory, updateCategory } = useCategory();

const categoryId = route.params.id as string;
const category = ref<any>(null);
const loading = ref(false);

onMounted(async () => {
  category.value = await getCategory(categoryId);
});

const handleUpdate = async ({ data, file }: { data: any; file: File }) => {
  loading.value = true;
  try {
    await updateCategory(categoryId, data, file);
    alert("Kategori berhasil diupdate!");
    router.push("/dashadmin/categories");
  } catch (e) {
    console.error(e);
    alert("Gagal mengupdate kategori");
  } finally {
    loading.value = false;
  }
};
</script>
