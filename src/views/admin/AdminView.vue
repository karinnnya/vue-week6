
<template>
  <div class="text-center">
    <h2>這是後台頁面</h2>
    <!-- <RouterLink to="/" >首頁</RouterLink>| -->
    <RouterLink to="/">前台首頁</RouterLink>|
    <RouterLink to="/admin/products">後臺產品列表</RouterLink>|
    <RouterLink to="/admin/orders">後台訂單頁面</RouterLink>|
    <a href="#" @click.prevent="logout">登出</a>
  </div>

  <RouterView></RouterView>


</template>
<script >

import { RouterLink, RouterView } from 'vue-router'
const { VITE_APP_URL } = import.meta.env

export default {
  components: {
    RouterView
  },
  methods: {
    logout() {

      document.cookie = `hexToken=""; expires=""`;
      this.$router.push('/login')

    },
    checkAdmin() {
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, "$1");
      this.$http.defaults.headers.common['Authorization'] = token;
      this.$http.post(`${VITE_APP_URL}/api/user/check`)
        .then(() => {
          // this.getProducts();
        })
        .catch((err) => {
          alert('驗證錯誤')
         this.$router.push('/login')

        })
    },

  },
  mounted() {
    this.checkAdmin()
  }
}
</script>
