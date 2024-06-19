<script setup>
import { useRoute } from 'vue-router'
import ShareButton from '@/components/ShareButton.vue'
import ProductDescription from '@/components/ProductDescription.vue'
import ProductSideInfos from '@/components/ProductSideInfos.vue'
import { useProductsStore } from '@/stores.js'
import { ref } from 'vue'

const route = useRoute()

const store = useProductsStore()

const product = ref(null)

store.getById(route.params.id).then((res) => (product.value = res))
</script>

<template>
  <div
    v-if="product"
    class="m-auto my-4 mt-24 flex max-w-[1440px] flex-wrap gap-4 p-4 font-nunito"
  >
    <img class="w-80" :src="product.image" alt="" />
    <div class="m-auto grid grid-cols-1 gap-2 lg:grid-cols-[2fr,1fr]">
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
