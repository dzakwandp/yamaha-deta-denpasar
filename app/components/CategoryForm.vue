<template>
  <form
    @submit.prevent="submit"
    class="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
    <div class="space-y-6">
      <!-- Name -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2"
          >Nama Kategori</label
        >
        <input
          v-model="form.name"
          type="text"
          required
          class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
          placeholder="Contoh: MAXi" />
      </div>

      <!-- Image Upload -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2"
          >Foto Kategori</label
        >

        <!-- Preview -->
        <div
          v-if="form.image"
          class="mb-4 relative w-32 h-32 bg-gray-100 rounded-xl overflow-hidden border border-gray-200 group">
          <img :src="form.image" class="w-full h-full object-cover" />
          <button
            @click="form.image = ''"
            type="button"
            class="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
            ❌
          </button>
        </div>

        <div class="flex items-center gap-4">
          <label class="block w-full">
            <span class="sr-only">Choose file</span>
            <input
              type="file"
              accept="image/*"
              @change="handleFileUpload"
              class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100 cursor-pointer" />
          </label>
        </div>
        <p class="text-xs text-gray-500 mt-2">Format: JPG, PNG. Max 2MB.</p>
      </div>

      <!-- Submit -->
      <div class="pt-6 border-t border-gray-100 flex justify-end gap-3">
        <NuxtLink
          to="/dashadmin/categories"
          class="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-colors">
          Batal
        </NuxtLink>
        <button
          type="submit"
          class="px-6 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-black transition-colors disabled:opacity-50"
          :disabled="loading">
          {{ loading ? "Menyimpan..." : "Simpan Kategori" }}
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

const selectedFile = ref<File | null>(null);

const form = ref({
  name: "",
  image: "",
});

// Initialize form
watch(
  () => props.initialData,
  (val) => {
    if (val) {
      form.value = { ...val };
    }
  },
  { immediate: true }
);

const handleFileUpload = (event: any) => {
  const file = event.target.files[0];
  if (!file) return;

  selectedFile.value = file;
  // Create local preview
  form.value.image = URL.createObjectURL(file);
};

const submit = () => {
  emit("submit", { data: form.value, file: selectedFile.value });
};
</script>
