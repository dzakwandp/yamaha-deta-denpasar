import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

export default defineEventHandler(async (event) => {
  const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
  };

  // Initialize Firebase (safely)
  const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
  const db = getFirestore(app);

  // Helper to handle Firestore Timestamps or ISO strings
  const formatDate = (date: any) => {
    if (!date) return new Date().toISOString();
    // Check if it's a Firestore Timestamp (has toDate method)
    if (date && typeof date.toDate === "function") {
      return date.toDate().toISOString();
    }
    return date; // Assume it's already a string or valid format
  };

  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    const products = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        loc: `/produk/${doc.id}`,
        lastmod: formatDate(data.updatedAt),
        changefreq: "daily",
        priority: 0.8,
      };
    });

    const articlesSnapshot = await getDocs(collection(db, "articles"));
    const articles = articlesSnapshot.docs.map((doc) => {
      const data = doc.data();
      const slug = data.slug || "artikel";
      return {
        loc: `/artikel/${doc.id}-${slug}`,
        lastmod: formatDate(data.updatedAt),
        changefreq: "weekly",
        priority: 0.7,
      };
    });

    return [...products, ...articles];
  } catch (error) {
    console.error("Error fetching sitemap routes:", error);
    return [];
  }
});
