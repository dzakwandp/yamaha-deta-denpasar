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
import Swal from "sweetalert2";
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
    await Swal.fire({
      title: "Berhasil!",
      text: "Produk berhasil dibuat!",
      icon: "success",
      timer: 2000,
      showConfirmButton: false,
    });
    router.push("/dashadmin/produk");
  } catch (e) {
    console.error(e);
    Swal.fire({
      title: "Error!",
      text: "Gagal membuat produk.",
      icon: "error",
    });
  } finally {
    loading.value = false;
  }
};
</script>
