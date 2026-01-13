<template>
  <div>
    <h1 class="text-3xl font-bold text-gray-800 mb-8">Edit Produk</h1>
    <div v-if="product">
      <ProductForm
        :initial-data="product"
        @submit="handleUpdate"
        :loading="loading" />
    </div>
    <div v-else class="p-8 text-center text-gray-500">Memuat data...</div>
  </div>
</template>

<script setup lang="ts">
import { doc, updateDoc } from "firebase/firestore";

definePageMeta({
  layout: "admin",
});

const route = useRoute();
const router = useRouter();
const db = useFirestore();
const { getProductById } = useProducts();

const productId = parseInt(route.params.id as string);
const product = computed(() => getProductById(productId));
const loading = ref(false);

const handleUpdate = async (data: any) => {
  if (!product.value) return;

  loading.value = true;
  try {
    // Firestore expects string ID for doc ref
    await updateDoc(doc(db, "products", product.value.id.toString()), data);
    alert("Produk berhasil diperbarui!");
    router.push("/dashadmin/produk");
  } catch (e) {
    console.error(e);
    alert("Gagal memperbarui produk");
  } finally {
    loading.value = false;
  }
};
</script>
