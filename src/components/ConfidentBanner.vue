<script setup>
const confidentData = [
  {
    title: 'LIVRAISON OFFERTE',
    text: "Livraison offerte dès 100€ d'achats en France métropolitaine et dans les DOM-TOM",
    icon: '/src/assets/images/icons/delivery-icon.svg',
  },
  {
    title: 'RETOURS ET ECHANGES GRATUITS',
    text: "30 jours pour changer d'avis en France métropolitaine",
    icon: '/src/assets/images/icons/arrows-icon.svg',
  },
  {
    title: 'PAIEMENT SECURISE',
    text: 'Toutes nos transactions via VISA, MasterCard et Amex',
    icon: '/src/assets/images/icons/lock-icon.svg',
  },
]
</script>

<template>
  <div class="confiance flex items-center justify-around py-16">
    <div class="flex max-w-[1440px] flex-col justify-around gap-10 lg:flex-row">
      <div
        class="flex w-80 flex-wrap justify-center text-center lg:gap-4"
        v-for="data in confidentData"
        :key="data.title"
      >
        <div class="flex gap-4">
          <h3>{{ data.title }}</h3>
          <img :src="data.icon" alt="" />
        </div>
        <p>
          {{ data.text }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.confiance {
  background-color: var(--color-space-cadet);
  color: var(--color-platinum);
}
</style>
