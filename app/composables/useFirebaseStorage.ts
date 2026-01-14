import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

export const useFirebaseStorage = () => {
  const storage = getStorage();

  const uploadFile = async (file: File, path: string): Promise<string> => {
    try {
      // Create a unique filename: timestamp-random-filename
      const uniqueName = `${Date.now()}-${Math.floor(Math.random() * 1000)}-${
        file.name
      }`;
      const fullPath = `${path}/${uniqueName}`;
      const fileRef = storageRef(storage, fullPath);

      const snapshot = await uploadBytes(fileRef, file);
      const url = await getDownloadURL(snapshot.ref);
      return url;
    } catch (e: any) {
      console.error("Upload failed:", e);
      throw new Error("File upload failed");
    }
  };

  const deleteFile = async (url: string) => {
    try {
      // Create a ref from the URL
      const fileRef = storageRef(storage, url);
      await deleteObject(fileRef);
    } catch (e) {
      console.error("Delete failed (might not exist):", e);
    }
  };

  return {
    uploadFile,
    deleteFile,
  };
};
