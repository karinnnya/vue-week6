<template>
  <h2>後臺產品列表</h2>

  <div class="container">
    <div class="text-end mt-4">
      <button class="btn btn-primary" @click="open('new')">
        建立新的產品
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="120">
            分類
          </th>
          <th>產品名稱</th>
          <th width="120">
            原價
          </th>
          <th width="120">
            售價
          </th>
          <th width="100">
            是否啟用
          </th>
          <th width="120">
            編輯
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="i in products" :key="i.id">
          <td>{{ i.category }}</td>
          <td>{{ i.title }}</td>
          <td>{{ i.origin_price }}</td>
          <td>{{ i.price }}</td>
          <td>
            <span class="text-success" v-if="i.is_enabled === 1">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td>
            <div class="btn-group">
              <button type="button" class="btn btn-outline-primary btn-sm" @click="open('edit', i)">
                編輯
              </button>
              <button type="button" class="btn btn-outline-danger btn-sm" @click="open('del', i)">
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <pagination :pages="pages" :get-products="getProducts" @change-page="getProducts"></pagination>
  </div>


  <!-- <product-modal :temp-product="tempProduct" :new-prod="newProd" @close="btnModel"></product-modal> -->







    <!-- 編輯文章 -->
    <div ref="modal" class="modal fade" tabindex="-1" aria-labelledby="productModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-xl">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title">
              <span v-if="newProd">新增產品</span>
              <span v-else>編輯</span>

            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">

            <div class="row">
              <div class="col-sm-4">
                <div class="mb-2">
                  <div class="mb-3">
                    <h3>主要圖片</h3>
                    <label for="imageUrl" class="form-label">輸入圖片網址</label>
                    <input type="text" class="form-control"
                           placeholder="請輸入圖片連結" v-model="tempProduct.imageUrl">
                  </div>
                  <img class="img-fluid" :src="tempProduct.imageUrl" alt="">
                  <h3>內容圖片</h3>
                  <div  v-if="Array.isArray(tempProduct.imagesUrl)">
                    <div class="mb-3" v-for="(item,key) in tempProduct.imagesUrl" :key="key">
                     
                        <label for="imageUrl" class="form-label">輸入圖片網址</label>
                        <input type="text" class="form-control"
                               placeholder="請輸入圖片連結" v-model="tempProduct.imagesUrl[key]">
                        <img :src="item" alt="" class="images m-2" style="width: 100%;">
                        <button class="btn btn-outline-danger btn-sm d-block w-100"
                        @click="imgBtn('push',key)">
                        刪除圖片
                      </button>
                    
          
                    </div>
                    <div >
                      <button class="btn btn-outline-primary btn-sm d-block w-100"
                        @click="tempProduct.imagesUrl.push('')">
                        新增圖片
                      </button>
                    </div>
                  </div>
                  <div v-else>
                    <button class="btn btn-outline-primary btn-sm d-block w-100" @click="imgBtn">
                      新增圖片
                    </button>
                  </div>
                  <div>
                
                  </div>
                </div>
    
              </div>
              <div class="col-sm-8">
                <div class="mb-3">
                  <label for="title" class="form-label">標題</label>
                  <input id="title" type="text" class="form-control" v-model="tempProduct.title" placeholder="請輸入標題">
                </div>

                <div class="row">
                  <div class="mb-3 col-md-6">
                    <label for="category" class="form-label">分類</label>
                    <input id="category" type="text" class="form-control"
                           placeholder="請輸入分類" v-model="tempProduct.category">
                  </div>
                  <div class="mb-3 col-md-6">
                    <label for="price" class="form-label">單位</label>
                    <input id="unit" type="text" class="form-control" placeholder="請輸入單位" v-model="tempProduct.unit">
                  </div>
                </div>

                <div class="row">
                  <div class="mb-3 col-md-6">
                    <label for="origin_price" class="form-label">原價</label>
                    <input id="origin_price" type="number" min="0" class="form-control" placeholder="請輸入原價" v-model.number="tempProduct.origin_price">
                  </div>
                  <div class="mb-3 col-md-6">
                    <label for="price" class="form-label">售價</label>
                    <input id="price" type="number" min="0" class="form-control"
                           placeholder="請輸入售價" v-model.number="tempProduct.price">
                  </div>
                </div>
                <hr>

                <div class="mb-3">
                  <label for="description" class="form-label">產品描述</label>
                  <textarea id="description" type="text" class="form-control"
                            placeholder="請輸入產品描述" v-model="tempProduct.description">
                  </textarea>
                </div>
                <div class="mb-3">
                  <label for="content" class="form-label">說明內容</label>
                  <textarea id="description" type="text" class="form-control"
                            placeholder="請輸入說明內容" v-model="tempProduct.content">
                  </textarea>
                </div>
                <div class="mb-3">
                  <div class="form-check">
                    <input id="is_enabled"  v-model="tempProduct.is_enabled"  class="form-check-input" type="checkbox"
                           :true-value="1" :false-value="0">
                    <label class="form-check-label" for="is_enabled">是否啟用</label>
                  </div>
                </div>
              </div>
            </div>
        
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
              取消
            </button>
            <button type="button" class="btn btn-primary" @click="sendProd(newProd, tempProduct)">
              確認
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 刪除文章 -->
    <div id="delProductModal" ref="delmodal" class="modal fade" tabindex="-1" aria-labelledby="delProductModalLabel"
      aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 id="delProductModalLabel" class="modal-title">
              <span>刪除產品</span>
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            是否刪除
            <strong class="text-danger"></strong> {{tempProduct.title}}(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
              取消
            </button>
            <button type="button" class="btn btn-danger" @click="delProd(i)">
              確認刪除
            </button>
          </div>
        </div>
      </div>
    </div>

</template>

<script>

import axios from "axios";
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env
// let myModal = '';
// let delModal = '';
import { Modal } from "bootstrap";
import pagination from "../../components/pagination.vue"


export default {

  data() {
    return {
      products: [],
      tempProduct: {
        imagesUrl: []
      },
      newProd: false,
      pages: {},
    }
  },
  components: {
    pagination
  },
  methods: {
    checkAdmin() {
      axios.post(`${VITE_APP_URL}/api/user/check`)
        .then(() => {
          this.getProducts();
        })
        .catch((err) => {
          alert('驗證錯誤')
          window.location = 'login.html';
        })
    },
    getProducts(page = 1) {
      axios.get(`${VITE_APP_URL}/api/${VITE_APP_PATH}/admin/products/?page=${page}`)
        .then((res) => {
          this.pages = res.data.pagination;
          this.products = res.data.products;
          console.log(this.pages)


        })
        .catch((error) => {
          console.log(error)
        })
    },
    open(prod, i) {

      if (prod === "del") {
        this.delModal.show();
        this.tempProduct = i;
        this.newProd = false;


      }
      else if (prod == "edit") {
        this.myModal.show()
        this.tempProduct = { ...i };
        this.newProd = false;


      }
      else if (prod == "new") {
        this.tempProduct = {
          imagesUrl: []
        };

        this.newProd = true;
        console.log(this.newProd)
        this.myModal.show()

      }

    },
    delProd() {
      axios.delete(`${VITE_APP_URL}/api/${VITE_APP_PATH}/admin/product/${this.tempProduct.id}`)
        .then((res) => {
          this.delModal.hide();

          this.getProducts();
        })
        .catch((error) => {
          console.log(error)
        })
    },

    imgBtn(i,index){
        if(i==="del"){
          this.tempProduct.imagesUrl.splice(index,1)

        }
        else{
          this.tempProduct.imagesUrl = [];
          this.tempProduct.imagesUrl.push('');
        }
      },
      upImgBtn(){
        const file = imgfile.files[0];
        if(!file){
          alert('請確認圖片路徑')
        }
        else{
          
        const formData = new FormData();
        formData.append('file-to-upload',file);

        axios.post(`${VITE_APP_URL}/api/${VITE_APP_PATH}/admin/upload`,formData)
        .then((res)=>{
          if(!this.tempProduct.imagesUrl){
            this.tempProduct.imagesUrl = [];
            this.tempProduct.imagesUrl.push(res.data.imageUrl);
            // file.reset();
            
          }
          else{
            
            this.tempProduct.imagesUrl.push(res.data.imageUrl);
           
          }
        
          
        })
        .catch((error)=>{
          console.log(error)
          alert('上傳圖片失敗')
        })
        }

      },
      sendProd(){
        if(this.newProd){
        axios.post(`${VITE_APP_URL}/api/${VITE_APP_PATH}/admin/product`,{data:this.tempProduct})
        .then((res)=>{
      
          this.myModal.hide();
          this.getProducts()

        })
        .catch((error)=>{
          console.log(error)
          alert('新增商品失敗，請確認是否有誤')
        })
        }
        else{
        axios.put(`${VITE_APP_URL}/api/${VITE_APP_PATH}/admin/product/${this.tempProduct.id}`,{data:this.tempProduct})
        .then(()=>{
          this.myModal.hide();
          this.getProducts();
         
        })
        .catch((error)=>{
          console.log(error)
        })
        }
      },
  },
  mounted() {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    axios.defaults.headers.common['Authorization'] = token;
    this.checkAdmin()
 
    this.delModal =  new Modal(this.$refs.delmodal)
    this.myModal =  new Modal(this.$refs.modal)
  }

}

</script>