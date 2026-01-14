<template>
  <div>
    <h1 class="text-3xl font-bold text-gray-800 mb-8">Edit Profil</h1>
    <ProfileForm
      v-if="profile"
      :initial-data="profile"
      @submit="handleUpdate"
      :loading="loading" />
    <div v-else class="text-center py-12 text-gray-500">Loading...</div>
  </div>
</template>

<script setup lang="ts">
import { type Profile } from "~/composables/useProfile";
import Swal from "sweetalert2";

definePageMeta({
  layout: "admin",
});

const route = useRoute();
const router = useRouter();
const { getProfile, updateProfile } = useProfile();

const loading = ref(false);
const profile = ref<Profile | null>(null);
const id = route.params.id as string;

onMounted(async () => {
  try {
    profile.value = await getProfile(id);
  } catch (e) {
    console.error(e);
    await Swal.fire({
      title: "Error!",
      text: "Profil tidak ditemukan.",
      icon: "error",
    });
    router.push("/dashadmin/profil");
  }
});

const handleUpdate = async ({ data, file }: { data: any; file: File }) => {
  loading.value = true;
  try {
    await updateProfile(id, data, file);
    await Swal.fire({
      title: "Berhasil!",
      text: "Profil berhasil diperbarui!",
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
    });
    router.push("/dashadmin/profil");
  } catch (e) {
    console.error(e);
    Swal.fire({
      title: "Error!",
      text: "Gagal memperbarui profil.",
      icon: "error",
    });
  } finally {
    loading.value = false;
  }
};
</script>
