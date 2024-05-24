<!--<script setup>-->
<!--import HelloWorld from './components/HelloWorld.vue'-->
<!--import TheWelcome from './components/TheWelcome.vue'-->
<!--</script>-->

<!--<template>-->
<!--  <header>-->
<!--    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />-->

<!--    <div class="wrapper">-->
<!--      <HelloWorld msg="You did it!" />-->
<!--    </div>-->
<!--  </header>-->

<!--  <main>-->
<!--    <TheWelcome />-->
<!--  </main>-->
<!--</template>-->

<!--<style scoped>-->
<!--header {-->
<!--  line-height: 1.5;-->
<!--}-->

<!--.logo {-->
<!--  display: block;-->
<!--  margin: 0 auto 2rem;-->
<!--}-->

<!--@media (min-width: 1024px) {-->
<!--  header {-->
<!--    display: flex;-->
<!--    place-items: center;-->
<!--    padding-right: calc(var(&#45;&#45;section-gap) / 2);-->
<!--  }-->

<!--  .logo {-->
<!--    margin: 0 2rem 0 0;-->
<!--  }-->

<!--  header .wrapper {-->
<!--    display: flex;-->
<!--    place-items: flex-start;-->
<!--    flex-wrap: wrap;-->
<!--  }-->
<!--}-->
<!--</style>-->

<template>
  <div class="p-12">
    <ul role="list" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <li v-for="product in products" :key="product.id"
          class="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
        <div class="flex w-full items-center justify-between space-x-6 p-6">
          <div class="flex-1 truncate">
            <div class="flex items-center space-x-3">
              <h3 class="truncate text-sm font-medium text-gray-900">{{ product.title }}</h3>
              <span
                  class="inline-flex flex-shrink-0 items-center rounded-full bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                {{ product.category }}
              </span>
            </div>
            <p class="mt-1 truncate text-sm text-gray-500">{{ product.description }}</p>
          </div>
          <img class="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300" :src="product.image" alt="" />
        </div>
        <div>
          <div class="-mt-px flex divide-x divide-gray-200">
            <div class="flex w-0 flex-1">
              <p
                  class="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900">
                {{ product.price }}
              </p>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useFetch } from '@vueuse/core'
const { data: products } = useFetch('https://fakestoreapi.com/products?limit=21').json()
</script>