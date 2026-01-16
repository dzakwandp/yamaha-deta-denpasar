<template>
  <div>
    <h1 class="text-3xl font-bold text-gray-800 mb-8">Edit Kategori</h1>
    <CategoryForm
      v-if="category"
      :initial-data="category"
      @submit="handleSubmit"
      :loading="loading" />
    <div v-else class="text-center py-12 text-gray-500">Memuat data...</div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "admin",
});

import Swal from "sweetalert2";

const route = useRoute();
const router = useRouter();
const { getCategory, updateCategory } = useCategory();

const categoryId = route.params.id as string;
const category = ref<any>(null);
const loading = ref(false);

onMounted(async () => {
  category.value = await getCategory(categoryId);
});

const handleSubmit = async ({ data, file }: { data: any; file: any }) => {
  loading.value = true;
  try {
    await updateCategory(categoryId, data, file);
    await Swal.fire({
      title: "Berhasil!",
      text: "Kategori berhasil diupdate!",
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
    });
    router.push("/dashadmin/kategori");
  } catch (e) {
    console.error(e);
    Swal.fire({
      title: "Error!",
      text: "Gagal mengupdate kategori.",
      icon: "error",
    });
  } finally {
    loading.value = false;
  }
};
</script>
