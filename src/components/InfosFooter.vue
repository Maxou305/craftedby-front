<script setup>
const footerData = [
  {
    title: 'UNE QUESTION ?',
    links: ['FAQ', 'Faire un retour ?', 'Suivre ma commande'],
  },
  {
    title: 'A PROPOS',
    links: [
      'Qui sommes-nous ?',
      'Nos engagements',
      "Conditions d'utilisations",
    ],
  },
  {
    title: 'RENCONTRER NOS ARTISANS ?',
    links: ['Nos artisans'],
  },
]
</script>

<template>
  <div class="flex flex-col items-center justify-around gap-8 py-12">
    <div class="flex max-w-[1440px] flex-col justify-around lg:flex-row">
      <div
        class="flex w-80 flex-col gap-4 text-center"
        v-for="data in footerData"
        :key="data.title"
      >
        <h3>{{ data.title }}</h3>
        <ul class="flex flex-col justify-center gap-2">
          <li v-for="link in data.links" :key="link">
            <RouterLink to="">
              {{ link }}
            </RouterLink>
          </li>
        </ul>
      </div>
    </div>
    <img src="../assets/images/icons/logo-icon.svg" alt="logo" />
    <div class="flex gap-4">
      <div
        class="flex h-[50px] w-[50px] items-center justify-center rounded-full border border-zinc-200 bg-neutral-50"
      >
        <a
          href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&pp=ygULcmljayBhc3RsZXk%3D"
          target="_blank"
        >
          <img
            src="/src/assets/images/icons/instagram-icon.svg"
            alt="instagram"
          />
        </a>
      </div>
      <div
        class="flex h-[50px] w-[50px] items-center justify-center rounded-full border border-zinc-200 bg-neutral-50"
      >
        <a
          href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&pp=ygULcmljayBhc3RsZXk%3D"
          target="_blank"
        >
          <img
            src="/src/assets/images/icons/linkedin-icon.svg"
            alt="linkedin"
          />
        </a>
      </div>
      <div
        class="flex h-[50px] w-[50px] items-center justify-center rounded-full border border-zinc-200 bg-neutral-50"
      >
        <a
          href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&pp=ygULcmljayBhc3RsZXk%3D"
          target="_blank"
        >
          <img
            src="/src/assets/images/icons/facebook-icon.svg"
            alt="facebook"
          />
        </a>
      </div>
    </div>
    <div class="flex flex-col text-center">
      <p>© 2024 CraftedBy - Conception BestTeam</p>
      <a href="">Politique de confidentialité</a>
    </div>
  </div>
</template>

<style scoped></style>
