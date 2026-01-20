<script setup lang="ts">
const { profiles } = useProfile();
const profile = computed(() => profiles.value[0]);

useSeoMeta({
  titleTemplate: "%s",
  ogSiteName: "Yamaha Deta Denpasar",
  twitterCard: "summary_large_image",
});

useSchemaOrg([
  defineOrganization({
    name: "Yamaha Deta Denpasar",
    logo: "/logo.png",
    sameAs: computed(() => [
      profile.value?.instagram
        ? `https://instagram.com/${profile.value.instagram.replace("@", "")}`
        : "",
    ]),
  }),
  defineWebSite({
    name: "Yamaha Deta Denpasar",
  }),
]);
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
    <FloatingProfile />
  </NuxtLayout>
</template>
