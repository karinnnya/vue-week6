import { createRouter, createWebHashHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: HomeView
    // },
    {
      path: '/',
      // component: HomeView
      component:()=>import('../views/HomeView.vue'),
      children:[
        {
          path: 'products',
          component:()=>import('../views/ProductsView.vue')
        },
        {
          path: 'product/:id',
          component:()=>import('../views/ProductView.vue')
        },
        {
          path: 'cart',
          component:()=>import('../views/CartView.vue')
        },
        {
          path: 'login',
          component:()=>import('../views/LoginView.vue')
        },
        
      ]
    },
    
    {
      path: '/admin',
      component:()=>import('../views/admin/AdminView.vue'),
      children:[
        {
          path: 'products',
          component:()=>import('../views/admin/AdminProducts.vue')
        },
        {
          path: 'orders',
          component:()=>import('../views/admin/AdminOrders.vue')
        },
      ]
    },
  ]
})

export default router