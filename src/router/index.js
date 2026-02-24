import { createRouter, createWebHashHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'


const routes = [
  { path: '/login', name: 'login', component: () => import('../pages/Login.vue') },
  { path: '/', name: 'home', component: () => import('../pages/Home.vue'), meta: { showTabbar: true } },
  { path: '/category', name: 'category', component: () => import('../pages/Category.vue'), meta: { showTabbar: true } },
  { path: '/cart', name: 'cart', component: () => import('../pages/Cart.vue'), meta: { showTabbar: true, requiresAuth: true } },
  { path: '/profile', name: 'profile', component: () => import('../pages/Profile.vue'), meta: { showTabbar: true, requiresAuth: true } },
  { path: '/shop', name: 'shop', component: () => import('../pages/Shop.vue') },
  { path: '/shop-home', name: 'shop-home', component: () => import('../pages/ShopHome.vue') },
  { path: '/order-confirm', name: 'order-confirm', component: () => import('../pages/OrderConfirm.vue'), meta: { requiresAuth: true } },
  { path: '/orders', name: 'orders', component: () => import('../pages/Orders.vue'), meta: { showTabbar: false, requiresAuth: true } },
  { path: '/order/:id', name: 'order-detail', component: () => import('../pages/OrderDetail.vue'), meta: { showTabbar: false, requiresAuth: true } },
  { path: '/messages', name: 'messages', component: () => import('../pages/Messages.vue'), meta: { showTabbar: false, requiresAuth: true } },
  { path: '/messages/:id', name: 'message-detail', component: () => import('../pages/MessageDetail.vue'), meta: { showTabbar: false, requiresAuth: true } },
  { path: '/favorites', name: 'favorites', component: () => import('../pages/Favorites.vue'), meta: { showTabbar: false, requiresAuth: true } },
  { path: '/follows', name: 'follows', component: () => import('../pages/Follows.vue'), meta: { showTabbar: false, requiresAuth: true } },
  { path: '/footprints', name: 'footprints', component: () => import('../pages/Footprints.vue'), meta: { showTabbar: false, requiresAuth: true } },
  { path: '/activities', name: 'activities', component: () => import('../pages/Activities.vue'), meta: { showTabbar: false } },
  { path: '/addresses', name: 'addresses', component: () => import('../pages/Addresses.vue'), meta: { showTabbar: false, requiresAuth: true } },
  { path: '/account', name: 'account', component: () => import('../pages/Account.vue'), meta: { showTabbar: false, requiresAuth: true } },
  { path: '/support', name: 'support', component: () => import('../pages/Support.vue'), meta: { showTabbar: false } },
  { path: '/help', name: 'help', component: () => import('../pages/Help.vue'), meta: { showTabbar: false } },
  { path: '/product/:id', name: 'product', component: () => import('../pages/Product.vue') },
  { path: '/product', redirect: '/product/p1' },
  { path: '/search', name: 'search', component: () => import('../pages/Search.vue') },
  { path: '/pay-result', name: 'pay-result', component: () => import('../pages/PayResult.vue') },
  { path: '/product-list', name: 'product-list', component: () => import('../pages/ProductList.vue') },
  { path: '/refund', name: 'refund', component: () => import('../pages/Refund.vue'), meta: { requiresAuth: true } },
  { path: '/coupons', name: 'coupons', component: () => import('../pages/Coupons.vue') },
  { path: '/logistics', name: 'logistics', component: () => import('../pages/Logistics.vue'), meta: { requiresAuth: true } }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  if (to.meta.requiresAuth && !authStore.token) {
    next({ name: 'login', query: { redirect: to.fullPath } })
  } else {
    next()
  }
})

export default router
