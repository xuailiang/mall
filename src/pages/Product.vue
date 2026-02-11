<template>
  <div class="product-page v2">
    <header
      class="navbar product-navbar"
      :class="{ 'nav-scrolled': isScrolled }"
      :style="{ '--nav-alpha': navAlpha }"
    >
    <div class="nav-btn" aria-label="返回" @click="goBack">
        <svg class="svg-icon" viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
      </div>
      <div class="nav-tabs">
        <span class="nav-tab" :class="{ active: activeTab === 'product' }" @click="scrollToSection('product')">商品</span>
        <span class="nav-tab" :class="{ active: activeTab === 'reviews' }" @click="scrollToSection('reviews')">评价</span>
        <span class="nav-tab" :class="{ active: activeTab === 'detail' }" @click="scrollToSection('detail')">详情</span>
        <span class="nav-tab" :class="{ active: activeTab === 'recommend' }" @click="scrollToSection('recommend')">推荐</span>
      </div>
      <div class="nav-btn" aria-label="更多" @click="shareProduct">
        <svg class="svg-icon" viewBox="0 0 24 24"><path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>
      </div>
    </header>

    <div class="hero">
      <nut-swiper :auto-play="3500" loop>
        <nut-swiper-item v-for="(item, idx) in featureCards" :key="idx">
          <img
            class="hero-image"
            :class="{ loaded: heroLoaded[idx] }"
            :src="item.img"
            :alt="item.title"
            loading="lazy"
            @load="markHeroLoaded(idx)"
          />
        </nut-swiper-item>
      </nut-swiper>
      <div class="hero-mask"></div>
    </div>

    <section id="product" class="price-bar" :class="`price-bar--${priceStyle.type}`">
      <div class="price-left">
        <span class="price-main">¥{{ currentPrice }}</span>
        <span v-if="priceStyle.label" class="price-tag">{{ priceStyle.label }}</span>
        <span class="price-old" v-if="priceStyle.showOld">¥{{ currentProduct.original }}</span>
      </div>
      <div v-if="priceStyle.showCountdown" class="price-right">
        <div class="price-countdown-title">距离结束还剩</div>
        <div class="price-countdown">
          <span class="cd-box">08</span>:
          <span class="cd-box">15</span>:
          <span class="cd-box">36</span>
        </div>
      </div>
      <div v-else class="price-right price-right-info">
        <div class="price-right-pill">
          <span class="pill-dot"></span>
          <span>{{ priceStyle.sidePill }}</span>
        </div>
        <div class="price-right-main">{{ priceStyle.sideTitle }}</div>
        <div class="price-right-sub">{{ priceStyle.sideSub }}</div>
      </div>
      <div v-if="priceStyle.tip" class="price-tip">{{ priceStyle.tip }}</div>
    </section>

      <div class="vip-card clickable">
      <div class="vip-left">
        <span class="vip-icon">👑</span>
        <span>PLUS会员享尊贵特权，购物更有超值优惠</span>
      </div>
      <span class="vip-more">></span>
    </div>

    <section class="title-block overlay-title">
      <div class="title-header">
        <div class="title-text">{{ currentProduct.title }}</div>
        <button class="share-btn share-top" @click="shareProduct">分享</button>
      </div>
      <div class="title-sub">已售 1 万+ · 好评率 99%</div>
      <div class="title-actions">
        <span class="chip chip-outline">京东自营</span>
        <span class="chip chip-dark">严选</span>
      </div>
      <div class="tag-row">
        <span class="tag-lite">免费上门退换</span>
        <span class="tag-lite">闪电退款</span>
      </div>
    </section>

      <section class="card-list">
        <div class="cell-row" @click="openSku('cart')">
          <span class="cell-tit">选择</span>
          <div class="cell-val">已选：{{ selectedSize }} {{ selectedColor }} {{ skuCount }}件</div>
          <div class="cell-more">···</div>
        </div>
        <div class="cell-row" @click="showCoupon = true">
          <span class="cell-tit">优惠</span>
          <div class="cell-val">
            <span class="tag-lite tag-action">年货节</span>
            <span class="tag-lite tag-action">无门槛立减金</span>
            <span class="tag-lite tag-action">高价回收</span>
          </div>
          <div class="cell-more">···</div>
        </div>
      <div class="cell-row" @click="showAddress = true">
        <span class="cell-tit">配送</span>
        <div class="cell-val">预计今天发货，2月8日24:00前送达</div>
        <div class="cell-more">···</div>
      </div>
      <div class="cell-row">
        <span class="cell-tit">服务</span>
        <div class="cell-val">免费上门退换 · 闪电退款 · 7天无理由</div>
        <div class="cell-more">···</div>
      </div>
    </section>

    <section class="rank-card">
      <span class="rank-badge">排行榜</span>
      <span>800元以上空气炸锅热卖榜 · 第1名</span>
      <span class="rank-more">></span>
    </section>

    <section id="reviews" class="section">
      <div class="section-title">
        <span>商品评价</span>
        <span class="hint">98% 好评</span>
      </div>
      <div class="review-card" v-for="item in reviews" :key="item.id">
        <div class="review-head">
          <div class="review-user">
            <nut-avatar size="32" />
            <div>
              <div class="review-name">{{ item.name }}</div>
              <div class="list-meta">{{ item.date }}</div>
            </div>
          </div>
          <nut-rate v-model="item.rate" readonly />
        </div>
        <div class="review-content">{{ item.content }}</div>
        <div class="review-tags">
          <nut-tag v-for="tag in item.tags" :key="tag" type="primary">{{ tag }}</nut-tag>
        </div>
      </div>
    </section>

      <section id="detail" class="section">
        <div class="section-title">
          <span>图文详情</span>
          <span class="hint">真实展示</span>
        </div>
        <div class="detail-images">
          <img
            v-for="(img, idx) in currentProduct.detailImages"
            :key="idx"
            class="detail-image"
            :class="{ loaded: detailLoaded[idx] }"
            :src="img"
            :alt="currentProduct.title"
            loading="lazy"
            @load="markDetailLoaded(idx)"
          />
        </div>
      </section>

    <section id="recommend" class="section">
      <div class="section-title">
        <span>为你推荐</span>
        <span class="hint">猜你喜欢</span>
      </div>
      <div class="recommend-grid">
        <div class="recommend-card" v-for="item in recommendList" :key="item.id">
          <img :src="item.image" :alt="item.title" />
          <div class="recommend-title">{{ item.title }}</div>
          <div class="recommend-price">¥{{ item.price }}</div>
        </div>
      </div>
    </section>

    <div class="shop-link-card" @click="router.push('/shop-home')">
      <img class="shop-link-avatar" :src="currentProduct.image" :alt="currentProduct.title" />
      <div class="shop-link-info">
        <div class="shop-link-title">天猫旗舰店</div>
        <div class="shop-link-sub">官方旗舰 · 关注有礼</div>
      </div>
      <button class="shop-link-btn">进店</button>
    </div>

    <div class="footer v2">
      <div class="foot-icons">
        <div class="foot-item">
          <svg class="svg-icon" viewBox="0 0 24 24"><path d="M3 7h18l2 6H1l2-6zm2 8h14v6H5v-6zm3 1v4h2v-4H8zm6 0v4h2v-4h-2z"/></svg>
          <span>店铺</span>
        </div>
        <div class="foot-item">
          <svg class="svg-icon" viewBox="0 0 24 24"><path d="M12 2a9 9 0 0 0-9 9v3a3 3 0 0 0 3 3h2v-5H6v-2a6 6 0 1 1 12 0v2h-2v5h2a3 3 0 0 0 3-3v-3a9 9 0 0 0-9-9zm-2 15h4v2h-4v-2z"/></svg>
          <span>客服</span>
        </div>
        <div class="foot-item">
          <svg class="svg-icon" viewBox="0 0 24 24"><path d="M7 18a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm10 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM6.2 6l.6 3h11.5a1 1 0 0 1 .98 1.2l-1.1 5.2a2 2 0 0 1-1.96 1.6H8.1a2 2 0 0 1-1.96-1.6L4.3 4H2V2h3a1 1 0 0 1 .98.8L6.2 6z"/></svg>
          <span>购物车</span>
        </div>
      </div>
      <div class="foot-btns">
        <button class="f-btn btn-add" @click="openSku('cart')">加入购物车</button>
        <button class="f-btn btn-buy" @click="openSku('buy')">立即购买</button>
      </div>
    </div>

    <nut-popup v-model:visible="showVideo" position="bottom" round>
      <div class="popup">
        <div class="popup-header">
          <span>商品视频</span>
          <nut-icon name="close" @click="showVideo = false" />
        </div>
        <video class="video-player" :src="currentProduct.video" controls playsinline></video>
      </div>
    </nut-popup>

    <nut-popup v-model:visible="showCoupon" position="bottom" round>
      <div class="popup">
        <div class="popup-header">
          <span>可用优惠</span>
          <button class="btn-outline btn-claim-all">一键领取</button>
          <nut-icon name="close" @click="showCoupon = false" />
        </div>
        <div class="coupon-list">
          <div
            class="coupon-item"
            v-for="item in sortedCoupons"
            :key="item.id"
            :class="[item.type, { claimed: item.claimed }]"
          >
            <div class="coupon-left">
              <div class="coupon-price">¥{{ item.value }}</div>
              <div class="coupon-limit">满 {{ item.limit }} 可用</div>
            </div>
            <div class="coupon-right">
              <div class="coupon-title">{{ item.title }}</div>
              <div class="coupon-time">{{ item.time }}</div>
              <div class="coupon-ttl">剩余 {{ item.days }} 天</div>
              <button class="btn-outline" :disabled="item.claimed" @click="claimCoupon(item)">
                {{ item.claimed ? '已领取' : '领取' }}
              </button>
            </div>
            <span v-if="item.claimed" class="coupon-stamp">已领取</span>
          </div>
        </div>
      </div>
    </nut-popup>

    <nut-popup v-model:visible="showAddress" position="bottom" round>
      <div class="popup">
        <div class="popup-header">
          <span>配送至</span>
          <nut-icon name="close" @click="showAddress = false" />
        </div>
        <div
          class="address-item"
          v-for="item in addresses"
          :key="item.id"
          :class="{ active: item.id === selectedAddressId }"
          @click="selectAddress(item.id)"
        >
          <div>
            <div class="list-title">{{ item.name }} {{ item.phone }}</div>
            <div class="list-meta">{{ item.detail }}</div>
          </div>
          <nut-tag v-if="item.default" type="primary">默认</nut-tag>
        </div>
        <button class="btn-solid" style="width: 100%;">新增地址</button>
      </div>
    </nut-popup>

    <nut-popup v-model:visible="showSku" position="bottom" round :overlay="true">
      <div class="sku-panel">
        <div class="popup-header">
          <span>选择规格</span>
          <nut-icon name="close" @click="showSku = false" />
        </div>
        <div class="sku-head">
          <img class="sku-thumb" :src="currentProduct.image" :alt="currentProduct.title" />
          <div class="sku-meta">
            <div class="sku-price">¥{{ currentPrice }}</div>
            <div class="sku-stock">库存 {{ currentStock }} 件</div>
            <div class="sku-selected">已选：{{ selectedSize }} {{ selectedColor }}，{{ skuCount }}件</div>
          </div>
        </div>
        <div class="sku-body">
          <div class="opt-group">
            <div class="opt-tit">型号</div>
            <div class="opt-list">
              <button
                v-for="size in sizes"
                :key="size"
                class="opt-btn"
                :class="{ sel: size === selectedSize, disabled: isSizeDisabled(size) }"
                @click="selectSize(size)"
              >
                {{ size }}
                <span v-if="isSizeDisabled(size)" class="opt-badge">缺货</span>
              </button>
            </div>
          </div>
          <div class="opt-group">
            <div class="opt-tit">颜色</div>
            <div class="opt-list">
              <button
                v-for="color in colors"
                :key="color"
                class="opt-btn"
                :class="{ sel: color === selectedColor, disabled: isColorDisabled(color) }"
                @click="selectColor(color)"
              >
                {{ color }}
                <span v-if="isColorDisabled(color)" class="opt-badge">缺货</span>
              </button>
            </div>
          </div>
          <div class="opt-group">
            <div class="opt-tit">数量</div>
            <div class="stepper-row">
              <div class="qty-stepper">
                <button class="qty-btn" :disabled="skuCount <= 1" @click="decQty">-</button>
                <span class="qty-num">{{ skuCount }}</span>
                <button class="qty-btn" :disabled="skuCount >= currentStock" @click="incQty">+</button>
              </div>
              <span class="qty-text">当前 {{ skuCount }} 件</span>
            </div>
          </div>
        </div>
        <button class="sku-confirm" :disabled="currentStock === 0" @click="confirmSkuBuy">
          {{ skuAction === 'buy' ? '确认并购买' : '确认加入购物车' }}
        </button>
      </div>
    </nut-popup>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { products } from '../mock/products'

