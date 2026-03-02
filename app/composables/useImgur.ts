export const useImgur = () => {
  const config = useRuntimeConfig();
  const isUploading = ref(false);
  const uploadError = ref<string | null>(null);

  const uploadImage = async (file: File): Promise<string> => {
    isUploading.value = true;
    uploadError.value = null;

    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch("https://api.imgur.com/3/image", {
        method: "POST",
        headers: {
          Authorization: `Client-ID ${config.public.imgurClientId}`,
        },
        body: formData,
      });

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.data?.error || "Upload failed");
      }

      return data.data.link;
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
