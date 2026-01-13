import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
  Timestamp,
} from "firebase/firestore";

export interface Jenis {
  id: string;
  name: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export const useJenis = () => {
  const db = useFirestore();

  // Reactive list of jenis
  const jenisList = useCollection(collection(db, "jenis_produk"));

  const getJenis = async (id: string) => {
    const docRef = doc(db, "jenis_produk", id);
    const snapshot = await getDoc(docRef);

    if (snapshot.exists()) {
      return { id: snapshot.id, ...snapshot.data() } as Jenis;
    }
    return null;
  };

  const createJenis = async (
    data: Omit<Jenis, "id" | "createdAt" | "updatedAt">
  ) => {
    const docRef = await addDoc(collection(db, "jenis_produk"), {
      ...data,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });

    return docRef.id;
  };

  const updateJenis = async (
    id: string,
    data: Partial<Omit<Jenis, "id" | "createdAt" | "updatedAt">>
  ) => {
    const docRef = doc(db, "jenis_produk", id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: Timestamp.now(),
    });
  };

  const deleteJenis = async (id: string) => {
    await deleteDoc(doc(db, "jenis_produk", id));
  };

  return {
    jenisList,
    getJenis,
    createJenis,
    updateJenis,
    deleteJenis,
  };
};
