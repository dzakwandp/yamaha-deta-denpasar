export const useFreeimageHost = () => {
  const config = useRuntimeConfig();
  const isUploading = ref(false);
  const uploadError = ref<string | null>(null);

  const uploadImage = async (file: File): Promise<string> => {
    isUploading.value = true;
    uploadError.value = null;

    try {
      const formData = new FormData();
      formData.append("key", config.public.freeimageApiKey as string);
      formData.append("action", "upload");
      formData.append("source", file);
      formData.append("format", "json");

      const response = await fetch("https://freeimage.host/api/1/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.status_code !== 200) {
        throw new Error(data.error?.message || "Upload failed");
      }

      return data.image.url;
    } catch (e: any) {
      uploadError.value = e.message;
      throw e;
    } finally {
      isUploading.value = false;
    }
  };

  return {
    uploadImage,
    isUploading,
    uploadError,
  };
};
