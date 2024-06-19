<script setup>
import HomeBanner from '@/components/HomeBanner.vue'
import ProductList from '@/components/ProductList.vue'
import ShopList from '@/components/ShopList.vue'
import ShopAd from '@/components/ShopAd.vue'
import CategoryList from '@/components/CategoryList.vue'
</script>

<template>
  <div class="m-auto my-4 mt-24 flex max-w-[1440px] flex-wrap gap-4">
    <HomeBanner />
    <ProductList />
    <ShopList />
    <ShopAd />
    <CategoryList />
  </div>
</template>

<style scoped></style>
