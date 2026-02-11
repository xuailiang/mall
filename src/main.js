import { createApp } from 'vue'
import NutUI from '@nutui/nutui'
import '@nutui/nutui/dist/style.css'
import './styles/theme.css'
import './styles/base.css'
import './styles/sections.css'
import './styles/product-v2.css'
import './styles/order-confirm.css'
import './styles/shop-home.css'
import './styles/category.css'
import './styles/cart.css'
import './styles/order-list.css'
import './styles/order-detail.css'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(NutUI)
app.use(router)
app.mount('#app')
