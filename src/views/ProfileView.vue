<script setup>
import { onMounted, ref } from 'vue'
import { formatDate } from '../utils.js'
import { useUserStore } from '@/stores/userStore.js'
import ShopComponent from '@/components/ShopComponent.vue'

const userStore = useUserStore()
// const orderStore = useOrderStore()
// const shopStore = useShopStore()

const user = ref(userStore.user)
const orders = ref(null)
const shop = ref(null)
const newValues = ref({})

const isLoading = ref(true)
const isEditingProfile = ref(false)

onMounted(() => {
  // userStore.getAuthUser().then(() => {
  //   user.value = userStore.user
  //   if (user.value) {
  //     orderStore.getByUserId(user.value.id).then((res) => {
  //       orders.value = res
  //     })
  //     shopStore.getShopByUserId(user.value.id).then((res) => {
  //       shop.value = res
  //     })
  //   }
  // })

  isLoading.value = false
})

function handleClick() {
  isEditingProfile.value = !isEditingProfile.value
  if (!isEditingProfile.value) {
    userStore.update(user.value, newValues.value).then(() => {
      userStore.getAuthUser().then(() => {
        user.value = userStore.user
      })
    })
  }
}
</script>

<template>
  <div class="m-auto my-4 mt-24 flex max-w-[1440px] flex-wrap p-4 font-nunito">
    <div v-if="!isLoading" class="m-auto flex flex-col gap-4 overflow-x-auto">
      <div class="flex flex-col items-center gap-4">
        <h1 class="text-center text-title">Profil</h1>
        <div class="card bg-base-100 shadow-xl lg:card-side">
          <figure class="max-w-screen-xs object-cover">
            <img
              :src="
                user.profile_picture
                  ? user.profile_picture
                  : 'https://kultt.fr/wp-content/uploads/2022/09/RickAstley-ad2022.jpg'
              "
              alt="Album"
            />
          </figure>
          <div class="flex flex-col">
            <div class="card-body" v-if="!isEditingProfile">
              <p>Username : {{ user.username }}</p>
              <p>Nom : {{ user.name ? user.name : '' }}</p>
              <p>
                Adresse de livraison :
                {{ user.shipping_address ? user.shipping_address : '' }}
              </p>
              <p>
                Adresse de facturation :
                {{ user.payment_address ? user.payment_address : '' }}
              </p>
              <p>Tel : {{ user.phone_number ? user.phone_number : '' }}</p>
              <p>Email : {{ user.email }}</p>
            </div>

            <div class="card-body" v-if="isEditingProfile">
              <label class="input input-bordered flex items-center gap-2">
                Username
                <input
                  type="text"
                  class="grow"
                  :placeholder="user.username"
                  @change="newValues.username = $event.target.value"
                />
              </label>
              <label class="input input-bordered flex items-center gap-2">
                Nom
                <input
                  type="text"
                  class="grow"
                  :placeholder="user.name"
                  @change="newValues.name = $event.target.value"
                /> </label
              ><label class="input input-bordered flex items-center gap-2">
                Adresse de livraison
                <input
                  type="text"
                  class="grow"
                  :placeholder="user.shipping_address"
                  @change="newValues.shipping_address = $event.target.value"
                /> </label
              ><label class="input input-bordered flex items-center gap-2">
                Adresse de facturation
                <input
                  type="text"
                  class="grow"
                  :placeholder="user.payment_address"
                  @change="newValues.payment_address = $event.target.value"
                />
              </label>
              <label class="input input-bordered flex items-center gap-2">
                Tel
                <input
                  type="text"
                  class="grow"
                  :placeholder="user.phone_number"
                  @change="newValues.phone_number = $event.target.value"
                />
              </label>
              <label class="input input-bordered flex items-center gap-2">
                Email
                <input
                  type="text"
                  class="grow"
                  :placeholder="user.email"
                  @change="newValues.email = $event.target.value"
                /> </label
              ><label class="input input-bordered flex items-center gap-2">
                Avatar
                <input
                  type="text"
                  class="grow"
                  :placeholder="user.profile_picture"
                  @change="newValues.profile_picture = $event.target.value"
                />
              </label>
            </div>
          </div>
        </div>
        <div class="flex w-full justify-around pb-4">
          <button @click="handleClick" class="btn w-auto bg-emerald-300">
            {{ isEditingProfile ? 'Enregistrer' : 'Modifier' }}
          </button>
          <button
            @click="isEditingProfile = !isEditingProfile"
            v-if="isEditingProfile"
            class="btn w-auto bg-vermillon"
          >
            Annuler
          </button>
        </div>
      </div>
      <div class="flex flex-col gap-4 text-center">
        <h1 class="text-title">Commandes</h1>
        <table class="table text-center">
          <thead>
            <tr>
              <th>N°</th>
              <th>Date</th>
              <th>Montant</th>
              <th>Produits</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in orders" :key="order.id">
              <td>{{ order.order_number }}</td>
              <td>{{ formatDate(order.created_at) }}</td>
              <td>{{ order.price }} €</td>
              <td>
                <ul>
                  <li v-for="product in order.products" :key="product.id">
                    {{ product.quantity }} x {{ product.name }} -
                    {{ product.price }} € ({{ product.color }}
                    {{ product.material }})
                  </li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <ShopComponent :shop="shop" />
    </div>
    <div v-else></div>
  </div>
</template>

<style scoped></style>
