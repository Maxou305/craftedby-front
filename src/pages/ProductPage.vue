<script setup>
import { useFetch } from '@vueuse/core'
import { useRoute } from 'vue-router'
import ShareButton from '@/components/ShareButton.vue'
import ProductDescription from '@/components/ProductDescription.vue'
import ProductSideInfos from '@/components/ProductSideInfos.vue'

const route = useRoute()

const { data: product } = useFetch(
  `https://fakestoreapi.com/products/${route.params.id}`,
).json()
</script>

<template>
  <div class="mt-24 w-[1440px] m-auto flex flex-wrap gap-4 my-4 font-nunito">
    <img class="w-80" :src="product.image" alt="" />
    <div class="grid grid-cols-[2fr,1fr] gap-2 m-auto">
      <div class="flex flex-col gap-2">
        <div class="flex justify-between gap-2">
          <h1 class="text-title font-bold">{{ product.title }}</h1>
          <ShareButton />
        </div>
        <ProductDescription :description="product.description" />
      </div>
      <ProductSideInfos :product="product" />
      <!--  // need to update when connect to laravel back-->
    </div>
  </div>
</template>

<style scoped></style>
