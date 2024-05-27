<script setup></script>

<template>
  <nav>
    <div>
      <div class="flex justify-between flex-row p-4 w-[1440px] m-auto z-50">
        <RouterLink to="/" class="flex flex-wrap">
          <img class="w-32" src="../assets/images/logo.svg" alt="logo" />
        </RouterLink>
        <div class="flex rounded-2xl search">
          <select class="rounded-l-2xl search w-16">
            <option selected></option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
          </select>
          <input type="search" placeholder="Search..." class="px-4 py-2" />
          <div
            class="rounded-l-2xl search flex content-center flex-wrap px-4 rounded-r-2xl"
          >
            <RouterLink to="/">
              <img
                src="../assets/images/icons/search-icon.svg"
                class="icon"
                alt=""
              />
            </RouterLink>
          </div>
        </div>
        <div class="flex gap-4 content-center flex-wrap rounded-r-2xl">
          <RouterLink to="/" class="sign-in">Sign in</RouterLink>
          <RouterLink to="/"
            ><img
              class="icon"
              src="../assets/images/icons/menu-icon.png"
              alt="menu"
            />
          </RouterLink>
          <RouterLink to="/"
            ><img
              class="icon"
              src="../assets/images/icons/cart-icon.svg"
              alt="cart"
          /></RouterLink>
          <RouterLink to="/"
            ><img
              src="../assets/images/icons/sign-up-icon.svg"
              class="icon"
              alt="sign up"
          /></RouterLink>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
div {
  background: var(--color-space-cadet);
}
.search {
  background-color: var(--color-vermillon);
}
input {
  width: 700px;
}
.icon {
  width: 24px;
}
.sign-in {
  color: white;
}
</style>
