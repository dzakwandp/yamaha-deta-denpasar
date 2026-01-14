<template>
  <div>
    <h1 class="text-3xl font-bold text-gray-800 mb-8">Upload Info Promo</h1>
    <PromoForm @submit="handleSubmit" :loading="loading" />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "admin",
});

import Swal from "sweetalert2";

const { createPromo } = usePromo();
const router = useRouter();
const loading = ref(false);

const handleSubmit = async ({ data, files }: { data: any; files: File[] }) => {
  loading.value = true;
  try {
    await createPromo(data, files);
    await Swal.fire({
      title: "Berhasil!",
      text: "Promo berhasil diupload!",
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
    });
    router.push("/dashadmin/promo");
  } catch (e) {
    console.error(e);
    Swal.fire({
      title: "Error!",
      text: "Gagal mengupload promo.",
      icon: "error",
      confirmButtonText: "Ok",
    });
  } finally {
    loading.value = false;
  }
};
</script>
