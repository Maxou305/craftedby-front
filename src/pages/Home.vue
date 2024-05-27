<script setup>
import HomeBanner from '@/components/HomeBanner.vue'
import ProductList from '@/components/ProductList.vue'
import ShopList from '@/components/ShopList.vue'
import ShopAd from '@/components/ShopAd.vue'
import CategoryList from '@/components/CategoryList.vue'
</script>

<template>
  <div class="w-[1440px] m-auto flex flex-wrap gap-4 mb-4">
    <HomeBanner />
    <ProductList />
    <ShopList />
    <ShopAd />
    <CategoryList />
  </div>
</template>

<style scoped></style>
