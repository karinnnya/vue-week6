<template>
  <div class="row">
    <div v-for="product in datas" :key="product.id" class=" col-3 gy-3" >
     <div class="card">
      <img :src="product.imageUrl" class="card-img-top" alt="product.title">
      <div class="card-body">
        <h5 class="card-title">{{ product.title }}</h5>
        <p class="card-text">$ {{ product.price }} 元</p>
        
      
        <RouterLink :to="`/product/${product.id}`" type="button" class="btn btn-warning me-2" >單一品項</RouterLink>
        <button type="button" class="btn btn-primary" @click.prevent="addToCart(product.id)">加入購物車</button>
      </div>
    </div>
     </div>
  </div>


</template>

<style>

</style>

<script>
import produceStore from "../stores/produceStore.js";
import cartStore from "../stores/cartStore.js";
import { RouterLink } from 'vue-router'

import { mapState, mapActions } from "pinia";
export default {
  data() {
    return {
      product:{},
    }
  },

  computed: {
    ...mapState(produceStore, ['datas','sortProducts'])
  },
  methods: {
    ...mapActions(cartStore, ['addToCart']),
    ...mapActions(produceStore, ['getProducts','getDetail']),
  },
  mounted() {
  
    this.getProducts();
  }
};

</script>