<script setup>
import HomeBanner from '@/components/HomeBanner.vue'
import ProductList from '@/components/ProductList.vue'
import ShopList from '@/components/ShopList.vue'
import ShopAd from '@/components/ShopAd.vue'
import CategoryList from '@/components/CategoryList.vue'
import { useUserStore } from '@/stores.js'

const userStore = useUserStore()
userStore.getAuthUser()
</script>

<template>
  <div class="mt-24 w-[1440px] m-auto flex flex-wrap gap-4 my-4">
    <HomeBanner />
    <ProductList />
    <ShopList />
    <ShopAd />
    <CategoryList />
  </div>
</template>

<style scoped></style>