const route = useRoute()
const router = useRouter()

const currentProduct = computed(() => {
  const found = products.find((item) => item.id === route.params.id)
  return found || products[0]
})

const featureCards = computed(() => {
  const imgs = currentProduct.value.gallery || []
  return [
    { img: imgs[0] || currentProduct.value.image, title: '储能型304不锈钢' },
    { img: imgs[1] || currentProduct.value.image, title: '5L容量 | 1500W功率' },
    { img: imgs[2] || currentProduct.value.image, title: 'WOS智能控温算法' },
    { img: imgs[1] || currentProduct.value.image, title: '蜂窝式双通道' },
    { img: imgs[2] || currentProduct.value.image, title: '有机硅不沾涂层' },
    { img: imgs[0] || currentProduct.value.image, title: '多层复合结构钢' }
  ]
})

const isScrolled = ref(false)
const navAlpha = ref(0)
const activeTab = ref('product')
const handleScroll = () => {
  const y = window.scrollY
  const ratio = Math.min(Math.max((y - 10) / 80, 0), 1)
  navAlpha.value = ratio
  isScrolled.value = ratio > 0.6
  updateActiveTab()
}

const showVideo = ref(false)
const showCoupon = ref(false)
const showAddress = ref(false)
const showSku = ref(false)
const skuAction = ref('cart')
const skuCount = ref(1)
const heroLoaded = ref([])
const detailLoaded = ref([])

