import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Product from '../pages/Product.vue'
import Cart from '../pages/Cart.vue'
import Profile from '../pages/Profile.vue'
import Shop from '../pages/Shop.vue'
import ShopHome from '../pages/ShopHome.vue'
import OrderConfirm from '../pages/OrderConfirm.vue'
import Category from '../pages/Category.vue'
import Orders from '../pages/Orders.vue'
import OrderDetail from '../pages/OrderDetail.vue'

const routes = [
  { path: '/', name: 'home', component: Home, meta: { showTabbar: true } },
  { path: '/category', name: 'category', component: Category, meta: { showTabbar: true } },
  { path: '/cart', name: 'cart', component: Cart, meta: { showTabbar: true } },
  { path: '/profile', name: 'profile', component: Profile, meta: { showTabbar: true } },
  { path: '/shop', name: 'shop', component: Shop },
  { path: '/shop-home', name: 'shop-home', component: ShopHome },
  { path: '/order-confirm', name: 'order-confirm', component: OrderConfirm },
  { path: '/orders', name: 'orders', component: Orders, meta: { showTabbar: false } },
  { path: '/order/:id', name: 'order-detail', component: OrderDetail, meta: { showTabbar: false } },
  { path: '/product/:id', name: 'product', component: Product },
  { path: '/product', redirect: '/product/p1' }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
