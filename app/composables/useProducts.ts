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

  const duplicateProduct = async (product: any) => {
    const newId = Date.now().toString();
    const newProduct = {
      ...product,
      id: parseInt(newId),
      name: `${product.name} (Copy)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Explicitly delete/overwrite the old ID from the spread object if it exists there as a string prop accidentally,
    // although we overwrote it above.
    // Also ensuring no sharing of reference types if needed, but shallow copy ...product is usually fine for Firestore unless nested arrays like specs/colors needed deep clone.
    // Specs and colors are arrays/objects. We should deep clone them to be safe.

    // Deep clone helper
    const deepClone = (obj: any) => JSON.parse(JSON.stringify(obj));

    if (newProduct.specs) newProduct.specs = deepClone(newProduct.specs);
    if (newProduct.colors) newProduct.colors = deepClone(newProduct.colors);

    await setDoc(doc(db, "products", newId), newProduct);
    return newId;
  };

  return {
    products,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    duplicateProduct,
  };
};
