<template>
  <div class="product-page v2">
    <header
      class="navbar product-navbar"
      :class="{ 'nav-scrolled': isScrolled }"
      :style="{ '--nav-alpha': navAlpha }"
    >
    <div class="nav-btn" aria-label="返回" @click="goBack">
        <IconFont name="rect-left" />
      </div>
      <div class="nav-tabs">
        <span class="nav-tab" :class="{ active: activeTab === 'product' }" @click="scrollToSection('product')">商品</span>
        <span class="nav-tab" :class="{ active: activeTab === 'reviews' }" @click="scrollToSection('reviews')">评价</span>
        <span class="nav-tab" :class="{ active: activeTab === 'detail' }" @click="scrollToSection('detail')">详情</span>
        <span class="nav-tab" :class="{ active: activeTab === 'recommend' }" @click="scrollToSection('recommend')">推荐</span>
      </div>
      <div class="nav-btn" aria-label="更多" @click="shareProduct">
        <IconFont name="more-x" />
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
            <span
              v-for="item in couponPreviewList"
              :key="item.id"
              class="tag-lite tag-action"
            >
              {{ item.title }}
            </span>
            <span v-if="couponMoreCount > 0" class="tag-lite tag-more">更多优惠{{ couponMoreCount }}个</span>
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

    <section id="reviews" class="section review-section">
      <div class="section-title">
        <span>商品评价</span>
        <span class="hint">{{ positiveRate }}% 好评 · {{ reviews.length }}条</span>
      </div>
      <div class="review-summary">
        <div class="review-score-main">
          <span class="review-score-val">{{ reviewAverage.toFixed(1) }}</span>
          <span class="review-score-label">综合评分</span>
        </div>
        <div class="review-score-bars">
          <div class="score-line">
            <span>质量</span>
            <div class="score-track"><span style="width: 96%"></span></div>
          </div>
          <div class="score-line">
            <span>物流</span>
            <div class="score-track"><span style="width: 93%"></span></div>
          </div>
          <div class="score-line">
            <span>服务</span>
            <div class="score-track"><span style="width: 95%"></span></div>
          </div>
        </div>
      </div>
      <div class="review-filter-row">
        <button
          v-for="item in reviewFilterOptions"
          :key="item.value"
          class="review-filter-btn"
          :class="{ active: reviewFilter === item.value }"
          @click="reviewFilter = item.value"
        >
          {{ item.label }}
          <span v-if="item.count > 0">({{ item.count }})</span>
        </button>
        <button class="review-create-btn" @click="showReviewEditor = true">写评价</button>
      </div>
      <div class="review-card" v-for="item in filteredReviews" :key="item.id">
        <div class="review-head">
          <div class="review-user">
            <nut-avatar size="32" />
            <div>
              <div class="review-name">{{ item.name }}</div>
              <div class="list-meta">{{ item.date }}</div>
            </div>
          </div>
          <nut-rate :model-value="item.rate" readonly />
        </div>
        <div class="review-content">{{ item.content }}</div>
        <div class="review-tags">
          <nut-tag v-for="tag in item.tags" :key="tag" type="primary">{{ tag }}</nut-tag>
        </div>
        <div class="review-image-grid" v-if="item.images?.length">
          <img
            v-for="(img, index) in item.images"
            :key="`${item.id}-${index}`"
            :src="img"
            alt="评价图片"
          />
        </div>
        <div class="review-foot">
          <span class="review-meta">{{ item.rate >= 4 ? '推荐购买' : '一般' }}</span>
          <button class="review-like-btn" :class="{ active: item.liked }" @click="toggleReviewLike(item)">
            {{ item.liked ? '已赞' : '有帮助' }} {{ item.helpful }}
          </button>
        </div>
      </div>
      <div class="review-empty" v-if="!filteredReviews.length">
        暂无符合条件的评价，切换筛选试试
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
        <div class="foot-item" @click="router.push('/shop-home')">
          <IconFont name="shop" size="20" />
          <span>店铺</span>
        </div>
        <div class="foot-item">
          <IconFont name="service" size="20" />
          <span>客服</span>
        </div>
        <div class="foot-item" @click="router.push('/cart')">
          <IconFont name="cart" size="20" />
          <span v-if="cartCount > 0" class="foot-badge">{{ cartCount > 99 ? '99+' : cartCount }}</span>
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
        <div class="sku-summary-bar">
          <div class="sku-summary-main">已选：{{ selectedSize }} {{ selectedColor }}，{{ skuCount }}件</div>
          <div class="sku-summary-price">预计到手 ¥{{ (parseFloat(currentPrice) * skuCount).toFixed(2) }}</div>
        </div>
        <button class="sku-confirm" :disabled="currentStock === 0" @click="confirmSkuBuy">
          {{ skuAction === 'buy' ? '确认并购买' : '确认加入购物车' }}
        </button>
      </div>
    </nut-popup>

    <nut-popup v-model:visible="showReviewEditor" position="bottom" round>
      <div class="popup review-editor-popup">
        <div class="popup-header">
          <span>发布商品评价</span>
          <nut-icon name="close" @click="showReviewEditor = false" />
        </div>
        <div class="review-editor-section">
          <div class="review-editor-label">评分</div>
          <div class="review-editor-stars">
            <button
              v-for="star in 5"
              :key="star"
              class="star-btn"
              :class="{ active: star <= reviewDraft.rate }"
              @click="reviewDraft.rate = star"
            >★</button>
          </div>
        </div>
        <div class="review-editor-section">
          <div class="review-editor-label">评价内容</div>
          <textarea
            class="review-editor-textarea"
            maxlength="120"
            v-model.trim="reviewDraft.content"
            placeholder="说说你的真实使用感受，帮助更多买家"
          ></textarea>
          <div class="review-editor-limit">{{ reviewDraft.content.length }}/120</div>
        </div>
        <div class="review-editor-section">
          <div class="review-editor-label">评价标签</div>
          <div class="review-editor-tags">
            <button
              v-for="tag in reviewTagLibrary"
              :key="tag"
              class="review-tag-btn"
              :class="{ active: reviewDraft.tags.includes(tag) }"
              @click="toggleDraftTag(tag)"
            >{{ tag }}</button>
          </div>
        </div>
        <div class="review-editor-section">
          <div class="review-editor-switch">
            <span>匿名评价</span>
            <button class="line-btn" :class="{ primary: reviewDraft.anonymous }" @click="reviewDraft.anonymous = !reviewDraft.anonymous">
              {{ reviewDraft.anonymous ? '已开启' : '未开启' }}
            </button>
          </div>
          <div class="review-editor-switch">
            <span>上传示例图片</span>
            <button class="line-btn" @click="appendDraftImage">添加图片</button>
          </div>
          <div class="review-editor-images" v-if="reviewDraft.images.length">
            <img v-for="(img, index) in reviewDraft.images" :key="`${img}-${index}`" :src="img" alt="示例图片" />
          </div>
        </div>
        <button class="btn-solid review-submit-btn" @click="submitReview">提交评价</button>
      </div>
    </nut-popup>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getProductById, getProducts } from '../api/products'
