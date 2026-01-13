<template>
  <div>
    <h1 class="text-3xl font-bold text-gray-800 mb-8">Tambah Jenis Baru</h1>

    <div
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
            {{ loading ? "Menyimpan..." : "Simpan" }}
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

const { createJenis } = useJenis();
const router = useRouter();
const loading = ref(false);
const name = ref("");

const handleSubmit = async () => {
  loading.value = true;
  try {
    await createJenis({ name: name.value });
    alert("Berhasil menambahkan jenis produk");
    router.push("/dashadmin/jenis");
  } catch (e) {
    console.error(e);
    alert("Gagal menambahkan data");
  } finally {
    loading.value = false;
  }
};
</script>
