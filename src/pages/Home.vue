<script setup>
import HomeBanner from '@/components/HomeBanner.vue'
import ProductList from '@/components/ProductList.vue'
import ShopList from '@/components/ShopList.vue'
import ShopAd from '@/components/ShopAd.vue'
import CategoryList from '@/components/CategoryList.vue'
import { onMounted } from 'vue'
import { useProductsStore } from '@/stores/productStore.js'

const store = useProductsStore()

onMounted(() => {
  store.fetchProducts()
})
</script>

<template>
  <div class="m-auto my-4 mt-24 flex max-w-[1440px] flex-wrap gap-4 p-4">
    <HomeBanner />
    <h1 class="text-3xl font-bold">Meilleures ventes</h1>
    <ProductList :products="store.products" />
    <ShopList />
    <ShopAd />
    <CategoryList />
  </div>
</template>

<style scoped></style>