import { useCartStore } from '../stores/cart'
import { showToast } from '@nutui/nutui'
import { IconFont } from '@nutui/icons-vue'

const route = useRoute()
const router = useRouter()
const cartStore = useCartStore()
const REVIEW_STORAGE_PREFIX = 'mall_product_reviews_v1_'

const currentProduct = ref({})

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

const couponPreviewList = computed(() => sortedCoupons.value.slice(0, 2))
const couponMoreCount = computed(() => Math.max(sortedCoupons.value.length - couponPreviewList.value.length, 0))

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
const cartCount = computed(() => cartStore.allItems.length)

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

const reviewDefaults = [
  {
    id: 'r1',
    name: '清风',
    date: '2026-02-04',
    timestamp: 1707000000000,
    rate: 5,
    content: '做工扎实，安装方便，收纳效果很好。',
    tags: ['结实', '好安装'],
    images: ['https://picsum.photos/seed/review1/200/200'],
    helpful: 12,
    liked: false
  },
  {
    id: 'r2',
    name: '阿宁',
    date: '2026-02-02',
    timestamp: 1706827200000,
    rate: 4,
    content: '颜色很正，和家里风格很搭，快递也快。',
    tags: ['颜值高', '发货快'],
    images: [],
    helpful: 8,
    liked: false
  }
]

const reviews = ref([])
const reviewFilter = ref('all')
const showReviewEditor = ref(false)
const reviewTagLibrary = ['做工好', '发货快', '性价比高', '颜值高', '包装好', '安装方便']
const reviewDraft = reactive({
  rate: 5,
  content: '',
  tags: [],
  anonymous: true,
  images: []
})

const reviewAverage = computed(() => {
  if (!reviews.value.length) return 0
  const total = reviews.value.reduce((sum, item) => sum + Number(item.rate || 0), 0)
  return total / reviews.value.length
})

const positiveRate = computed(() => {
  if (!reviews.value.length) return 100
  const positive = reviews.value.filter((item) => Number(item.rate) >= 4).length
  return Math.round((positive / reviews.value.length) * 100)
})

