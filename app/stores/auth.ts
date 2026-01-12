import { defineStore } from "pinia";
import { collection, query, where, getDocs } from "firebase/firestore";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as any | null,
  }),
  actions: {
    async login(email: string, password: string) {
      const db = useFirestore();
      try {
        const q = query(
          collection(db, "profiles"),
          where("email", "==", email)
        );

        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty || !querySnapshot.docs[0]) {
          throw new Error("User not found");
        }

        const doc = querySnapshot.docs[0];
        const userData = doc.data();

        // Verify password (Base64 check)
        const inputPasswordBase64 = btoa(password);

        if (userData.password !== inputPasswordBase64) {
          throw new Error("Invalid password");
        }

        // Successful login
        this.user = {
          id: doc.id,
          nama: userData.nama,
          email: userData.email,
          photo: userData.photo,
        };

        // Persist to cookie
        const cookie = useCookie("auth_token");
        cookie.value = JSON.stringify(this.user);

        return true;
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
    logout() {
      this.user = null;
      const cookie = useCookie("auth_token");
      cookie.value = null;
      const router = useRouter();
      router.push("/dashadmin/login");
    },
    initAuth() {
      const cookie = useCookie("auth_token");
      if (cookie.value) {
        this.user = cookie.value;
      }
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.user,
  },
});
