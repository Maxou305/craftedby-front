<script setup></script>

<template>
  <div class="font-nunito m-auto p-4">
    <div class="flex flex-col justify-center flex-wrap wrap gap-4">
      <img
        src="../assets/images/icons/confirmation-check-icon.svg"
        alt="confirmation check"
      />
      <div class="flex flex-col text-center gap-2">
        <h1 class="font-bold text-title">Confirmation de commande</h1>
        <p>Votre commande est validée et sera expédiée sous 24h !</p>
      </div>
      <button
        class="btn bg-vermillon text-platinum hover:text-vermillon hover:bg-platinum"
        @click="$router.push('/')"
      >
        Retour à l'accueil
      </button>
    </div>
  </div>
</template>

<style scoped></style>