const coupons = ref([
  { id: 1, value: 10, limit: 280, title: '跨店满减券', time: '有效期至 2026-03-01', days: 24, claimed: false, type: 'coupon-hot' },
  { id: 2, value: 25, limit: 500, title: '店铺专享券', time: '有效期至 2026-03-15', days: 38, claimed: false, type: 'coupon-vip' },
  { id: 3, value: 5, limit: 99, title: '新客优惠券', time: '有效期至 2026-03-10', days: 33, claimed: false, type: 'coupon-small' }
])

const sortedCoupons = computed(() => {
  return [...coupons.value].sort((a, b) => Number(a.claimed) - Number(b.claimed))
})

const claimCoupon = (item) => {
  if (item.claimed) return
  item.claimed = true
}

const addresses = [
  {
    id: 1,
    name: '啊啊啊',
    phone: '135****0329',
    detail: '山东济南市历城区城子街道新源大街 888 号',
    default: true
  },
  {
    id: 2,
    name: '徐爱亮',
    phone: '135****0329',
    detail: '山东济南市高新区舜华路街道齐新源大街 888 号',
    default: false
  },
  {
    id: 3,
    name: '赵赵赵',
    phone: '135****0329',
    detail: '山东济南市历下区鱼柳街道鱼柳庄球场超市菜鸟驿站',
    default: false
  }
]

