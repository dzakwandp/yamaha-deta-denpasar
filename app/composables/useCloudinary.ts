export const useCloudinary = () => {
  const isUploading = ref(false);
  const uploadError = ref<string | null>(null);

  const uploadImage = async (file: File): Promise<string> => {
    isUploading.value = true;
    uploadError.value = null;

    try {
      // 1. Get the signature from our secure Nuxt backend
      const signResponse = await fetch("/api/cloudinary/sign");

      if (!signResponse.ok) {
        throw new Error("Failed to get upload signature");
      }

      const { timestamp, signature, apiKey, cloudName } =
        await signResponse.json();

      if (!cloudName || !apiKey || !signature || !timestamp) {
        throw new Error("Cloudinary configuration missing from backend");
      }

      // 2. Upload to Cloudinary with the signature
      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", apiKey);
      formData.append("timestamp", timestamp.toString());
      formData.append("signature", signature);
      // Optional: Add folder if desired, but you must also include it in the signature generation!
      // formData.append("folder", "yamaha");

      const uploadResponse = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        },
      );

      const data = await uploadResponse.json();

      if (!uploadResponse.ok) {
        throw new Error(data.error?.message || "Cloudinary upload failed");
      }

      return data.secure_url;
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
