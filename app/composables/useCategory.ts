import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
  Timestamp,
} from "firebase/firestore";

export interface Category {
  id: string;
  name: string;
  image: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export const useCategory = () => {
  const db = useFirestore();
  const { uploadImage } = useImgBB();

  // Reactive list of categories
  const categories = useCollection(collection(db, "categories"));

  const getCategory = async (id: string) => {
    const docRef = doc(db, "categories", id);
    const snapshot = await getDoc(docRef);

    if (snapshot.exists()) {
      return { id: snapshot.id, ...snapshot.data() } as Category;
    }
    return null;
  };

  const createCategory = async (
    data: Omit<Category, "id" | "createdAt" | "updatedAt">,
    imageFile?: File
  ) => {
    let imageUrl = data.image || "";

    if (imageFile) {
      imageUrl = await uploadImage(imageFile);
    }

    const docRef = await addDoc(collection(db, "categories"), {
      ...data,
      image: imageUrl,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });

    return docRef.id;
  };

  const updateCategory = async (
    id: string,
    data: Partial<Omit<Category, "id" | "createdAt" | "updatedAt">>,
    imageFile?: File
  ) => {
    const docRef = doc(db, "categories", id);
    let updateData: any = {
      ...data,
      updatedAt: Timestamp.now(),
    };

    if (imageFile) {
      const imageUrl = await uploadImage(imageFile);
      updateData.image = imageUrl;
    }

    await updateDoc(docRef, updateData);
  };

  const deleteCategory = async (id: string) => {
    await deleteDoc(doc(db, "categories", id));
  };

  return {
    categories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory,
  };
};
