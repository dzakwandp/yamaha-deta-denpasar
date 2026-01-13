import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  Timestamp,
  orderBy,
  query,
} from "firebase/firestore";

export interface Banner {
  id?: string;
  image: string;
  createdAt: Timestamp;
}

export const useBanners = () => {
  const db = useFirestore();
  const { uploadImage, isUploading } = useImgBB();

  // Reactive collection ordered by createdAt desc
  const banners = useCollection<Banner>(
    query(collection(db, "banners"), orderBy("createdAt", "desc"))
  );

  const addBanner = async (file: File) => {
    const imageUrl = await uploadImage(file);

    const bannerData = {
      image: imageUrl,
      createdAt: Timestamp.now(),
    };

    await addDoc(collection(db, "banners"), bannerData);
  };

  const deleteBanner = async (id: string) => {
    const docRef = doc(db, "banners", id);
    await deleteDoc(docRef);
  };

  return {
    banners,
    addBanner,
    deleteBanner,
    isUploading,
  };
};
