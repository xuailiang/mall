<template>
  <div class="home-v2 v2">
    <header class="homev2-header homev2-anim" style="--delay: 0ms;">
      <button class="homev2-icon-btn" @click="router.push('/category')">☰</button>
      <button class="homev2-search" @click="router.push('/search')">
        <span class="homev2-search-icon">⌕</span>
        <span class="homev2-search-text">{{ searchPlaceholder }}</span>
      </button>
      <button class="homev2-icon-btn" @click="router.push('/messages')">✉</button>
    </header>

    <section class="homev2-kingkong homev2-anim" style="--delay: 80ms;">
      <button
        v-for="item in categories"
        :key="item.id"
        class="homev2-king-item"
        @click="goCategory(item)"
      >
        <img :src="item.icon" :alt="item.label" @error="onCategoryImgError" />
        <span>{{ item.label }}</span>
      </button>
    </section>

    <section class="homev2-stage homev2-anim" id="home-floor-top" style="--delay: 140ms;">
      <nut-swiper :init-page="0" :auto-play="3200" loop @change="onBannerChange">
        <nut-swiper-item v-for="(item, index) in banners" :key="index">
          <img :src="item.image" :alt="item.title" class="homev2-stage-image" />
          <div class="homev2-stage-overlay">
            <span class="homev2-stage-badge">{{ item.badge }}</span>
            <div class="homev2-stage-title">{{ item.title }}</div>
            <div class="homev2-stage-sub">{{ item.sub }}</div>
            <button class="homev2-stage-cta" @click.stop="goPromoByType(item.type)">去会场</button>
          </div>
        </nut-swiper-item>
      </nut-swiper>
      <div class="homev2-stage-dots">
        <span
          v-for="(_, idx) in banners"
          :key="idx"
          :class="{ active: idx === bannerIndex }"
        ></span>
      </div>
    </section>

    <nav class="homev2-floor-nav" :class="{ show: showFloorNav }">
      <button
        v-for="tab in floorTabs"
        :key="tab.id"
        class="homev2-floor-btn"
        :class="{ active: activeFloor === tab.id }"
        @click="scrollToFloor(tab.id)"
      >
        {{ tab.label }}
      </button>
    </nav>

    <section class="homev2-promo-grid homev2-anim" style="--delay: 200ms;">
      <article
        v-for="block in promoBlocks"
        :id="`home-floor-${block.id}`"
        :key="block.id"
        class="homev2-promo-card"
        :class="`type-${block.type}`"
        @click="goPromo(block)"
      >
        <div class="homev2-promo-head">
          <span class="homev2-promo-title">{{ block.title }}</span>
          <span class="homev2-promo-pill">{{ block.pill }}</span>
        </div>
        <div class="homev2-promo-sub">{{ block.sub }}</div>
        <div class="homev2-promo-foot">
          <span class="homev2-promo-price" v-if="block.item">¥{{ block.item.price }}</span>
          <span class="homev2-promo-price muted" v-else>精选好货</span>
          <span class="homev2-promo-cta">{{ block.cta }}</span>
        </div>
      </article>
    </section>

    <section id="home-floor-recommend" class="homev2-feed homev2-anim" style="--delay: 260ms;">
      <div class="homev2-feed-head">
        <span class="homev2-feed-title">猜你喜欢</span>
        <span class="homev2-feed-sub">为你精选</span>
      </div>
      <div class="homev2-waterfall">
        <article class="homev2-product-card" v-for="item in recommend" :key="item.id" @click="goProduct(item.id)">
          <div class="homev2-product-media">
            <img :src="item.image" :alt="item.title" loading="lazy" />
            <div class="homev2-ribbon" :class="item.promo.type">{{ item.promo.label }}</div>
          </div>
          <div class="homev2-product-body">
            <div class="homev2-product-title">{{ item.title }}</div>
            <div class="homev2-product-tags">
              <span class="homev2-pill" :class="item.promo.type">{{ item.promo.short }}</span>
              <span class="homev2-pill neutral" v-if="item.promo.extra">{{ item.promo.extra }}</span>
            </div>
            <div class="homev2-price-row">
              <span class="homev2-price">¥{{ item.price }}</span>
              <span class="homev2-old" v-if="item.original">¥{{ item.original }}</span>
            </div>
            <div class="homev2-meta">{{ item.desc || '官方补贴 · 极速发货' }}</div>
          </div>
        </article>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { getProducts } from '../api/products'

const router = useRouter()

const searchPlaceholder = '三只松鼠坚果礼盒'
const recommend = ref([])
const bannerIndex = ref(0)
const showFloorNav = ref(false)
const activeFloor = ref('flash')

const floorTabs = [
  { id: 'flash', label: '秒杀' },
  { id: 'fullcut', label: '满减' },
  { id: 'newbie', label: '新人' },
  { id: 'member', label: '会员' },
  { id: 'recommend', label: '推荐' }
]

const banners = [
  {
    image: 'https://storage.360buyimg.com/jdc-article/NutUItaro34.jpg',
    title: '今日主会场 · 爆款直降',
    sub: '抢限时补贴与跨店满减',
    badge: '主会场',
    type: 'seckill'
  },
  {
    image: 'https://storage.360buyimg.com/jdc-article/NutUItaro2.jpg',
    title: '新人专享 · 首单立减',
    sub: '新客福利限时开放',
    badge: '新人',
    type: 'newbie'
  },
  {
    image: 'https://storage.360buyimg.com/jdc-article/welcomenutui.jpg',
    title: 'PLUS 会员专场',
    sub: '会员价再减，权益叠加',
    badge: '会员',
    type: 'member'
  }
]

