<template>
  <div class="home-page">
    <header class="home-header">
      <div class="home-search">
        <span class="home-search-icon">≡</span>
        <input v-model="search" placeholder="三只松鼠坚果礼盒" />
      </div>
      <div class="home-avatar">👤</div>
    </header>

    <section class="home-card category-card">
      <div class="category-list">
        <div v-for="item in categories" :key="item.id" class="category-item">
          <div class="category-icon">{{ item.icon }}</div>
          <div>{{ item.label }}</div>
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
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { products } from '../mock/products'

const router = useRouter()
const search = ref('')

const categories = [
  { id: 1, label: '京东超市', icon: '超市' },
  { id: 2, label: '京东电器', icon: '3C' },
  { id: 3, label: '服饰美妆', icon: '美' },
  { id: 4, label: '充值中心', icon: '充' },
  { id: 5, label: 'PLUS会员', icon: '⭐' }
]

const promoPatterns = {
  seckill: { type: 'seckill', label: '秒杀', short: '限时秒杀', extra: '限量' },
  fullcut: { type: 'fullcut', label: '满减', short: '满199减20', extra: '可叠券' },
  direct: { type: 'direct', label: '直降', short: '直降80', extra: '今日价' },
  gift: { type: 'gift', label: '买赠', short: '买1赠1', extra: '赠品丰富' },
  coupon: { type: 'coupon', label: '券', short: '领券减15', extra: '店铺券' },
  base: { type: 'base', label: '日常', short: '日常好价', extra: '' }
}

const featured = products.slice(0, 4)
const recommend = products.map((item) => ({
  ...item,
  promo: promoPatterns[item.promoType || 'base']
}))

const goProduct = (id) => {
  router.push(`/product/${id}`)
}
</script>
