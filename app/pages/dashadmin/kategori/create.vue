<template>
  <div>
    <h1 class="text-3xl font-bold text-gray-800 mb-8">Tambah Kategori Baru</h1>
    <CategoryForm @submit="handleSubmit" :loading="loading" />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "admin",
});

const { createCategory } = useCategory();
const router = useRouter();
const loading = ref(false);
import Swal from "sweetalert2";

const handleSubmit = async (data: any) => {
  loading.value = true;
  try {
    await createCategory(data);
    await Swal.fire({
      title: "Berhasil!",
      text: "Kategori berhasil dibuat!",
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
    });
    router.push("/dashadmin/kategori");
  } catch (e) {
    console.error(e);
    Swal.fire({
      title: "Error!",
      text: "Gagal membuat kategori.",
      icon: "error",
    });
  } finally {
    loading.value = false;
  }
};
</script>
