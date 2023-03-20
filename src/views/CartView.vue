<template>

    <h2 class="text-center">購物車頁面</h2>
    <cartComponent></cartComponent>
    <userForm></userForm>
  
</template>


<script >

import cartComponent from '../components/cartComponent.vue';
import userForm from '../components/userForm.vue';
export default{
  components:{
    
    cartComponent,
    userForm
  }
}

</script>

