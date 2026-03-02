export const useImghippo = () => {
  const config = useRuntimeConfig();
  const isUploading = ref(false);
  const uploadError = ref<string | null>(null);

  const uploadImage = async (file: File): Promise<string> => {
    isUploading.value = true;
    uploadError.value = null;

    try {
      const formData = new FormData();
      formData.append("api_key", config.public.imghippoApiKey as string);
      formData.append("file", file);

      const response = await fetch("https://api.imghippo.com/v1/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.message || "Upload failed");
      }

      return data.data.url;
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
