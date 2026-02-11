<template>
  <div class="cart-page">
    <header class="cart-header">
      <button class="nav-back" @click="goBack">‹</button>
      <div class="cart-title">购物车</div>
      <div class="cart-actions">•••</div>
    </header>

    <div class="cart-address">
      <span>📍 朝阳区三环到四环之间</span>
      <span>管理商品</span>
    </div>

    <div class="cart-list">
      <div class="cart-store" v-for="store in stores" :key="store.name">
        <div class="store-head">
          <span class="store-tag">自营</span>
          <span class="store-name">{{ store.name }}</span>
          <span class="store-coupon">优惠券</span>
        </div>
        <div class="cart-item" v-for="item in store.items" :key="item.id">
          <button class="check" :class="{ active: item.checked }" @click="toggleItem(item)"></button>
          <img class="cart-thumb" :src="item.image" :alt="item.title" />
          <div class="cart-info">
            <div class="cart-title">{{ item.title }}</div>
            <div class="cart-sku">{{ item.sku }}</div>
            <div class="cart-promos">
              <span class="promo-tag" v-for="tag in item.promos" :key="tag">{{ tag }}</span>
            </div>
            <div class="cart-price-line">
              <div class="cart-price">¥{{ item.price.toFixed(2) }}</div>
              <div class="cart-price-old" v-if="item.old">¥{{ item.old.toFixed(2) }}</div>
            </div>
            <div class="cart-final" v-if="item.directSave">
              到手价 ¥{{ (item.price * item.qty - item.directSave).toFixed(2) }}
            </div>
          </div>
          <div class="cart-right">
            <div class="qty-box">
              <button class="qty-btn" @click="changeQty(item, -1)">-</button>
              <span>{{ item.qty }}</span>
              <button class="qty-btn" @click="changeQty(item, 1)">+</button>
            </div>
            <div class="cart-actions-mini">收藏 | 删除</div>
          </div>
        </div>
      </div>
    </div>

    <section class="cart-summary">
      <div class="summary-row">
        <span>优惠明细</span>
        <span class="summary-total">已优惠 ¥{{ discountTotal.toFixed(2) }}</span>
      </div>
      <div class="summary-row small">
        <span>商品直降</span>
        <span>-¥{{ directSave.toFixed(2) }}</span>
      </div>
      <div class="summary-row small">
        <span>店铺满减</span>
        <span>-¥{{ fullCutSave.toFixed(2) }}</span>
      </div>
      <div class="summary-row small">
        <span>优惠券</span>
        <span>-¥{{ couponSave.toFixed(2) }}</span>
      </div>
    </section>

    <div class="cart-footer">
      <button class="check" :class="{ active: allChecked }" @click="toggleAll"></button>
      <span>全选</span>
      <div class="cart-total">
        到手价: <span>¥{{ finalTotal.toFixed(2) }}</span>
      </div>
      <button class="cart-pay" @click="goCheckout">去结算({{ selectedCount }})</button>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { products } from '../mock/products'

const router = useRouter()
const goBack = () => router.back()

const stores = reactive([
  {
    name: '京东服务自营旗舰店',
    fullCut: { threshold: 199, discount: 20 },
    coupon: 10,
    items: [
      { id: 1, title: products[0].title, sku: '衣服任洗，2件/双', price: 65, image: products[0].image, old: 0, qty: 1, checked: true, promos: ['限时秒杀', '满199减20'], directSave: 5 },
      { id: 2, title: products[1].title, sku: '衣鞋任洗，2件/双', price: 65, image: products[1].image, old: 95, qty: 1, checked: true, promos: ['直降', '赠运费险'], directSave: 30 }
    ]
  },
  {
    name: '宫菱官方旗舰店',
    fullCut: { threshold: 500, discount: 50 },
    coupon: 0,
    items: [
      { id: 3, title: products[2].title, sku: 'MAXS 欧盟认证款 5L', price: 599, image: products[2].image, old: 899, qty: 1, checked: false, promos: ['满减', '满500减50'], directSave: 200 }
    ]
  }
])

const allItems = computed(() => stores.flatMap((s) => s.items))
const selectedItems = computed(() => allItems.value.filter((i) => i.checked))
const selectedCount = computed(() => selectedItems.value.length)
const allChecked = computed(() => selectedItems.value.length > 0 && selectedItems.value.length === allItems.value.length)

const subtotal = computed(() => selectedItems.value.reduce((sum, item) => sum + item.price * item.qty, 0))
const directSave = computed(() => selectedItems.value.reduce((sum, item) => sum + (item.directSave || 0), 0))
const fullCutSave = computed(() => {
  return stores.reduce((sum, store) => {
    const storeItems = store.items.filter((i) => i.checked)
    const storeTotal = storeItems.reduce((s, i) => s + i.price * i.qty, 0)
    if (storeItems.length && store.fullCut && storeTotal >= store.fullCut.threshold) {
      return sum + store.fullCut.discount
    }
    return sum
  }, 0)
})
const couponSave = computed(() => {
  return stores.reduce((sum, store) => {
    const storeItems = store.items.filter((i) => i.checked)
    if (storeItems.length && store.coupon) return sum + store.coupon
    return sum
  }, 0)
})
const discountTotal = computed(() => directSave.value + fullCutSave.value + couponSave.value)
const finalTotal = computed(() => Math.max(subtotal.value - discountTotal.value, 0))

const toggleItem = (item) => {
  item.checked = !item.checked
}

const toggleAll = () => {
  const next = !allChecked.value
  stores.forEach((store) => store.items.forEach((i) => { i.checked = next }))
}

const changeQty = (item, delta) => {
  const next = item.qty + delta
  item.qty = Math.max(1, next)
}

const goCheckout = () => {
  if (selectedCount.value === 0) return
  router.push('/order-confirm')
}
</script>
