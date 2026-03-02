export const compressImageToWebP = async (
  file: File,
  quality = 0.8,
): Promise<File> => {
  if (!file.type.match(/image\/(jpeg|png|webp)/)) {
    return file;
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (!ctx) {
          reject(new Error("Failed to get canvas context"));
          return;
        }

        canvas.width = img.width;
        canvas.height = img.height;

        ctx.drawImage(img, 0, 0, img.width, img.height);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const newFileName = file.name.replace(/\.[^/.]+$/, "") + ".webp";
              const newFile = new File([blob], newFileName, {
                type: "image/webp",
                lastModified: Date.now(),
              });
              resolve(newFile);
            } else {
              reject(new Error("Canvas to Blob conversion failed"));
            }
          },
          "image/webp",
          quality,
        );
      };

      img.onerror = (error) => {
        reject(error);
      };
    };

    reader.onerror = (error) => {
      reject(error);
    };
  });
};
