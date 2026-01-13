<template>
  <form
    @submit.prevent="save"
    class="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
    <div class="space-y-6">
      <!-- Basic Info -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Nama Produk</label
          >
          <input
            v-model="form.name"
            type="text"
            required
            class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
            placeholder="Contoh: NMAX Neo" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Kategori</label
          >
          <select
            v-model="form.category"
            class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 transition-all">
            <option value="" disabled>Pilih Kategori</option>
            <option v-for="cat in categories" :key="cat.id" :value="cat.name">
              {{ cat.name }}
            </option>
          </select>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Harga OTR (Rp)</label
          >
          <input
            v-model="form.price"
            type="text"
            required
            class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
            placeholder="Contoh: 32.000.000" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Tag (Opsional)</label
          >
          <input
            v-model="form.tag"
            type="text"
            class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
            placeholder="Contoh: NEW, PROMO" />
        </div>
      </div>

      <!-- Featured Checkbox -->
      <div class="flex items-center gap-2">
        <input
          v-model="form.is_featured"
          type="checkbox"
          id="featured"
          class="w-5 h-5 text-red-600 border-gray-300 rounded focus:ring-red-500" />
        <label for="featured" class="text-sm font-medium text-gray-700">
          Produk Unggulan? (Tampilkan di Home Page)
        </label>
      </div>

      <!-- Image Upload -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2"
          >Foto Produk</label
        >

        <!-- Preview -->
        <div
          v-if="form.image"
          class="mb-4 relative w-full aspect-video md:w-64 bg-gray-100 rounded-xl overflow-hidden border border-gray-200 group">
          <img :src="form.image" class="w-full h-full object-cover" />
          <button
            @click="form.image = ''"
            type="button"
            class="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
            🗑️
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
          <span
            v-if="isUploading"
            class="text-sm text-gray-500 animate-pulse whitespace-nowrap"
            >Uploading...</span
          >
        </div>
        <p class="text-xs text-gray-500 mt-2">Format: JPG, PNG. Max 2MB.</p>
      </div>

      <!-- Description -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2"
          >Deskripsi</label
        >
        <textarea
          v-model="form.description"
          rows="4"
          class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
          placeholder="Jelaskan fitur unggulan..."></textarea>
      </div>

      <!-- Specs Builder -->
      <div>
        <div class="flex justify-between items-center mb-4">
          <label class="block text-sm font-medium text-gray-700"
            >Spesifikasi</label
          >
          <button
            type="button"
            @click="addSpec"
            class="text-xs font-bold text-red-600 hover:text-red-700">
            + Tambah Spesifikasi
          </button>
        </div>
        <div class="space-y-3">
          <div
            v-for="(spec, index) in form.specs"
            :key="index"
            class="flex gap-4">
            <input
              v-model="spec.label"
              type="text"
              class="w-1/3 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm"
              placeholder="Label (e.g. Mesin)" />
            <input
              v-model="spec.value"
              type="text"
              class="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm"
              placeholder="Nilai" />
            <button
              type="button"
              @click="removeSpec(index)"
              class="text-gray-400 hover:text-red-600">
              ×
            </button>
          </div>
        </div>
      </div>

      <!-- Submit -->
      <div class="pt-6 border-t border-gray-100 flex justify-end gap-3">
        <NuxtLink
          to="/dashadmin/products"
          class="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-colors">
          Batal
        </NuxtLink>
        <button
          type="submit"
          class="px-6 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="loading || isUploading">
          {{
            loading
              ? "Menyimpan..."
              : isUploading
              ? "Mengupload..."
              : "Simpan Produk"
          }}
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

const config = useRuntimeConfig();
const { categories } = useCategory();
const selectedFile = ref<File | null>(null);
const uploadProgress = ref(0);
const isUploading = ref(false);

const form = ref({
  name: "",
  category: "",
  price: "",
  tag: "",
  image: "",
  description: "",
  specs: [{ label: "Mesin", value: "" }],
  is_featured: false,
});

// Initialize form
watch(
  () => props.initialData,
  (val) => {
    if (val) {
      form.value = {
        ...val,
        specs: val.specs || [{ label: "Mesin", value: "" }],
        is_featured: val.is_featured || false,
      };
    }
  },
  { immediate: true }
);

const handleFileUpload = (event: any) => {
  const file = event.target.files[0];
  if (!file) return;

  selectedFile.value = file;
  form.value.image = URL.createObjectURL(file);
};

const uploadToImgBB = async (file: File) => {
  const formData = new FormData();
  formData.append("image", file);

  const response = await fetch(
    `https://api.imgbb.com/1/upload?key=${config.public.imgbbApiKey}`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await response.json();
  if (!data.success) {
    throw new Error(data.error?.message || "Upload failed");
  }

  return data.data.url;
};

const addSpec = () => {
  form.value.specs.push({ label: "", value: "" });
};

const removeSpec = (index: number) => {
  form.value.specs.splice(index, 1);
};

const save = async () => {
  try {
    if (selectedFile.value) {
      isUploading.value = true;
      const imageUrl = await uploadToImgBB(selectedFile.value);
      form.value.image = imageUrl;
    }
    emit("submit", form.value);
  } catch (e) {
    console.error(e);
    alert("Gagal mengupload gambar: " + (e as any).message);
  } finally {
    isUploading.value = false;
  }
};
</script>
