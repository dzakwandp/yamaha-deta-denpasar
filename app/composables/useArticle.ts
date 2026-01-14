import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  Timestamp,
  query,
  where,
  orderBy,
  documentId,
  setDoc,
} from "firebase/firestore";

export interface Article {
  id: string;
  judul: string;
  slug: string; // New field
  picture: string;
  artikel: string;
  penulis: string; // User ID
  penulisName?: string; // Resolved name
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export const useArticle = () => {
  const db = useFirestore();
  const { uploadImage } = useImgBB();
  const { getProfile } = useProfile();

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const getArticles = async () => {
    const q = query(collection(db, "articles"), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);

    const articles: Article[] = [];

    // Process in parallel for author resolution
    await Promise.all(
      snapshot.docs.map(async (docSnap) => {
        const data = docSnap.data() as Article;
        let authorName = "Unknown";

        if (data.penulis) {
          try {
            const profile = await getProfile(data.penulis);
            if (profile) {
              authorName = profile.nama;
            }
          } catch (e) {
            console.error("Error fetching author for article " + docSnap.id, e);
          }
        }

        articles.push({
          id: docSnap.id,
          ...data,
          penulisName: authorName,
        });
      })
    );

    // Sort again
    return articles.sort((a, b) => {
      const timeA = a.createdAt?.toMillis() || 0;
      const timeB = b.createdAt?.toMillis() || 0;
      return timeB - timeA;
    });
  };

  const getArticle = async (id: string) => {
    const docRef = doc(db, "articles", id);
    const snapshot = await getDoc(docRef);

    if (snapshot.exists()) {
      const data = snapshot.data() as Article;
      let authorName = "Unknown";
      if (data.penulis) {
        const profile = await getProfile(data.penulis);
        if (profile) authorName = profile.nama;
      }
      return { id: snapshot.id, ...data, penulisName: authorName };
    }
    return null;
  };

  const createArticle = async (
    data: Omit<
      Article,
      "id" | "createdAt" | "updatedAt" | "penulisName" | "slug"
    >,
    imageFile?: File
  ) => {
    let imageUrl = data.picture || "";

    if (imageFile) {
      imageUrl = await uploadImage(imageFile);
    }

    const authStore = useAuthStore();
    const currentUser = authStore.user;

    const slug = generateSlug(data.judul);

    // Generate SEO friendly ID: YYYYMMDD + 3 random digits
    const date = new Date();
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    const random = Math.floor(100 + Math.random() * 900); // 3 digit random
    const customId = `${yyyy}${mm}${dd}${random}`;

    await setDoc(doc(db, "articles", customId), {
      ...data,
      slug,
      picture: imageUrl,
      penulis: currentUser?.id || "unknown",
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });

    return { id: customId, slug };
  };

  const updateArticle = async (
    id: string,
    data: Partial<
      Omit<Article, "id" | "createdAt" | "updatedAt" | "penulisName">
    >,
    imageFile?: File
  ) => {
    const docRef = doc(db, "articles", id);
    let updateData: any = {
      ...data,
      updatedAt: Timestamp.now(),
    };

    if (data.judul) {
      updateData.slug = generateSlug(data.judul);
    }

    if (imageFile) {
      const imageUrl = await uploadImage(imageFile);
      updateData.picture = imageUrl;
    }

    await updateDoc(docRef, updateData);
  };

  const deleteArticle = async (id: string) => {
    await deleteDoc(doc(db, "articles", id));
  };

  // Migration function to fill missing slugs
  const migrateSlugs = async () => {
    const q = query(collection(db, "articles"));
    const snapshot = await getDocs(q);

    let count = 0;
    for (const docSnap of snapshot.docs) {
      const data = docSnap.data() as Article;
      if (!data.slug) {
        const newSlug = generateSlug(data.judul);
        await updateDoc(doc(db, "articles", docSnap.id), {
          slug: newSlug,
        });
        count++;
      }
    }
    if (count > 0) console.log(`Migrated ${count} articles to have slugs.`);
  };

  return {
    getArticles,
    getArticle,

    createArticle,
    updateArticle,
    deleteArticle,
    migrateSlugs,
  };
};
