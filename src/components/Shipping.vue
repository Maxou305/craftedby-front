<script setup>
import { useOrderStore, useUserStore } from '@/stores.js'
import { ref } from 'vue'

const props = defineProps({
  handleNextStep: Function,
})

const user = useUserStore().user
const orderStore = useOrderStore()

const shippingCountry = ref('')
const shippingMode = ref('')

console.log('shipping', orderStore)
function handleValidateShipment() {
  orderStore.newOrder(false, user, shippingCountry.value, shippingMode.value)
  console.log(orderStore.orderList[0])
  props.handleNextStep()
}
</script>

<template>
  <div class="font-nunito m-auto">
    <table class="border border-collapse">
      <tr class="border">
        <td class="p-4">
          <h1 class="font-bold text-title">Récapitulatif</h1>
        </td>
        <td></td>
      </tr>
      <tr class="border">
        <td class="p-4">
          <h2 class="text-bold">Compte</h2>
        </td>
        <td class="p-4">
          <p>{{ user.username }}</p>
          <p>{{ user.email }}</p>
        </td>
      </tr>
      <tr class="">
        <td class="p-4">
          <h2 class="text-bold">Livraison</h2>
        </td>
        <td></td>
      </tr>
      <tr>
        <td class="align-text-top p-4">
          <label>PAYS DE LIVRAISON </label>
        </td>
        <td class="p-4">
          <select
            v-model="shippingCountry"
            class="select select-bordered w-full max-w-xs"
          >
            <option disabled selected></option>
            <option>France</option>
            <option>Belgique</option>
            <option>DOM-TOM</option>
          </select>
        </td>
      </tr>
      <tr>
        <td class="align-text-top p-4">
          <label>MODES DE LIVRAISON </label>
        </td>
        <td class="flex flex-col p-4 gap-2">
          <div class="flex gap-2 items-center">
            <input
              type="radio"
              name="shippingMode"
              v-model="shippingMode"
              value="BOUTIQUE"
            />
            <label>Boutique - GRATUIT</label>
          </div>
          <div class="flex gap-2 items-center">
            <input
              type="radio"
              name="shippingMode"
              v-model="shippingMode"
              value="POINT_RELAIS"
            />
            <label>Livraison en point relais</label>
          </div>
          <div class="flex gap-2 items-center">
            <input
              type="radio"
              name="shippingMode"
              v-model="shippingMode"
              value="DOMICILE"
            />
            <label>Livraison à domicile</label>
          </div>
        </td>
      </tr>
      <tr class="p-4 gap-2">
        <td class="align-text-top p-4">
          <label>ADRESSE DE LIVRAISON </label>
        </td>
        <td class="flex flex-col p-4 gap-2">
          <div class="flex gap-2">
            <input
              type="text"
              class="input input-bordered w-full max-w-xs"
              :placeholder="user.name.firstname"
              disabled
            />
            <input
              type="text"
              class="input input-bordered w-full max-w-xs"
              :placeholder="user.name.lastname"
              disabled
            />
          </div>
          <div class="flex gap-2">
            <input
              type="text"
              class="input input-bordered w-full max-w-xs"
              :placeholder="user.phone"
              disabled
            />
            <input
              type="text"
              class="input input-bordered w-full max-w-xs"
              placeholder="Société"
            />
          </div>
          <input
            type="text"
            class="input input-bordered w-auto"
            placeholder="Adresse"
          />
          <input
            type="text"
            class="input input-bordered w-auto"
            placeholder="Informations complémentaires"
          />
        </td>
      </tr>
    </table>
    <div class="text-end mt-4">
      <button
        class="btn bg-vermillon text-platinum hover:text-vermillon hover:bg-platinum"
        @click="handleValidateShipment"
      >
        Paiement
      </button>
    </div>
  </div>
</template>

<style scoped></style>
