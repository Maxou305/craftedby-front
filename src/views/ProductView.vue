<script setup>
import { useRoute } from 'vue-router'
import ShareButton from '@/components/ShareButton.vue'
import ProductDescription from '@/components/ProductDescription.vue'
import ProductSideInfos from '@/components/ProductSideInfos.vue'
import { ref } from 'vue'
import GoToShopButton from '@/components/GoToShopButton.vue'
import { useProductsStore } from '@/stores/productStore.js'

const route = useRoute()

const store = useProductsStore()

const product = ref(null)

store.getById(route.params.id).then((res) => {
  product.value = res
})
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
          <h1 class="text-title font-bold">{{ product.name }}</h1>
          <div class="flex gap-2">
            <!--             TODO make only one button-->
            <GoToShopButton
              :click="
                () => {
                  $router.push(`/shop/${product.shop_id}`)
                }
              "
            />
            <ShareButton />
          </div>

          <!--          <button @click="$router.push(`/shop/${product.shop_id}`)">-->
          <!--            GOT TO SHOP-->
          <!--          </button>-->
        </div>
        <ProductDescription :description="product.description" />
      </div>
      <ProductSideInfos :product="product" />
    </div>
  </div>
</template>

<style scoped></style>
