import {
  collection,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

export const useProducts = () => {
  const db = useFirestore();

  // Use useCollection for reactive real-time updates
  const products = useCollection(collection(db, "products"));

  const getProductById = (id: number) => {
    // Since products is reactive, we can just find inside it
    // Note: useCollection returns a Ref<DocumentData[]>
    return products.value.find((p) => parseInt(String(p.id)) === id);
  };

  const createProduct = async (data: any) => {
    const newId = Date.now().toString(); // Simple ID generation
    await setDoc(doc(db, "products", newId), {
      ...data,
      id: parseInt(newId),
      createdAt: new Date().toISOString(),
    });
    return newId;
  };

  const updateProduct = async (id: string, data: any) => {
    await updateDoc(doc(db, "products", id), {
      ...data,
      updatedAt: new Date().toISOString(),
    });
  };

  const deleteProduct = async (id: string) => {
    await deleteDoc(doc(db, "products", id));
  };

  return {
    products,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
  };
};
