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

export interface Harga {
  id: string;
  images: string[];
  description: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export const useHarga = () => {
  const db = useFirestore();
  const { uploadImage } = useImgBB();

  const getHargaList = async () => {
    const q = query(collection(db, "harga"), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      images: doc.data().images || (doc.data().image ? [doc.data().image] : []),
    })) as Harga[];
  };

  const getHarga = async (id: string) => {
    const docRef = doc(db, "harga", id);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      const data = snapshot.data();
      return {
        id: snapshot.id,
        ...data,
        images: data.images || (data.image ? [data.image] : []),
      } as Harga;
    }
    return null;
  };

  const createHarga = async (
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

    await addDoc(collection(db, "harga"), {
      description: data.description,
      images: imageUrls,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
  };

  const updateHarga = async (
    id: string,
    data: { description: string },
    newImageFiles?: File[]
  ) => {
    const docRef = doc(db, "harga", id);
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

  const deleteHarga = async (id: string) => {
    await deleteDoc(doc(db, "harga", id));
  };

  return {
    getHargaList,
    getHarga,
    createHarga,
    updateHarga,
    deleteHarga,
  };
};
