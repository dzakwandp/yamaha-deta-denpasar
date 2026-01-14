<template>
  <div>
    <h1 class="text-3xl font-bold text-gray-800 mb-8">Upload Brosur Harga</h1>
    <HargaForm @submit="handleSubmit" :loading="loading" />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "admin",
});

import Swal from "sweetalert2";

const { createHarga } = useHarga();
const router = useRouter();
const loading = ref(false);

const handleSubmit = async ({ data, files }: { data: any; files: File[] }) => {
  loading.value = true;
  try {
    await createHarga(data, files);
    await Swal.fire({
      title: "Berhasil!",
      text: "Brosur berhasil diupload!",
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
    });
    router.push("/dashadmin/harga");
  } catch (e) {
    console.error(e);
    Swal.fire({
      title: "Error!",
      text: "Gagal mengupload brosur.",
      icon: "error",
      confirmButtonText: "Ok",
    });
  } finally {
    loading.value = false;
  }
};
</script>
