<template>
  <div>
    <h1 class="text-3xl font-bold text-gray-800 mb-8">Tambah Produk Baru</h1>
    <ProductForm @submit="handleCreate" :loading="loading" />
  </div>
</template>

<script setup lang="ts">
import { doc, setDoc } from "firebase/firestore";

definePageMeta({
  layout: "admin",
});

const db = useFirestore();
const router = useRouter();
const loading = ref(false);

const handleCreate = async (data: any) => {
  loading.value = true;
  try {
    const id = Date.now().toString(); // Simple ID generation
    await setDoc(doc(db, "products", id), {
      id: parseInt(id), // Keep numeric ID for compatibility with current setup (though string is better long term)
      ...data,
    });
    alert("Produk berhasil dibuat!");
    router.push("/dashadmin/products");
  } catch (e) {
    console.error(e);
    alert("Gagal membuat produk");
  } finally {
    loading.value = false;
  }
};
</script>
