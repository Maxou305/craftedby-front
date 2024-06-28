<script setup>
import AddProductForm from '@/components/AddProductForm.vue'
import { ref } from 'vue'
import { useShopStore } from '@/stores/shopStore.js'

const newShop = ref({})
const isEditingShop = ref(false)
const isCreatingShop = ref(false)

const shopStore = useShopStore()

defineProps({
  shop: Object,
})

function handleCreateShop() {
  isCreatingShop.value = true
}

function handleValidateCreationShop() {
  console.log('newshop', newShop.value)
  shopStore.newShop(newShop.value).then(() => {
    alert('Le shop est créé !')
    window.location.reload()
  })
}
</script>

<template>
  <div class="flex flex-col items-center gap-4 text-center">
    <h1 class="text-title">Mon shop</h1>
    <button
      @click="handleCreateShop"
      v-if="!shop && !isCreatingShop"
      class="btn w-auto max-w-80 bg-vermillon"
    >
      Créer mon shop
    </button>
    <div v-if="shop">
      <table class="table text-center">
        <thead>
          <tr>
            <th>N°</th>
            <th>Date</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(value, key) in shop" :key="key">
            <td>{{ key }}</td>
            <td v-if="key !== 'products'">{{ value }}</td>
            <td v-else>
              <ul>
                <li v-for="product in shop.products" :key="product.id">
                  {{ product.name }} - {{ product.price }} €
                </li>
              </ul>
            </td>
            <!--                TODO Add edit system-->
            <td>
              <button @click="isEditingShop = !isEditingShop">
                <img
                  src="../assets/images/icons/edit-icon.svg"
                  alt="edit icon"
                />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <button
        @click="$router.push(`/shop/${shop.id}`)"
        v-if="shop"
        class="btn w-auto max-w-80 bg-vermillon"
      >
        Voir mon shop
      </button>
      <AddProductForm />
    </div>
    <div v-if="isCreatingShop">
      <div class="card-body flex flex-col">
        <input
          type="text"
          class="input input-bordered w-full"
          placeholder="Nom"
          @change="newShop.name = $event.target.value"
        />
        <textarea
          placeholder="Biographie"
          class="textarea textarea-bordered textarea-lg w-full"
          @change="newShop.biography = $event.target.value"
        ></textarea>
        <input
          type="text"
          class="input input-bordered w-full"
          placeholder="Theme"
          @change="newShop.theme = $event.target.value"
        />
        <input
          type="text"
          class="input input-bordered w-full"
          placeholder="Logo"
          @change="newShop.logo = $event.target.value"
        />
        <div class="flex w-full justify-around pb-4">
          <button
            @click="handleValidateCreationShop"
            class="btn w-auto bg-emerald-300"
          >
            Valider
          </button>
          <button
            @click="isCreatingShop = !isCreatingShop"
            class="btn w-auto bg-vermillon"
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
