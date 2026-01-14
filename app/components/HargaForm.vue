<template>
  <form
    @submit.prevent="submit"
    class="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
    <div class="space-y-6">
      <!-- Media Upload -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          File Brosur
        </label>

        <!-- Preview Grid -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <!-- Render existing or new attachments -->
          <div
            v-for="(att, index) in attachments"
            :key="index"
            class="relative aspect-[4/5] bg-gray-100 rounded-xl overflow-hidden border border-gray-200 group flex flex-col items-center justify-center p-3">
            <!-- File Name Preview -->
            <div class="text-4xl mb-3">📄</div>
            <p
              class="text-xs text-center font-medium text-gray-600 break-words w-full px-2 line-clamp-3">
              {{ att.name || "File Upload" }}
            </p>

            <!-- Remove Button -->
            <button
              @click="removeAttachment(index)"
              type="button"
              class="absolute top-2 right-2 p-1.5 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-20 hover:scale-110">
              ×
            </button>
          </div>

          <!-- Upload Button -->
          <label
            class="flex flex-col items-center justify-center aspect-[4/5] bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors">
            <span class="text-3xl text-gray-400">+</span>
            <span class="text-xs text-gray-500 mt-2 font-medium"
              >Tambah Foto</span
            >
            <span class="text-[10px] text-gray-400">JPG, PNG, PDF</span>
            <input
              type="file"
              multiple
              accept="image/*,application/pdf"
              @change="handleFileUpload"
              class="hidden" />
          </label>
        </div>
      </div>

      <!-- Description -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2"
          >Deskripsi Singkat</label
        >
        <textarea
          v-model="form.description"
          rows="3"
          class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
          placeholder="Keterangan harga..."></textarea>
      </div>

      <!-- Submit -->
      <div class="pt-6 border-t border-gray-100 flex justify-end gap-3 mt-8">
        <NuxtLink
          to="/dashadmin/harga"
          class="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-colors">
          Batal
        </NuxtLink>
        <button
          type="submit"
          class="px-6 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-black transition-colors disabled:opacity-50"
          :disabled="loading || attachments.length === 0">
          {{ loading ? "Menyimpan..." : "Simpan" }}
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

// Robust attachment tracking
interface Attachment {
  file?: File; // Present if new upload
  url: string; // Present for all (blobs for new, urls for existing)
  name?: string;
}

const attachments = ref<Attachment[]>([]);
const form = ref({
  description: "",
});

// Initialize form
watch(
  () => props.initialData,
  (val) => {
    if (val) {
      form.value.description = val.description || "";

      const existingImages = val.images || (val.image ? [val.image] : []);
      attachments.value = existingImages.map((url: string) => {
        const name = url.split("/").pop() || "Existing File";
        return {
          url,
          name,
        };
      });
    }
  },
  { immediate: true }
);

const handleFileUpload = (event: any) => {
  const files = Array.from(event.target.files) as File[];
  if (!files.length) return;

  // Add new files to attachments
  files.forEach((file) => {
    attachments.value.push({
      file: file,
      url: URL.createObjectURL(file),
      name: file.name,
    });
  });

  // Clear input so same file can be selected again if needed
  event.target.value = "";
};

const removeAttachment = (index: number) => {
  // Revoke URL if it was a blob to avoid memory leaks
  if (attachments.value[index].file) {
    URL.revokeObjectURL(attachments.value[index].url);
  }
  attachments.value.splice(index, 1);
};

const submit = () => {
  if (attachments.value.length === 0) {
    alert("Mohon pilih minimal satu file");
    return;
  }

  // Filter out only the NEW files to upload
  const filesToUpload = attachments.value
    .filter((a) => a.file !== undefined)
    .map((a) => a.file as File);

  emit("submit", { data: form.value, files: filesToUpload });
};
</script>
