<template>
  <form
    @submit.prevent="submit"
    class="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
    <div class="space-y-6">
      <!-- Photo Upload -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2"
          >Foto Profil</label
        >

        <div class="flex items-center gap-6">
          <div
            v-if="previewUrl"
            class="relative w-32 h-32 bg-gray-100 rounded-full overflow-hidden border border-gray-200 group">
            <img :src="previewUrl" class="w-full h-full object-cover" />
            <button
              @click="removeImage"
              type="button"
              class="absolute inset-0 bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center font-bold">
              Ubah
            </button>
          </div>
          <div
            v-else
            class="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 border border-dash border-gray-300">
            <span>No Photo</span>
          </div>

          <div class="flex-1">
            <label class="block">
              <span class="sr-only">Choose file</span>
              <input
                type="file"
                accept="image/*"
                @change="handleFileChange"
                class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100 cursor-pointer" />
            </label>
            <p class="text-xs text-gray-500 mt-2">Format: JPG, PNG. Max 2MB.</p>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Nama Lengkap</label
          >
          <input
            v-model="form.nama"
            type="text"
            required
            class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
            placeholder="Contoh: Budi Santoso" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Email</label
          >
          <input
            v-model="form.email"
            type="email"
            required
            class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
            placeholder="budi@example.com" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Password</label
          >
          <input
            v-model="form.password"
            type="password"
            :required="!initialData"
            class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
            :placeholder="
              initialData ? 'Kosongkan jika tidak ingin mengubah' : '******'
            " />
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Nomor HP</label
          >
          <input
            v-model="form.nomor_hp"
            type="text"
            required
            class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
            placeholder="08123456789" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Instagram</label
          >
          <input
            v-model="form.instagram"
            type="text"
            class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
            placeholder="@budisantoso" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >TikTok</label
          >
          <input
            v-model="form.tiktok"
            type="text"
            class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
            placeholder="@yamahadetadenpasar" />
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2"
          >Alamat Lengkap</label
        >
        <textarea
          v-model="form.alamat"
          rows="3"
          required
          class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
          placeholder="Jalan Raya Kuta No. 123..."></textarea>
      </div>

      <!-- Actions -->
      <div class="pt-6 border-t border-gray-100 flex justify-end gap-3">
        <NuxtLink
          to="/dashadmin/profil"
          class="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-colors">
          Batal
        </NuxtLink>
        <button
          type="submit"
          class="px-6 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="loading">
          {{ loading ? "Menyimpan..." : "Simpan Profil" }}
        </button>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
const props = defineProps<{
  initialData?: any;
  loading?: boolean;
}>();

const emit = defineEmits(["submit"]);

const form = ref({
  nama: "",
  email: "",
  nomor_hp: "",
  instagram: "",
  alamat: "",
  photo: "",
  password: "",
  tiktok: "",
});

const previewUrl = ref("");
const selectedFile = ref<File | null>(null);

// Sync initial data
watch(
  () => props.initialData,
  (val) => {
    if (val) {
      form.value = { ...val };
      form.value.password = ""; // Reset password to avoid double encoding or overwriting
      if (val.photo) {
        previewUrl.value = val.photo;
      }
    }
  },
  { immediate: true },
);

const handleFileChange = (event: any) => {
  const file = event.target.files[0];
  if (file) {
    selectedFile.value = file;
    previewUrl.value = URL.createObjectURL(file);
  }
};

const removeImage = () => {
  selectedFile.value = null;
  // If editing, we revert to original if available, or just clear.
  // For simplicity, just clearing preview and file, but user might want to keep existing.
  // Actually, better behavior might be just to let them pick a new one.
  // The "Ubah" label on wrapper handles click to pick file if input is hidden, but here input is visible.
};

const submit = () => {
  emit("submit", { data: form.value, file: selectedFile.value });
};
</script>
