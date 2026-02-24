<template>
  <div class="cart-page">
    <header class="cart-header">
      <button class="nav-back" @click="goBack">‹</button>
      <div class="cart-title">购物车({{ validItems.length }})</div>
      <div class="cart-actions" @click="toggleEditMode">{{ isEditMode ? '完成' : '编辑' }}</div>
    </header>

    <div class="cart-address" @click="showAddress = true">
      <span>📍 {{ currentAddress }}</span>
      <IconFont name="right" size="12" />
    </div>

    <div v-if="hasItems || hasInvalidItems" class="cart-list">
      <!-- 有效商品 -->
      <div class="cart-store" v-for="store in validStores" :key="store.name">
        <div class="store-head">
          <span class="store-tag">自营</span>
          <span class="store-name">{{ store.name }}</span>
          <span class="store-metrics" v-if="!isEditMode">
            已选{{ getStoreCheckedCount(store) }}件 · ¥{{ getStoreCheckedTotal(store).toFixed(2) }}
            <em v-if="getStoreDiscount(store) > 0">已省¥{{ getStoreDiscount(store).toFixed(2) }}</em>
          </span>
          <span class="store-coupon" @click="showCouponPopup(store)">领券</span>
        </div>
        
        <!-- 满减凑单提示 -->
        <div class="store-nudge" v-if="store.fullCut && !isEditMode">
          <template v-if="getStoreCheckedTotal(store) < store.fullCut.threshold">
            <span class="nudge-text">再买 ¥{{ (store.fullCut.threshold - getStoreCheckedTotal(store)).toFixed(2) }} 减 ¥{{ store.fullCut.discount }}</span>
            <span class="nudge-action" @click="goHome">去凑单 ›</span>
          </template>
          <template v-else>
            <span class="nudge-text success">已满 ¥{{ store.fullCut.threshold }} 减 ¥{{ store.fullCut.discount }}</span>
          </template>
        </div>

        <div class="cart-item" v-for="item in store.items" :key="item.id">
          <div
            class="cart-swipe"
            :class="{ open: item.swiped }"
            @click.capture="handleSwipeContainerClick(item, $event)"
            @touchstart="onTouchStart(item, $event)"
            @touchmove="onTouchMove(item, $event)"
            @touchend="onTouchEnd(item)"
          >
            <div class="cart-swipe-content">
              <button class="check" :class="{ active: item.checked }" @click="toggleItem(item)"></button>
              <div class="cart-img-box">
                <img class="cart-thumb" :src="item.image" :alt="item.title" @load="item.loaded = true" :class="{ loading: !item.loaded }" />
                <div v-if="!item.loaded" class="skeleton-img"></div>
              </div>
              <div class="cart-info">
                <div class="cart-title">{{ item.title }}</div>
                <div class="info-row">
                  <span class="cart-sku">{{ item.sku }}</span>
                  <span class="saw-and-saw" @click="router.push('/')">看了又看</span>
                </div>
                <div class="cart-promos">
                  <span class="promo-tag" v-for="tag in visiblePromos(item)" :key="tag">{{ tag }}</span>
                  <span v-if="hiddenPromoCount(item) > 0" class="promo-tag promo-more">+{{ hiddenPromoCount(item) }}</span>
                </div>
                <div class="cart-price-line">
                  <span class="cart-price">
                    ¥{{ Math.floor(item.price) }}.<small>{{ (item.price % 1).toFixed(2).substring(2) }}</small>
                  </span>
                  <span class="price-drop" v-if="item.priceDrop">降¥{{ item.priceDrop }}</span>
                </div>
              </div>
              <div class="cart-right-wrapper">
                <div class="cart-est-container">
                  <span class="cart-est">到手 ¥{{ getEstimatedPrice(item).toFixed(2) }}</span>
                  <div class="cart-final" v-if="item.directSave > 0">
                    已优惠 ¥{{ ((item.directSave || 0) * item.qty).toFixed(2) }}
                  </div>
                </div>
                <div class="cart-right">
                <div class="qty-box">
                  <button class="qty-btn" :disabled="item.qty <= 1" @click="changeQty(item, -1)">-</button>
                  <input class="qty-input" type="number" :value="item.qty" @input="e => setQty(item, e.target.value)" />
                  <button class="qty-btn" @click="changeQty(item, 1)">+</button>
                </div>
                </div>
              </div>
            </div>
            <button class="cart-swipe-delete" @click="confirmDelete(item)">删除</button>
            <button class="cart-swipe-delete" @click="confirmDelete(item)">删除</button>
          </div>
        </div>
      </div>

      <!-- 失效商品 -->
      <div v-if="hasInvalidItems" class="cart-invalid-section">
        <div class="invalid-header">
          <span>失效商品</span>
          <button class="clear-invalid-btn" @click="clearInvalidItems">清空失效商品</button>
        </div>
        <div class="cart-store invalid-store" v-for="store in invalidStores" :key="'invalid-' + store.name">
          <div v-for="item in store.items" :key="item.id" class="cart-item-invalid">
            <img class="cart-thumb" :src="item.image" :alt="item.title" />
            <div class="cart-info">
              <div class="cart-title">{{ item.title }}</div>
              <div class="cart-sku">{{ item.sku }}</div>
              <div class="invalid-tag">商品已失效</div>
            </div>
            <button class="remove-invalid-btn" @click="confirmDelete(item)">×</button>
          </div>
        </div>
      </div>
    </div>

    <section v-if="hasItems" class="cart-summary">
      <div class="summary-row">
        <span>优惠明细</span>
        <span class="summary-total">已优惠 <em>¥{{ discountTotal.toFixed(2) }}</em></span>
        <button class="summary-toggle" @click="summaryOpen = !summaryOpen">
          {{ summaryOpen ? '收起' : '展开' }}
        </button>
      </div>
      <div v-if="summaryOpen" class="summary-row small">
        <span>商品直降</span>
        <span>-¥{{ directSave.toFixed(2) }}</span>
      </div>
      <div v-if="summaryOpen" class="summary-row small">
        <span>店铺满减</span>
        <span>-¥{{ fullCutSave.toFixed(2) }}</span>
      </div>
      <div v-if="summaryOpen" class="summary-row small">
        <span>优惠券</span>
        <span>-¥{{ couponSave.toFixed(2) }}</span>
      </div>
    </section>

    <div v-if="hasItems" class="cart-footer">
      <div class="footer-left">
        <button class="check" :class="{ active: allChecked }" @click="toggleAll"></button>
        <span>全选</span>
      </div>
      
      <div class="footer-center" v-if="!isEditMode">
        <div class="cart-total">
          总计: <span>¥{{ Math.floor(finalTotal) }}.<small>{{ (finalTotal % 1).toFixed(2).substring(2) }}</small></span>
        </div>
        <div class="savings-badge" v-if="discountTotal > 0">已省 ¥{{ discountTotal.toFixed(2) }}</div>
      </div>

      <div class="footer-right">
        <template v-if="isEditMode">
          <button class="footer-btn ghost" @click="moveToWishlist">移入收藏</button>
          <button class="footer-btn danger" @click="confirmDeleteSelected">删除({{ selectedCount }})</button>
        </template>
        <template v-else>
          <button class="cart-pay" @click="goCheckout">去结算({{ selectedCount }})</button>
        </template>
      </div>
    </div>

    <div v-if="!hasItems && !hasInvalidItems" class="cart-empty-wrapper">
      <div class="cart-empty">
        <div class="empty-icon">🛒</div>
        <div class="empty-title">购物车空空如也</div>
        <div class="empty-sub">快去挑选喜欢的商品吧</div>
        <button class="empty-btn" @click="goHome">去逛逛</button>
      </div>
      
      <div class="guess-like">
        <div class="guess-title">猜你喜欢</div>
        <div class="home-grid">
          <div class="home-good" v-for="item in recommend" :key="item.id" @click="router.push(`/product/${item.id}`)">
            <img :src="item.image" :alt="item.title" />
            <div class="home-good-title">{{ item.title }}</div>
            <div class="home-good-price">¥{{ item.price }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 优惠券弹窗 -->
    <nut-popup v-model:visible="showCoupon" position="bottom" round>
      <div class="coupon-popup">
        <div class="popup-header">
          <span>{{ currentStore?.name }} 优惠券</span>
          <span class="popup-close" @click="showCoupon = false">×</span>
        </div>
        <div class="coupon-list">
          <div v-for="coupon in availableCoupons" :key="coupon.id" class="coupon-item-card">
            <div class="coupon-left">
              <div class="coupon-amount">¥{{ coupon.amount }}</div>
              <div class="coupon-condition">满{{ coupon.threshold }}可用</div>
            </div>
            <div class="coupon-right">
              <div class="coupon-name">{{ coupon.name }}</div>
              <div class="coupon-expire">有效期至 {{ coupon.expireDate }}</div>
            </div>
            <button 
              class="coupon-claim-btn" 
              :class="{ claimed: coupon.claimed }"
              @click="claimCoupon(coupon)"
            >
              {{ coupon.claimed ? '已领取' : '立即领取' }}
            </button>
          </div>
        </div>
      </div>
    </nut-popup>

    <!-- 地址选择弹窗 (Mockup) -->
    <nut-popup v-model:visible="showAddress" position="bottom" round>
      <div class="address-popup">
        <div class="popup-header">选择收货地址</div>
        <div class="address-list">
          <div class="address-item active">
            <IconFont name="location" size="14" />
            <div class="address-info">朝阳区三环到四环之间</div>
            <IconFont name="check" size="14" color="#ff3b30" />
          </div>
          <div class="address-item">
            <IconFont name="location" size="14" />
            <div class="address-info">海淀区知春路某某大厦</div>
          </div>
        </div>
        <button class="add-address-btn">+ 新增地址</button>
      </div>
    </nut-popup>

    <!-- 确认弹窗 (Mockup using nut-popup since dialog is complex) -->
    <nut-popup v-model:visible="showDeleteConfirm" position="center" round :style="{ width: '280px' }">
      <div class="confirm-popup">
        <div class="confirm-text">确定从购物车内删除该商品吗？</div>
        <div class="confirm-btns">
          <button class="confirm-btn cancel" @click="showDeleteConfirm = false">取消</button>
          <button class="confirm-btn danger" @click="executeDelete">确定</button>
        </div>
      </div>
    </nut-popup>
  </div>
</template>

<script setup>
import { computed, reactive, ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { products } from '../mock/products'
import { getProducts } from '../api/products'
import { useCartStore } from '../stores/cart'
import { storeToRefs } from 'pinia'
import { IconFont } from '@nutui/icons-vue'

const router = useRouter()
const cartStore = useCartStore()
const { 
  stores, allItems, validItems, hasItems, selectedItems, selectedCount, allChecked, 
  subtotal, directSave, fullCutSave, couponSave, discountTotal, finalTotal, isEditMode 
} = storeToRefs(cartStore)

const goBack = () => router.back()
const goHome = () => router.push('/')
const summaryOpen = ref(false)
const recommend = ref([])

// Edit Mode
const toggleEditMode = () => cartStore.toggleEditMode()

// Address selection
const showAddress = ref(false)
const currentAddress = ref('朝阳区三环到四环之间')

// Delete confirmation
const showDeleteConfirm = ref(false)
const pendingDeleteItem = ref(null)
const pendingDeleteBatch = ref(false)

const confirmDelete = (item) => {
  pendingDeleteItem.value = item
  pendingDeleteBatch.value = false
  showDeleteConfirm.value = true
}

const confirmDeleteSelected = () => {
  if (selectedCount.value === 0) return
  pendingDeleteBatch.value = true
  showDeleteConfirm.value = true
}

const executeDelete = () => {
  if (pendingDeleteBatch.value) {
    cartStore.deleteSelected()
  } else if (pendingDeleteItem.value) {
    cartStore.removeItem(pendingDeleteItem.value)
  }
  showDeleteConfirm.value = false
  pendingDeleteItem.value = null
}

const moveToWishlist = () => {
  if (selectedCount.value === 0) return
  // Mockup: in real app we'd call an API
  cartStore.deleteSelected()
}

const getStoreCheckedTotal = (store) => {
  return store.items
    .filter(i => !i.invalid && i.checked)
    .reduce((sum, item) => sum + item.price * item.qty, 0)
}

const getStoreCheckedCount = (store) => {
  return store.items
    .filter(i => !i.invalid && i.checked)
    .reduce((sum, item) => sum + item.qty, 0)
}

const getStoreDiscount = (store) => {
  const selected = store.items.filter((item) => !item.invalid && item.checked)
  if (!selected.length) return 0
  const direct = selected.reduce((sum, item) => sum + (item.directSave || 0) * item.qty, 0)
  const total = selected.reduce((sum, item) => sum + item.price * item.qty, 0)
  const fullCut = store.fullCut && total >= store.fullCut.threshold ? store.fullCut.discount : 0
  const coupon = store.coupon || 0
  return direct + fullCut + coupon
}

const getEstimatedPrice = (item) => {
  const directSave = (item.directSave || 0) * item.qty
  return Math.max(item.price * item.qty - directSave, 0)
}

// Coupon popup
const showCoupon = ref(false)
const currentStore = ref(null)
const availableCoupons = ref([
  { id: 1, name: '店铺满减券', amount: 20, threshold: 199, expireDate: '2026-03-01', claimed: false },
  { id: 2, name: '新人专享券', amount: 50, threshold: 299, expireDate: '2026-03-15', claimed: false },
  { id: 3, name: '品类券', amount: 10, threshold: 99, expireDate: '2026-02-28', claimed: true }
])

// Invalid items
const validStores = computed(() => {
  return stores.value
    .map(store => ({
      ...store,
      items: store.items.filter(item => !item.invalid)
    }))
    .filter(store => store.items.length > 0)
})

const hasInvalidItems = computed(() => {
  return stores.value.some(store => store.items.some(item => item.invalid))
})

const invalidStores = computed(() => {
  return stores.value
    .map(store => ({
      name: store.name,
      items: store.items.filter(item => item.invalid)
    }))
    .filter(store => store.items.length > 0)
})

const showCouponPopup = (store) => {
  currentStore.value = store
  showCoupon.value = true
}

const claimCoupon = (coupon) => {
  if (!coupon.claimed) {
    coupon.claimed = true
  }
}

const clearInvalidItems = () => {
  cartStore.stores.forEach(store => {
    store.items = store.items.filter(item => !item.invalid)
  })
}

onMounted(async () => {
  window.addEventListener('scroll', closeAllSwipes, { passive: true })
  const data = await getProducts()
  recommend.value = data
  
  if (cartStore.stores.length === 0) {
    cartStore.initCart([
      {
        name: '京东服务自营旗舰店',
        fullCut: { threshold: 199, discount: 20 },
        coupon: 10,
        items: [
          { id: 1, title: products[0].title, sku: '衣服任洗，2件/双', price: 65, image: products[0].image, old: 0, qty: 1, checked: true, promos: ['限时秒杀', '满199减20'], directSave: 5, swiped: false, invalid: false, priceDrop: 5, loaded: false },
          { id: 2, title: products[1].title, sku: '衣鞋任洗，2件/双', price: 65, image: products[1].image, old: 95, qty: 1, checked: true, promos: ['直降', '赠运费险'], directSave: 30, swiped: false, invalid: false, priceDrop: 0, loaded: false }
        ]
      },
      {
        name: '宫菱官方旗舰店',
        fullCut: { threshold: 500, discount: 50 },
        coupon: 0,
        items: [
          { id: 3, title: products[2].title, sku: 'MAXS 欧盟认证款 5L', price: 599, image: products[2].image, old: 899, qty: 1, checked: false, promos: ['满减', '满500减50'], directSave: 200, swiped: false, invalid: false, priceDrop: 10, loaded: false },
          { id: 4, title: products[3].title, sku: '已下架', price: 299, image: products[3].image, old: 399, qty: 1, checked: false, promos: [], directSave: 0, swiped: false, invalid: true, priceDrop: 0, loaded: false }
        ]
      }
    ])
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', closeAllSwipes)
})

// Swipe to delete
const swipeState = reactive({
  startX: 0,
  currentX: 0,
  startY: 0,
  currentY: 0,
  swipingId: null
})

const closeAllSwipes = (exceptId = null) => {
  cartStore.stores.forEach((store) =>
    store.items.forEach((i) => {
      if (exceptId !== null && i.id === exceptId) return
      i.swiped = false
    })
  )
}

const onTouchStart = (item, e) => {
  closeAllSwipes(item.id)
  swipeState.startX = e.touches[0].clientX
  swipeState.startY = e.touches[0].clientY
  swipeState.currentX = swipeState.startX
  swipeState.currentY = swipeState.startY
  swipeState.swipingId = item.id
}

const onTouchMove = (item, e) => {
  if (swipeState.swipingId !== item.id) return
  swipeState.currentX = e.touches[0].clientX
  swipeState.currentY = e.touches[0].clientY
  const diff = swipeState.currentX - swipeState.startX
  const diffY = Math.abs(swipeState.currentY - swipeState.startY)
  if (diffY > 12) return
  if (Math.abs(diff) < 6) return
  if (e.cancelable) e.preventDefault()
  if (diff < -20) {
    closeAllSwipes()
    item.swiped = true
  } else if (diff > 20) {
    item.swiped = false
  }
}

const onTouchEnd = (item) => {
  const diff = swipeState.currentX - swipeState.startX
  if (diff > 40) {
    item.swiped = false
  } else if (diff < -40) {
    closeAllSwipes()
    item.swiped = true
  }
  swipeState.swipingId = null
}

const handleSwipeContainerClick = (item, e) => {
  if (!item.swiped) return
  if (e.target.closest('.cart-swipe-delete')) return
  e.preventDefault()
  e.stopPropagation()
  item.swiped = false
}

const toggleItem = (item) => {
  cartStore.toggleItem(item)
}

const toggleAll = () => {
  cartStore.toggleAll()
}

const changeQty = (item, delta) => {
  cartStore.changeQty(item, delta)
}

const setQty = (item, value) => {
  cartStore.setQty(item, value)
}

const removeItem = (item) => {
  cartStore.removeItem(item)
}

const visiblePromos = (item) => {
  const list = item.promos || []
  return list.slice(0, 2)
}

const hiddenPromoCount = (item) => {
  const total = item.promos ? item.promos.length : 0
  return Math.max(total - 2, 0)
}

const goCheckout = () => {
  if (selectedCount.value === 0) return
  router.push('/order-confirm')
}
</script>
