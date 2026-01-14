<template>
  <div>
    <h1 class="text-3xl font-bold text-gray-800 mb-8">Tambah Profil Baru</h1>
    <ProfileForm @submit="handleSubmit" :loading="loading" />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "admin",
});

import Swal from "sweetalert2";

const { createProfile } = useProfile();
const router = useRouter();
const loading = ref(false);

const handleSubmit = async (data: any) => {
  loading.value = true;
  try {
    await createProfile(data);
    await Swal.fire({
      title: "Berhasil!",
      text: "Profil berhasil dibuat!",
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
    });
    router.push("/dashadmin/profil");
  } catch (e) {
    console.error(e);
    Swal.fire({
      title: "Error!",
      text: "Gagal membuat profil.",
      icon: "error",
    });
  } finally {
    loading.value = false;
  }
};
</script>