const categories = [
  { id: 1, label: '京东超市', icon: 'https://picsum.photos/seed/cat-super/80/80' },
  { id: 2, label: '数码电器', icon: 'https://picsum.photos/seed/cat-digital/80/80' },
  { id: 3, label: '京东服饰', icon: 'https://picsum.photos/seed/cat-fashion/80/80' },
  { id: 4, label: '京东生鲜', icon: 'https://picsum.photos/seed/cat-fresh/80/80' },
  { id: 5, label: 'PLUS会员', icon: 'https://picsum.photos/seed/cat-plus/80/80' },
  { id: 6, label: '优惠券', icon: 'https://picsum.photos/seed/cat-coupon/80/80' },
  { id: 7, label: '充值缴费', icon: 'https://picsum.photos/seed/cat-pay/80/80' },
  { id: 8, label: '领京豆', icon: 'https://picsum.photos/seed/cat-bean/80/80' },
  { id: 9, label: '领金贴', icon: 'https://picsum.photos/seed/cat-gold/80/80' },
  { id: 10, label: '省钱卡', icon: 'https://picsum.photos/seed/cat-save/80/80' }
]

const promoPatterns = {
  seckill: { type: 'seckill', label: '秒杀', short: '限时秒杀', extra: '限量抢' },
  fullcut: { type: 'fullcut', label: '满减', short: '满199减20', extra: '可叠券' },
  direct: { type: 'direct', label: '直降', short: '直降好价', extra: '今日价' },
  gift: { type: 'gift', label: '买赠', short: '买1赠1', extra: '赠品丰富' },
  coupon: { type: 'coupon', label: '领券', short: '领券减15', extra: '店铺券' },
  member: { type: 'member', label: '会员', short: 'PLUS会员价', extra: '专享权益' },
  newbie: { type: 'newbie', label: '新人', short: '首单立减', extra: '新客福利' },
  base: { type: 'base', label: '日常', short: '日常好价', extra: '' }
}

const pickPromoProduct = (type) => {
  return recommend.value.find((item) => item.promo.type === type) || recommend.value[0] || null
}

const promoBlocks = computed(() => [
  { id: 'flash', type: 'seckill', title: '秒杀专场', sub: '爆款限时低价，错过等明天', pill: '08:15:36', cta: '去抢购', item: pickPromoProduct('seckill') },
  { id: 'fullcut', type: 'fullcut', title: '满减专区', sub: '跨店每满199减20，可叠券', pill: '叠券', cta: '去凑单', item: pickPromoProduct('fullcut') },
  { id: 'newbie', type: 'newbie', title: '新人专享', sub: '新客首单立减，低门槛包邮', pill: '新客', cta: '去开抢', item: pickPromoProduct('newbie') },
  { id: 'member', type: 'member', title: '会员专区', sub: 'PLUS专属价格，权益叠加', pill: 'PLUS', cta: '去看看', item: pickPromoProduct('member') }
])

let scrollTicking = false

const onBannerChange = (idx) => {
  bannerIndex.value = Number(idx || 0)
}

const goProduct = (id) => {
  if (!id) return
  router.push({ name: 'product', params: { id } })
}

const goCategory = (item) => {
  router.push({
    path: '/category',
    query: item?.label ? { from: item.label } : {}
  })
}

const onCategoryImgError = (event) => {
  const target = event?.target
  if (!target || target.dataset.fallbackApplied === '1') return
  target.dataset.fallbackApplied = '1'
  target.src =
    'data:image/svg+xml;utf8,' +
    encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ff8a6b"/><stop offset="1" stop-color="#ff4d3a"/></linearGradient></defs><rect width="80" height="80" rx="18" fill="url(#g)"/><circle cx="40" cy="40" r="17" fill="rgba(255,255,255,0.9)"/><path d="M40 28L50 40L40 52L30 40Z" fill="#ff4d3a"/></svg>`
    )
}

const goPromoByType = (type) => {
  const target = pickPromoProduct(type)
  if (target?.id) {
    goProduct(target.id)
  } else {
    router.push('/product-list')
  }
}

const goPromo = (block) => {
  if (!block) return
  if (block.item?.id) {
    goProduct(block.item.id)
  } else {
    router.push('/product-list')
  }
}

const floorTargetTop = (id) => {
  const el = document.getElementById(`home-floor-${id}`)
  if (!el) return null
  return el.getBoundingClientRect().top + window.scrollY
}

const scrollToFloor = (id) => {
  const top = floorTargetTop(id)
  if (top == null) return
  const offset = showFloorNav.value ? 94 : 58
  window.scrollTo({ top: top - offset, behavior: 'smooth' })
  activeFloor.value = id
}

const updateFloorState = () => {
  const y = window.scrollY
  showFloorNav.value = y > 380

  const scanOffset = y + (showFloorNav.value ? 120 : 84)
  const ids = floorTabs.map((tab) => tab.id)
  for (let i = ids.length - 1; i >= 0; i -= 1) {
    const top = floorTargetTop(ids[i])
    if (top != null && scanOffset >= top) {
      activeFloor.value = ids[i]
      break
    }
  }
}

const handleScroll = () => {
  if (scrollTicking) return
  scrollTicking = true
  window.requestAnimationFrame(() => {
    updateFloorState()
    scrollTicking = false
  })
}

onMounted(async () => {
  const data = await getProducts()
  recommend.value = data.map((item) => ({
    ...item,
    title: item.title || '精选好物',
    image: item.image || banners[0].image,
    price: item.price || '0.00',
    original: item.original || '',
    desc: item.desc || '',
    promo: promoPatterns[item.promoType || 'base'] || promoPatterns.base
  }))

  window.addEventListener('scroll', handleScroll, { passive: true })
  updateFloorState()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
