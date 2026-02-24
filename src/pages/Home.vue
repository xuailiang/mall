<template>
  <div class="home-page">
    <header class="home-header">
      <div class="home-search" @click="router.push('/search')">
        <span class="home-search-icon">≡</span>
        <input v-model="search" placeholder="三只松鼠坚果礼盒" readonly @click.stop="router.push('/search')" />
      </div>
      <div class="home-avatar">👤</div>
    </header>

    <div class="home-banner">
      <nut-swiper :init-page="0" :auto-play="3000" pagination-visible pagination-color="#426543" loop>
        <nut-swiper-item v-for="(item, index) in banners" :key="index">
          <img :src="item" alt="" class="banner-img" />
        </nut-swiper-item>
      </nut-swiper>
    </div>

    <section class="home-card category-card">
      <div class="category-list">
        <div v-for="item in categories" :key="item.id" class="category-item">
          <div class="category-icon"><img :src="item.icon" /></div>
          <div>{{ item.label }}</div>
        </div>
      </div>
    </section>

    <section class="home-card new-arrivals">
      <div class="section-head">
        <span class="sec-tit">新品首发</span>
        <span class="sec-sub">每日上新 0元试用</span>
      </div>
      <div class="scroll-x">
        <div class="new-item" v-for="item in recommend.slice(0,4)" :key="item.id">
          <img :src="item.image" />
          <div class="new-title">{{ item.title }}</div>
          <div class="new-price">¥{{ item.price }}</div>
        </div>
      </div>
    </section>

    <section class="home-card flash-card">
      <div class="flash-left">
        <div class="flash-title">京东秒杀</div>
        <div class="flash-sub">限时低价</div>
        <button class="flash-btn">去抢购</button>
      </div>
      <div class="flash-right">
        <div class="flash-item" v-for="item in featured" :key="item.id" @click="goProduct(item.id)">
          <img :src="item.image" :alt="item.title" />
          <div class="flash-price">¥{{ item.price }}</div>
        </div>
      </div>
    </section>

    <section class="home-card activity-card">
      <div class="activity-title">活动专区</div>
      <div class="activity-row">
        <div class="activity-item act-seckill">
          <div class="act-top">秒杀专场</div>
          <div class="act-sub">倒计时 08:15:36</div>
          <div class="act-pill">限量抢</div>
        </div>
        <div class="activity-item act-fullcut">
          <div class="act-top">满减专区</div>
          <div class="act-sub">满199减20</div>
          <div class="act-pill">叠券更省</div>
        </div>
        <div class="activity-item act-gift">
          <div class="act-top">买赠专区</div>
          <div class="act-sub">买1赠1</div>
          <div class="act-pill">今日推荐</div>
        </div>
      </div>
    </section>

    <section class="home-grid">
      <div class="home-good" v-for="item in recommend" :key="item.id" @click="goProduct(item.id)">
        <img :src="item.image" :alt="item.title" />
        <div class="promo-ribbon" :class="item.promo.type">{{ item.promo.label }}</div>
        <div class="home-good-tags">
          <span class="tag-lite">自营</span>
          <span class="tag-lite" v-if="item.badge">{{ item.badge }}</span>
        </div>
        <div class="home-good-title">{{ item.title }}</div>
        <div class="home-good-price">¥{{ item.price }}</div>
        <div class="promo-pills">
          <span class="promo-pill" :class="item.promo.type">{{ item.promo.short }}</span>
          <span class="promo-pill neutral" v-if="item.promo.extra">{{ item.promo.extra }}</span>
        </div>
        <div class="home-good-meta" v-if="item.desc">{{ item.desc }}</div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getProducts } from '../api/products'

const router = useRouter()
const search = ref('')
const featured = ref([])
const recommend = ref([])
const banners = [
  'https://storage.360buyimg.com/jdc-article/NutUItaro34.jpg',
  'https://storage.360buyimg.com/jdc-article/NutUItaro2.jpg',
  'https://storage.360buyimg.com/jdc-article/welcomenutui.jpg',
  'https://storage.360buyimg.com/jdc-article/fristfabu.jpg'
]


const categories = [
  { id: 1, label: '京东超市', icon: 'https://img12.360buyimg.com/img/jfs/t1/189258/34/33649/2264/646b1ba1F057b774c/13374825921869e5.png' },
  { id: 2, label: '数码电器', icon: 'https://img10.360buyimg.com/img/jfs/t1/192028/25/33312/2699/646b1ba1F3325785d/7c374c431055743a.png' },
  { id: 3, label: '京东服饰', icon: 'https://img11.360buyimg.com/img/jfs/t1/110757/27/36142/2610/646b1ba1F63ff4f5e/164930372df03d42.png' },
  { id: 4, label: '京东生鲜', icon: 'https://img12.360buyimg.com/img/jfs/t1/94315/26/36417/2507/646b1ba1F95638573/6045502c385311f6.png' },
  { id: 5, label: 'PLUS会员', icon: 'https://img12.360buyimg.com/img/jfs/t1/189258/34/33649/2264/646b1ba1F057b774c/13374825921869e5.png' },
  { id: 6, label: '优惠券', icon: 'https://img10.360buyimg.com/img/jfs/t1/192028/25/33312/2699/646b1ba1F3325785d/7c374c431055743a.png' },
  { id: 7, label: '充值缴费', icon: 'https://img11.360buyimg.com/img/jfs/t1/110757/27/36142/2610/646b1ba1F63ff4f5e/164930372df03d42.png' },
  { id: 8, label: '领京豆', icon: 'https://img12.360buyimg.com/img/jfs/t1/94315/26/36417/2507/646b1ba1F95638573/6045502c385311f6.png' },
  { id: 9, label: '领金贴', icon: 'https://img12.360buyimg.com/img/jfs/t1/189258/34/33649/2264/646b1ba1F057b774c/13374825921869e5.png' },
  { id: 10, label: '省钱卡', icon: 'https://img10.360buyimg.com/img/jfs/t1/192028/25/33312/2699/646b1ba1F3325785d/7c374c431055743a.png' }
]

const promoPatterns = {
  seckill: { type: 'seckill', label: '秒杀', short: '限时秒杀', extra: '限量' },
  fullcut: { type: 'fullcut', label: '满减', short: '满199减20', extra: '可叠券' },
  direct: { type: 'direct', label: '直降', short: '直降80', extra: '今日价' },
  gift: { type: 'gift', label: '买赠', short: '买1赠1', extra: '赠品丰富' },
  coupon: { type: 'coupon', label: '券', short: '领券减15', extra: '店铺券' },
  member: { type: 'member', label: '会员', short: 'PLUS会员价', extra: '专享权益' },
  newbie: { type: 'newbie', label: '新人', short: '首单立减', extra: '新客福利' },
  base: { type: 'base', label: '日常', short: '日常好价', extra: '' }
}

const goProduct = (id) => {
  // Use push for navigating to a new page in the stack
  router.push({ name: 'product', params: { id } })
}

onMounted(async () => {
    const data = await getProducts()
    featured.value = data.slice(0, 4)
    recommend.value = data.map((item) => ({
      ...item,
      promo: promoPatterns[item.promoType || 'base']
    }))
})
</script>
