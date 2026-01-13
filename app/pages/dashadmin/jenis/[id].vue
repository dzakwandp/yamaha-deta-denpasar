<template>
  <div>
    <h1 class="text-3xl font-bold text-gray-800 mb-8">Edit Jenis Produk</h1>

    <div v-if="loadingData" class="text-center py-10">Memuat data...</div>

    <div
      v-else
      class="max-w-xl bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
      <form @submit.prevent="handleSubmit">
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Nama Jenis</label
          >
          <input
            v-model="name"
            type="text"
            required
            class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
            placeholder="Contoh: Matic, Sport, Moped" />
        </div>

        <div class="flex justify-end gap-3">
          <NuxtLink
            to="/dashadmin/jenis"
            class="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-colors">
            Batal
          </NuxtLink>
          <button
            type="submit"
            :disabled="loading"
            class="px-6 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            {{ loading ? "Menyimpan..." : "Simpan Perubahan" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "admin",
});

const route = useRoute();
const router = useRouter();
const { getJenis, updateJenis } = useJenis();

const loading = ref(false);
const loadingData = ref(true);
const name = ref("");
const jenisId = route.params.id as string;

onMounted(async () => {
  try {
    const data = await getJenis(jenisId);
    if (data) {
      name.value = data.name;
    } else {
      alert("Data tidak ditemukan");
      router.push("/dashadmin/jenis");
    }
  } catch (e) {
    console.error(e);
    alert("Gagal memuat data");
  } finally {
    loadingData.value = false;
  }
});

const handleSubmit = async () => {
  loading.value = true;
  try {
    await updateJenis(jenisId, { name: name.value });
    alert("Berhasil memperbarui jenis produk");
    router.push("/dashadmin/jenis");
  } catch (e) {
    console.error(e);
    alert("Gagal memperbarui data");
  } finally {
    loading.value = false;
  }
};
</script>
