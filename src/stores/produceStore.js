import {defineStore} from "pinia";
import axios from "axios";
const { VITE_APP_URL,VITE_APP_PATH } = import.meta.env



export default defineStore('produceStore',{
    state: ()=>{

        return {
          datas:[],
  
        }


      },
    getters:{
        sortProducts:({datas})=>{
            return datas.sort((a,b)=>a.price - b.price);
        },
 
    },
    actions:{
      getProducts(){
        axios.get(`${VITE_APP_URL}/api/${VITE_APP_PATH}/products/all`)
        .then((res)=>{

         this.datas = res.data.products;
        
        })
        .catch((error)=>{
          alert(error)
        })
      },
    }


})