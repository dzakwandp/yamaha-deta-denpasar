import { collection } from "firebase/firestore";

export const useProducts = () => {
  const db = useFirestore();

  // Use useCollection for reactive real-time updates
  const products = useCollection(collection(db, "products"));

  const getProductById = (id: number) => {
    // Since products is reactive, we can just find inside it
    // Note: useCollection returns a Ref<DocumentData[]>
    return products.value.find((p) => parseInt(String(p.id)) === id);
  };

  return {
    products,
    getProductById,
  };
};
