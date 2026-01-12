<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gray-100 font-sans">
    <div class="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl">
      <div class="text-center mb-8">
        <h1 class="text-2xl font-bold tracking-tight mb-2">
          <span class="text-red-600">DETA</span> ADMIN
        </h1>
        <p class="text-gray-500">Masuk untuk mengelola data</p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Email</label
          >
          <input
            v-model="email"
            type="email"
            required
            class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
            placeholder="nama@email.com" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Password</label
          >
          <input
            v-model="password"
            type="password"
            required
            class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
            placeholder="******" />
        </div>

        <div v-if="error" class="p-4 bg-red-50 text-red-600 text-sm rounded-xl">
          {{ error }}
        </div>

        <button
          type="submit"
          class="w-full py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-black transition-colors disabled:opacity-50"
          :disabled="loading">
          {{ loading ? "Memuat..." : "Masuk" }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
});

const { login } = useAuth();
const router = useRouter();

const email = ref("");
const password = ref("");
const error = ref("");
const loading = ref(false);

const handleLogin = async () => {
  loading.value = true;
  error.value = "";

  try {
    await login(email.value, password.value);
    router.push("/dashadmin");
  } catch (e: any) {
    console.error(e);
    error.value = "Email atau password salah";
  } finally {
    loading.value = false;
  }
};
</script>