const reviewFilterOptions = computed(() => {
  const total = reviews.value.length
  const withImage = reviews.value.filter((item) => item.images?.length).length
  const positive = reviews.value.filter((item) => Number(item.rate) >= 4).length
  return [
    { label: '全部', value: 'all', count: total },
    { label: '有图', value: 'image', count: withImage },
    { label: '好评', value: 'positive', count: positive },
    { label: '最新', value: 'latest', count: 0 }
  ]
})

const filteredReviews = computed(() => {
  const list = [...reviews.value]
  if (reviewFilter.value === 'image') {
    return list.filter((item) => item.images?.length)
  }
  if (reviewFilter.value === 'positive') {
    return list.filter((item) => Number(item.rate) >= 4)
  }
  if (reviewFilter.value === 'latest') {
    return list.sort((a, b) => Number(b.timestamp || 0) - Number(a.timestamp || 0))
  }
  return list
})

const recommendList = ref([])

const getReviewStorageKey = (productId) => `${REVIEW_STORAGE_PREFIX}${productId}`

const persistReviews = () => {
  const targetId = currentProduct.value?.id || route.params.id
  if (!targetId) return
  window.localStorage.setItem(getReviewStorageKey(targetId), JSON.stringify(reviews.value))
}

const loadReviews = (productId) => {
  const key = getReviewStorageKey(productId)
  const raw = window.localStorage.getItem(key)
  if (raw) {
    try {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed)) {
        reviews.value = parsed
        return
      }
    } catch (error) {
      // fallback to defaults
    }
  }
  reviews.value = JSON.parse(JSON.stringify(reviewDefaults))
}

const loadPageData = async (productId) => {
  const product = await getProductById(productId)
  currentProduct.value = product
  loadReviews(product.id || productId)
  const allProducts = await getProducts()
  recommendList.value = allProducts.slice(0, 4)
}

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

const toggleReviewLike = (item) => {
  if (item.liked) {
    item.helpful = Math.max(0, Number(item.helpful || 0) - 1)
  } else {
    item.helpful = Number(item.helpful || 0) + 1
  }
  item.liked = !item.liked
  persistReviews()
}

const toggleDraftTag = (tag) => {
  if (reviewDraft.tags.includes(tag)) {
    reviewDraft.tags = reviewDraft.tags.filter((item) => item !== tag)
  } else if (reviewDraft.tags.length < 3) {
    reviewDraft.tags = [...reviewDraft.tags, tag]
  }
}

const appendDraftImage = () => {
  if (reviewDraft.images.length >= 3) {
    showToast.text('最多添加 3 张图片')
    return
  }
  reviewDraft.images = [
    ...reviewDraft.images,
    `https://picsum.photos/seed/review${Date.now()}${reviewDraft.images.length}/200/200`
  ]
}

const resetReviewDraft = () => {
  reviewDraft.rate = 5
  reviewDraft.content = ''
  reviewDraft.tags = []
  reviewDraft.anonymous = true
  reviewDraft.images = []
}

const submitReview = () => {
  if (!reviewDraft.content || reviewDraft.content.length < 5) {
    showToast.text('评价内容至少 5 个字')
    return
  }
  const now = new Date()
  reviews.value.unshift({
    id: `r_${Date.now()}`,
    name: reviewDraft.anonymous ? '匿名用户' : '京东用户',
    date: now.toISOString().slice(0, 10),
    timestamp: Date.now(),
    rate: reviewDraft.rate,
    content: reviewDraft.content,
    tags: reviewDraft.tags.length ? [...reviewDraft.tags] : ['真实评价'],
    images: [...reviewDraft.images],
    helpful: 0,
    liked: false
  })
  persistReviews()
  showReviewEditor.value = false
  resetReviewDraft()
  reviewFilter.value = 'latest'
  showToast.success('评价已提交')
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
  } else {
    cartStore.addItem({
        ...currentProduct.value,
        sku: `${selectedSize.value} ${selectedColor.value}`,
        price: parseFloat(currentPrice.value)
    })
    showToast.success('加入购物车成功')
  }
}

const goBack = () => {
  if (window.history.length > 1) {
    router.back()
  } else {
    router.push('/')
  }
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
  document.body.style.overflow = val || showReviewEditor.value ? 'hidden' : ''
})

watch(showReviewEditor, (val) => {
  document.body.style.overflow = val || showSku.value ? 'hidden' : ''
})

watch(() => route.params.id, async (nextId) => {
  if (!nextId) return
  await loadPageData(nextId)
  window.scrollTo({ top: 0, behavior: 'auto' })
  activeTab.value = 'product'
  reviewFilter.value = 'all'
  resetReviewDraft()
})

onMounted(async () => {
  handleScroll()
  window.addEventListener('scroll', handleScroll, { passive: true })
  await loadPageData(route.params.id)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.body.style.overflow = ''
})
</script>
