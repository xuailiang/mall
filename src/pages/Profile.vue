<template>
  <div class="profile-page">
    <div class="profile-header-bg">
      <header class="navbar profile-navbar">
        <div class="nav-left"></div>
        <div class="title">我的</div>
        <div class="actions">
          <div class="message-entry" @click="goMessages">
            <IconFont name="message" size="20" />
            <span v-if="unreadTotal > 0" class="message-badge"></span>
          </div>
          <IconFont name="setting" size="20" />
        </div>
      </header>

      <section class="profile-hero">
        <div class="hero-top">
          <nut-avatar :icon="userInfo?.avatar" size="60" shape="square" />
          <div class="hero-info">
            <div class="hero-name">{{ userInfo?.name || '未知用户' }} <IconFont name="edit" size="12" /></div>
            <div class="hero-sub">{{ userInfo?.phone || '无手机号' }} · LV3</div>
            <div class="hero-tags">
              <span class="user-badge">账号管理</span>
            </div>
          </div>
          <div class="hero-plus-card">
            <div class="plus-text">PLUS会员</div>
            <div class="plus-hint">立即续费享权益 ></div>
          </div>
        </div>
        <div class="hero-asset">
          <div class="asset-item" v-for="a in topAssets" :key="a.label" @click="a.path && router.push(a.path)">
            <div class="asset-num">{{ a.num }}</div>
            <div class="asset-label">{{ a.label }}</div>
          </div>
        </div>
      </section>
    </div>
    <div class="page">
      <section class="detail-card order-section">
        <div class="section-title">
          <span class="main-title">我的订单</span>
          <span class="hint clickable" @click="goOrders">全部订单 <IconFont name="right" size="10" /></span>
        </div>
        <div class="order-grid">
          <div class="order-item" v-for="item in orderMenu" :key="item.label" @click="item.path ? router.push(item.path) : goOrders()">
            <div class="order-icon-wrap">
              <IconFont :name="item.icon" size="26" />
              <span v-if="item.badge" class="order-badge">{{ item.badge }}</span>
            </div>
            <div class="item-label">{{ item.label }}</div>
          </div>
        </div>
        <div class="logistics-card" v-if="recentOrder" @click="router.push('/logistics')">
          <div class="logistics-header">
            <span class="logistics-title">最新物流</span>
            <span class="logistics-time">{{ recentOrder.time }}</span>
          </div>
          <div class="logistics-body">
            <img :src="recentOrder.image" class="logistics-img" />
            <div class="logistics-info">
              <div class="logistics-status highlight">{{ recentOrder.status }}</div>
              <div class="logistics-desc">{{ recentOrder.desc }}</div>
            </div>
          </div>
        </div>
      </section>

      <section class="detail-card asset-section">
        <div class="section-title">
          <span class="main-title">我的钱包</span>
        </div>
        <div class="asset-grid">
          <div class="asset-item" v-for="item in assets" :key="item.label">
            <div class="asset-val">{{ item.desc }}</div>
            <div class="item-label">{{ item.label }}</div>
          </div>
        </div>
      </section>

      <!-- 促销横幅 Banner -->
      <div class="profile-banner-wrap" v-if="promoBanners.length > 0">
        <img :src="promoBanners[0].image" class="profile-banner" alt="Promotion" />
      </div>

      <section class="detail-card service-section">
        <div class="section-title">
          <span class="main-title">常用工具</span>
        </div>
        <div class="service-grid">
          <div class="service-item" v-for="item in services" :key="item.label" @click="goService(item)">
            <IconFont :name="item.icon" size="24" class="service-icon" />
            <div class="item-label">{{ item.label }}</div>
          </div>
        </div>
      </section>

      <!-- 为你推荐 -->
      <div class="guess-like profile-guess">
        <div class="guess-title">
          <IconFont name="heart-fill" color="#ff3b30" size="14" style="margin-right:4px;" />
          为大家推荐
        </div>
        <div class="home-grid">
          <div class="home-good" v-for="item in recommend" :key="item.id" @click="router.push(`/product/${item.id}`)">
            <img :src="item.image" :alt="item.title" />
            <div class="home-good-title">{{ item.title }}</div>
            <div class="home-good-tags" v-if="item.tags && item.tags.length">
              <span class="tag-item" v-for="tag in item.tags.slice(0,2)" :key="tag">{{ tag }}</span>
            </div>
            <div class="home-good-price">¥{{ item.price }}</div>
            <div class="home-good-saw" v-if="item.sales">看相似</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { IconFont } from '@nutui/icons-vue'
import { useMessagesStore } from '../stores/messages'
import { useAuthStore } from '../stores/auth'
import { products } from '../mock/products'
import { imagePool } from '../mock/assets'
import '../styles/profile.css'

const router = useRouter()
const authStore = useAuthStore()
const userInfo = computed(() => authStore.userInfo)

const goOrders = () => router.push('/orders')
const goMessages = () => router.push('/messages')
const goService = (item) => {
  if (item.action === 'logout') {
    authStore.logout()
    router.replace('/login')
  } else if (item.path) {
    router.push(item.path)
  }
}

const topAssets = [
  { label: '卡包', num: 7 },
  { label: '卡券', num: 6, path: '/coupons' },
  { label: '商家券', num: 0, path: '/coupons' },
  { label: '近期关注', num: 12, path: '/follows' }
]

const orderMenu = [
  { label: '待付款', icon: 'order', badge: 1 },
  { label: '待收货', icon: 'cart', badge: 3 },
  { label: '待评价', icon: 'message' },
  { label: '退换/售后', icon: 'service', path: '/refund' }
]

const services = [
  { label: '商品收藏', icon: 'star', path: '/favorites' },
  { label: '店铺关注', icon: 'shop', path: '/follows' },
  { label: '足迹', icon: 'clock', path: '/footprints' },
  { label: '我的活动', icon: 'gift', path: '/activities' },
  { label: '地址管理', icon: 'location', path: '/addresses' },
  { label: '退出登录', icon: 'setting', action: 'logout' },
  { label: '客服中心', icon: 'service', path: '/support' },
  { label: '帮助反馈', icon: 'ask', path: '/help' }
]

const assets = [
  { label: '红包', desc: '¥5.00' },
  { label: '礼品卡', desc: '2张' },
  { label: '余额', desc: '¥0.00' },
  { label: '积分', desc: '999' }
]

const { unreadCount } = useMessagesStore()
const unreadTotal = unreadCount

// Mock Data for new Modules
const recentOrder = {
  image: products[0].image,
  status: '派送中',
  desc: '您的订单正在由【北京朝阳营业部】派送，派件员正在为您加速配送，请耐心等待。',
  time: '10:30'
}

const promoBanners = [
  { image: imagePool.banner }
]

const recommend = products.slice(0, 10).map(p => ({
  ...p,
  tags: p.id % 2 === 0 ? ['自营', '满减'] : ['包邮']
}))
</script>
