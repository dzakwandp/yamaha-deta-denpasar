import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  getDocs,
  Timestamp,
  query,
  orderBy,
  updateDoc,
  getDoc,
} from "firebase/firestore";

export interface Promo {
  id: string;
  images: string[];
  description: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export const usePromo = () => {
  const db = useFirestore();
  const { uploadImage } = useImgBB();

  const getPromoList = async () => {
    const q = query(collection(db, "promo"), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      images: doc.data().images || (doc.data().image ? [doc.data().image] : []),
    })) as Promo[];
  };

  const getPromo = async (id: string) => {
    const docRef = doc(db, "promo", id);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      const data = snapshot.data();
      return {
        id: snapshot.id,
        ...data,
        images: data.images || (data.image ? [data.image] : []),
      } as Promo;
    }
    return null;
  };

  const createPromo = async (
    data: { description: string },
    imageFiles: File[]
  ) => {
    const imageUrls: string[] = [];

    // Upload all images
    for (const file of imageFiles) {
      try {
        const url = await uploadImage(file);
        imageUrls.push(url);
      } catch (e) {
        console.error("Failed to upload file", e);
      }
    }

    await addDoc(collection(db, "promo"), {
      description: data.description,
      images: imageUrls,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
  };

  const updatePromo = async (
    id: string,
    data: { description: string },
    newImageFiles?: File[]
  ) => {
    const docRef = doc(db, "promo", id);
    const updateData: any = {
      description: data.description,
      updatedAt: Timestamp.now(),
    };

    if (newImageFiles && newImageFiles.length > 0) {
      const currentDoc = await getDoc(docRef);
      const currentImages = currentDoc.data()?.images || [];

      const newUrls: string[] = [];
      for (const file of newImageFiles) {
        const url = await uploadImage(file);
        newUrls.push(url);
      }

      updateData.images = [...currentImages, ...newUrls];
    }

    await updateDoc(docRef, updateData);
  };

  const deletePromo = async (id: string) => {
    await deleteDoc(doc(db, "promo", id));
  };

  return {
    getPromoList,
    getPromo,
    createPromo,
    updatePromo,
    deletePromo,
  };
};
