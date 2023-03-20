
<template>
  <div  class="text-center">
    <h2>這是首頁</h2>
  <!-- <RouterLink to="/" >首頁</RouterLink>| -->
  <RouterLink to="/products">產品頁面</RouterLink>|
  <RouterLink to="/cart">購物車</RouterLink>|
  <RouterLink to="/login">後台登入</RouterLink>|
  <!-- <RouterLink to="/admin">後台</RouterLink> -->
  </div>

  <RouterView></RouterView>


</template>
<script >

import { RouterLink, RouterView } from 'vue-router'
export default {
  components: {
    RouterView
  }
}
</script>