const selectedAddressId = ref(addresses.find((item) => item.default)?.id ?? addresses[0].id)

const selectAddress = (id) => {
  selectedAddressId.value = id
}

const sizes = ['60x30x150', '80x30x180']
const colors = ['田园橡木色', '胡桃木色']

const skuMap = {
  '60x30x150|田园橡木色': { price: '230.00', stock: 38 },
  '60x30x150|胡桃木色': { price: '240.00', stock: 0 },
  '80x30x180|田园橡木色': { price: '259.00', stock: 20 },
  '80x30x180|胡桃木色': { price: '269.00', stock: 6 }
}

const selectedSize = ref(sizes[0])
const selectedColor = ref(colors[0])

const skuKey = computed(() => `${selectedSize.value}|${selectedColor.value}`)
const currentSku = computed(() => skuMap[skuKey.value] ?? { price: '0.00', stock: 0 })
const currentPrice = computed(() => currentSku.value.price)
const currentStock = computed(() => currentSku.value.stock)

const isSizeDisabled = (size) => {
  return colors.every((color) => (skuMap[`${size}|${color}`]?.stock ?? 0) === 0)
}

const isColorDisabled = (color) => {
  return sizes.every((size) => (skuMap[`${size}|${color}`]?.stock ?? 0) === 0)
}

