<template>
  <div class="max-w-2xl mx-auto">
    <div class="flex items-center gap-4 mb-8">
      <NuxtLink
        to="/dashadmin/banners"
        class="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-gray-600">
        ←
      </NuxtLink>
      <h1 class="text-3xl font-bold text-gray-800">Tambah Banner</h1>
    </div>

    <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Image Upload -->
        <div>
          <label class="block text-sm font-bold text-gray-700 mb-2">
            Gambar Banner
          </label>
          <div
            class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl hover:border-red-500 transition-colors cursor-pointer"
            @click="$refs.fileInput.click()"
            @dragover.prevent
            @drop.prevent="handleDrop">
            <div class="space-y-1 text-center">
              <div v-if="previewUrl" class="mb-4">
                <img
                  :src="previewUrl"
                  class="mx-auto h-48 object-cover rounded-lg" />
              </div>
              <div v-else class="flex flex-col items-center">
                <svg
                  class="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48">
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round" />
                </svg>
                <div class="flex text-sm text-gray-600 mt-2">
                  <span
                    class="relative cursor-pointer bg-white rounded-md font-medium text-red-600 hover:text-red-500">
                    Upload gambar
                  </span>
                  <p class="pl-1">atau drag and drop</p>
                </div>
                <p class="text-xs text-gray-500">PNG, JPG up to 5MB</p>
              </div>
            </div>
            <input
              ref="fileInput"
              type="file"
              class="hidden"
              accept="image/*"
              @change="handleFileChange" />
          </div>
        </div>

        <!-- Submit Button -->
        <div class="pt-4">
          <button
            type="submit"
            :disabled="isUploading || !selectedFile"
            class="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all">
            <span v-if="isUploading">Mengupload...</span>
            <span v-else>Simpan Banner</span>
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

const { addBanner, isUploading } = useBanners();
const router = useRouter();

const fileInput = ref<HTMLInputElement | null>(null);
const selectedFile = ref<File | null>(null);
const previewUrl = ref<string | null>(null);

const handleFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    processFile(input.files[0]);
  }
};

const handleDrop = (event: DragEvent) => {
  if (event.dataTransfer?.files && event.dataTransfer.files[0]) {
    processFile(event.dataTransfer.files[0]);
  }
};

const processFile = (file: File) => {
  if (!file.type.startsWith("image/")) {
    alert("Mohon upload file gambar");
    return;
  }
  selectedFile.value = file;
  previewUrl.value = URL.createObjectURL(file);
};

const handleSubmit = async () => {
  if (!selectedFile.value) return;

  try {
    await addBanner(selectedFile.value);
    router.push("/dashadmin/banners");
  } catch (e) {
    alert("Gagal menyimpan banner");
    console.error(e);
  }
};
</script>
