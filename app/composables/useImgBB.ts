export const useImgBB = () => {
  const config = useRuntimeConfig();
  const isUploading = ref(false);
  const uploadError = ref<string | null>(null);

  const uploadImage = async (file: File): Promise<string> => {
    isUploading.value = true;
    uploadError.value = null;

    try {
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
