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
  <div class="flex items-center justify-around flex-col gap-8 py-12">
    <div class="w-[1440px] flex justify-around">
      <div
        class="w-80 flex flex-col text-center gap-4"
        v-for="data in footerData"
      >
        <h3>{{ data.title }}</h3>
        <ul class="flex justify-center flex-col gap-2">
          <li v-for="link in data.links">
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
        class="w-[50px] h-[50px] bg-neutral-50 rounded-full border border-zinc-200 flex items-center justify-center"
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
        class="w-[50px] h-[50px] bg-neutral-50 rounded-full border border-zinc-200 flex items-center justify-center"
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
        class="w-[50px] h-[50px] bg-neutral-50 rounded-full border border-zinc-200 flex items-center justify-center"
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
    <div class="flex text-center flex-col">
      <p>© 2024 CraftedBy - Conception BestTeam</p>
      <a href="">Politique de confidentialité</a>
    </div>
  </div>
</template>

<style scoped></style>
