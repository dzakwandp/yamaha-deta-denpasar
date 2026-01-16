import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
  Timestamp,
} from "firebase/firestore";

export interface Profile {
  id?: string;
  nama: string;
  photo: string;
  alamat: string;
  nomor_hp: string;
  instagram: string;
  email: string;
  password?: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export const useProfile = () => {
  const db = useFirestore();
  const { uploadImage, isUploading: isImageUploading } = useImgBB();

  // Reactive collection
  const profiles = useCollection<Profile>(collection(db, "profiles"));

  const getProfiles = () => {
    return profiles;
  };

  const getProfile = async (id: string) => {
    const docRef = doc(db, "profiles", id);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      return { id: snapshot.id, ...snapshot.data() } as Profile;
    }
    throw new Error("Profile not found");
  };

  const createProfile = async (
    data: Omit<Profile, "id" | "photo" | "createdAt" | "updatedAt">,
    imageFile?: File
  ) => {
    let photoUrl = "";
    if (imageFile) {
      photoUrl = await uploadImage(imageFile);
    }

    const profileData = {
      ...data,
      photo: photoUrl,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    };

    if (data.password) {
      profileData.password = btoa(data.password);
    }

    const docRef = await addDoc(collection(db, "profiles"), profileData);

    return docRef.id;
  };

  const updateProfile = async (
    id: string,
    data: Partial<Omit<Profile, "id" | "createdAt" | "updatedAt">>,
    imageFile?: File
  ) => {
    // Exclude password from initial spread to prevent overwriting with logic below
    const { password, ...otherData } = data;
    let updateData: any = {
      ...otherData,
      updatedAt: Timestamp.now(),
    };

    if (password && password.trim() !== "") {
      updateData.password = btoa(password);
    }

    if (imageFile) {
      const photoUrl = await uploadImage(imageFile);
      updateData.photo = photoUrl;
    }

    const docRef = doc(db, "profiles", id);
    await updateDoc(docRef, updateData);
  };

  const deleteProfile = async (id: string) => {
    const docRef = doc(db, "profiles", id);
    await deleteDoc(docRef);
  };

  return {
    profiles,
    getProfiles,
    getProfile,
    createProfile,
    updateProfile,
    deleteProfile,
    isImageUploading,
  };
};
