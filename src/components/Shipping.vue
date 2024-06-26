<script setup>
import { useOrderStore } from '@/stores.js'
import { ref } from 'vue'
import { useUserStore } from '@/stores/userStore.js'

const ShippingPrice = {
  BOUTIQUE: 0,
  POINT_RELAIS: 2,
  DOMICILE: 5,
}

const props = defineProps({
  handleNextStep: Function,
})

const user = useUserStore().user
const orderStore = useOrderStore()

const shippingCountry = ref('')
const shippingMode = ref('')

function handleValidateShipment() {
  orderStore.update(orderStore.order, {
    shippingCountry: shippingCountry.value,
    shippingMode: shippingMode.value,
    shippingPrice: ShippingPrice[shippingMode.value],
  })
  props.handleNextStep()
}
</script>

<template>
  <div class="m-auto font-nunito">
    <table class="border-collapse border bg-seasalt">
      <tr class="border">
        <td class="p-4">
          <h1 class="text-title font-bold">Récapitulatif</h1>
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
        <td class="p-4 align-text-top">
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
        <td class="p-4 align-text-top">
          <label>MODES DE LIVRAISON </label>
        </td>
        <td class="flex flex-col gap-2 p-4">
          <div class="flex items-center gap-2">
            <input
              class="radio"
              type="radio"
              name="shippingMode"
              v-model="shippingMode"
              value="BOUTIQUE"
            />
            <label>Boutique - GRATUIT</label>
          </div>
          <div class="flex items-center gap-2">
            <input
              class="radio"
              type="radio"
              name="shippingMode"
              v-model="shippingMode"
              value="POINT_RELAIS"
            />
            <label>Livraison en point relais</label>
          </div>
          <div class="flex items-center gap-2">
            <input
              class="radio"
              type="radio"
              name="shippingMode"
              v-model="shippingMode"
              value="DOMICILE"
            />
            <label>Livraison à domicile</label>
          </div>
        </td>
      </tr>
      <tr class="gap-2 p-4">
        <td class="p-4 align-text-top">
          <label>ADRESSE DE LIVRAISON </label>
        </td>
        <td class="flex flex-col gap-2 p-4">
          <div class="flex gap-2">
            <input
              type="text"
              class="input input-bordered w-full max-w-xs"
              :placeholder="user.username"
              disabled
            />
            <input
              type="text"
              class="input input-bordered w-full max-w-xs"
              :placeholder="user.username"
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
    <div class="mt-4 text-end">
      <button
        class="btn bg-vermillon text-platinum hover:bg-platinum hover:text-vermillon"
        @click="handleValidateShipment"
        :disabled="!shippingCountry || !shippingMode"
      >
        Paiement
      </button>
    </div>
  </div>
</template>

<style scoped></style>
