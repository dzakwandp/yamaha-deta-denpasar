<template>
  <div>
    <h1 class="text-3xl font-bold text-gray-800 mb-8">Tambah Profil Baru</h1>
    <ProfileForm @submit="handleCreate" :loading="loading" />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "admin",
});

const { createProfile } = useProfile();
const router = useRouter();
const loading = ref(false);

const handleCreate = async ({ data, file }: { data: any; file: File }) => {
  loading.value = true;
  try {
    await createProfile(data, file);
    alert("Profil berhasil dibuat!");
    router.push("/dashadmin/profiles");
  } catch (e) {
    console.error(e);
    alert("Gagal membuat profil");
  } finally {
    loading.value = false;
  }
};
</script>
