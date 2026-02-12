import { createRouter, createWebHashHistory } from 'vue-router'


const routes = [
  { path: '/', name: 'home', component: () => import('../pages/Home.vue'), meta: { showTabbar: true } },
  { path: '/category', name: 'category', component: () => import('../pages/Category.vue'), meta: { showTabbar: true } },
  { path: '/cart', name: 'cart', component: () => import('../pages/Cart.vue'), meta: { showTabbar: true } },
  { path: '/profile', name: 'profile', component: () => import('../pages/Profile.vue'), meta: { showTabbar: true } },
  { path: '/shop', name: 'shop', component: () => import('../pages/Shop.vue') },
  { path: '/shop-home', name: 'shop-home', component: () => import('../pages/ShopHome.vue') },
  { path: '/order-confirm', name: 'order-confirm', component: () => import('../pages/OrderConfirm.vue') },
  { path: '/orders', name: 'orders', component: () => import('../pages/Orders.vue'), meta: { showTabbar: false } },
  { path: '/order/:id', name: 'order-detail', component: () => import('../pages/OrderDetail.vue'), meta: { showTabbar: false } },
  { path: '/messages', name: 'messages', component: () => import('../pages/Messages.vue'), meta: { showTabbar: false } },
  { path: '/messages/:id', name: 'message-detail', component: () => import('../pages/MessageDetail.vue'), meta: { showTabbar: false } },
  { path: '/favorites', name: 'favorites', component: () => import('../pages/Favorites.vue'), meta: { showTabbar: false } },
  { path: '/follows', name: 'follows', component: () => import('../pages/Follows.vue'), meta: { showTabbar: false } },
  { path: '/footprints', name: 'footprints', component: () => import('../pages/Footprints.vue'), meta: { showTabbar: false } },
  { path: '/activities', name: 'activities', component: () => import('../pages/Activities.vue'), meta: { showTabbar: false } },
  { path: '/addresses', name: 'addresses', component: () => import('../pages/Addresses.vue'), meta: { showTabbar: false } },
  { path: '/account', name: 'account', component: () => import('../pages/Account.vue'), meta: { showTabbar: false } },
  { path: '/support', name: 'support', component: () => import('../pages/Support.vue'), meta: { showTabbar: false } },
  { path: '/help', name: 'help', component: () => import('../pages/Help.vue'), meta: { showTabbar: false } },
  { path: '/product/:id', name: 'product', component: () => import('../pages/Product.vue') },
  { path: '/product', redirect: '/product/p1' }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
