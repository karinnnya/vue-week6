<template>
  <h2 class="text-center">單一產品頁面</h2>

    <div >
      <img :src="product.imageUrl"  alt="product.title" style="width: 300px;">
      <div class="card-body">
        <h5 class="card-title">{{ product.title }} <span>{{ product.category }}</span> </h5>
        <h6>描述：{{ product.description }} </h6>
        
        <p class="card-text">$ {{ product.price }} 元</p>
        <button type="button" class="btn btn-primary" @click.prevent="addToCart(product.id)">加入購物車</button>
      </div>

    </div>

</template>


<script >

const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env
import cartStore from "../stores/cartStore.js";

import {mapActions } from "pinia";

export default {
  data() {
    return {
      product: {}
    }
  },
  methods: {
    ...mapActions(cartStore, ['addToCart']),
    getProduct() {

      const { id } = this.$route.params
      this.$http.get(`${VITE_APP_URL}/api/${VITE_APP_PATH}/product/${id}`)
        .then((res) => {
          this.product = res.data.product


        })
        .catch((error) => {
          alert(error)
        })
    }
  },
  mounted() {
    this.getProduct()
  }
}

</script>