const selectSize = (val) => {
  if (isSizeDisabled(val)) return
  selectedSize.value = val
  if ((skuMap[skuKey.value]?.stock ?? 0) === 0) {
    const nextColor = colors.find((color) => (skuMap[`${val}|${color}`]?.stock ?? 0) > 0)
    if (nextColor) selectedColor.value = nextColor
  }
  if (skuCount.value > currentStock.value) {
    skuCount.value = currentStock.value || 1
  }
}

const selectColor = (val) => {
  if (isColorDisabled(val)) return
  selectedColor.value = val
  if ((skuMap[skuKey.value]?.stock ?? 0) === 0) {
    const nextSize = sizes.find((size) => (skuMap[`${size}|${val}`]?.stock ?? 0) > 0)
    if (nextSize) selectedSize.value = nextSize
  }
  if (skuCount.value > currentStock.value) {
    skuCount.value = currentStock.value || 1
  }
}

const decQty = () => {
  skuCount.value = Math.max(1, skuCount.value - 1)
}

const incQty = () => {
  skuCount.value = Math.min(currentStock.value || 1, skuCount.value + 1)
}

const reviews = ref([
  {
    id: 1,
    name: '清风',
    date: '2026-02-04',
    rate: 5,
    content: '做工扎实，安装方便，收纳效果很好。',
    tags: ['结实', '好安装']
  },
  {
    id: 2,
    name: '阿宁',
    date: '2026-02-02',
    rate: 4,
    content: '颜色很正，和家里风格很搭，快递也快。',
    tags: ['颜值高', '发货快']
  }
])

const recommendList = computed(() => products.slice(0, 4))

const markHeroLoaded = (idx) => {
  heroLoaded.value[idx] = true
}

const markDetailLoaded = (idx) => {
  detailLoaded.value[idx] = true
}

const shareProduct = async () => {
  const data = {
    title: currentProduct.value.title,
    text: currentProduct.value.desc,
    url: window.location.href
  }
  if (navigator.share) {
    try {
      await navigator.share(data)
      return
    } catch (err) {
      // ignore cancel
    }
  }
  window.alert('已复制分享链接')
}

const priceStyleMap = {
  base: {
    type: 'base',
    label: '',
    showOld: false,
    showCountdown: false,
    tip: '',
    sidePill: '官方保障',
    sideTitle: '到货更快',
    sideSub: '京东快递 · 次日达'
  },
  seckill: {
    type: 'seckill',
    label: '到手价',
    showOld: true,
    showCountdown: true,
    tip: '限时秒杀 · 限量抢',
    sideTitle: '',
    sideSub: ''
  },
  fullcut: {
    type: 'fullcut',
    label: '满减后',
    showOld: true,
    showCountdown: false,
    tip: '满199减20 · 叠券更省',
    sidePill: '券后省钱',
    sideTitle: '今日可省',
    sideSub: '券后再减 ¥15'
  },
  direct: {
    type: 'direct',
    label: '直降',
    showOld: true,
    showCountdown: false,
    tip: '直降80 · 今日专享',
    sidePill: '限时特价',
    sideTitle: '明日恢复',
    sideSub: ''
  }
}

const priceStyle = computed(() => {
  const type = currentProduct.value?.promoType || 'base'
  const baseStyle = priceStyleMap[type] || priceStyleMap.base
  if (type === 'direct') {
    return {
      ...baseStyle,
      sideSub: `常规价 ¥${currentProduct.value.original}`
    }
  }
  return baseStyle
})

const goOrderConfirm = () => {
  router.push('/order-confirm')
}

const openSku = (action) => {
  skuAction.value = action
  showSku.value = true
}

const confirmSkuBuy = () => {
  showSku.value = false
  if (skuAction.value === 'buy') {
    goOrderConfirm()
  }
}

const goBack = () => {
  router.back()
}

const scrollToSection = (id) => {
  const el = document.getElementById(id)
  if (!el) return
  const top = el.offsetTop - 56
  window.scrollTo({ top, behavior: 'smooth' })
  activeTab.value = id
}

const updateActiveTab = () => {
  const ids = ['product', 'reviews', 'detail', 'recommend']
  const offset = 80
  for (let i = ids.length - 1; i >= 0; i -= 1) {
    const el = document.getElementById(ids[i])
    if (el && window.scrollY + offset >= el.offsetTop) {
      activeTab.value = ids[i]
      break
    }
  }
}

watch(showSku, (val) => {
  document.body.style.overflow = val ? 'hidden' : ''
})

onMounted(() => {
  handleScroll()
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.body.style.overflow = ''
})
</script>
