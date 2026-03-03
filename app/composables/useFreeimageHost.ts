export const useFreeimageHost = () => {
  const config = useRuntimeConfig();
  const isUploading = ref(false);
  const uploadError = ref<string | null>(null);

  const uploadImage = async (file: File): Promise<string> => {
    isUploading.value = true;
    uploadError.value = null;

    try {
      // Convert file to Base64 string
      const base64String = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          // Remove the "data:image/jpeg;base64," prefix for the API
          const result = reader.result as string;
          const base64 = result.split(",")[1] || "";
          resolve(base64);
        };
        reader.onerror = (error) => reject(error);
      });

      const formData = new FormData();
      formData.append("key", config.public.freeimageApiKey as string);
      formData.append("action", "upload");
      formData.append("source", base64String);
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
