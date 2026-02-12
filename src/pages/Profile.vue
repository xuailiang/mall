<template>
  <div class="profile-page">
    <header class="navbar">
      <div class="title">我的</div>
      <div class="actions">
        <span>设置</span>
      </div>
    </header>

    <div class="page">
      <section class="profile-hero">
        <div class="hero-top">
          <nut-avatar size="56" />
          <div class="hero-info">
            <div class="hero-name">一卡通用户</div>
            <div class="hero-sub">135****0329 · LV3</div>
          </div>
          <button class="hero-vip">PLUS会员</button>
        </div>
        <div class="hero-asset">
          <div class="asset-item">
            <div class="asset-num">7</div>
            <div class="asset-label">卡包</div>
          </div>
          <div class="asset-item">
            <div class="asset-num">6</div>
            <div class="asset-label">卡券</div>
          </div>
          <div class="asset-item">
            <div class="asset-num">0</div>
            <div class="asset-label">商家券</div>
          </div>
          <div class="asset-item">
            <div class="asset-num">0</div>
            <div class="asset-label">优惠券</div>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">
          <span>我的订单</span>
          <span class="hint clickable" @click="goOrders">全部订单</span>
        </div>
        <div class="order-grid">
          <div class="order-item" v-for="item in orderMenu" :key="item.label">
            <div class="order-icon">
              <IconFont :name="item.icon" size="24" />
            </div>
            <div>{{ item.label }}</div>
            <span v-if="item.badge" class="order-badge">{{ item.badge }}</span>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">
          <span>常用服务</span>
        </div>
        <div class="service-grid">
          <div class="service-item" v-for="item in services" :key="item.label">
            <div class="service-icon">
              <IconFont :name="item.icon" size="24" />
            </div>
            <div class="service-label">{{ item.label }}</div>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">
          <span>资产管理</span>
        </div>
        <div class="asset-grid">
          <div class="asset-card" v-for="item in assets" :key="item.label">
            <div class="asset-card-title">{{ item.label }}</div>
            <div class="asset-card-sub">{{ item.desc }}</div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { IconFont } from '@nutui/icons-vue'

const router = useRouter()
const goOrders = () => router.push('/orders')

const orderMenu = [
  { label: '待付款', icon: 'order', badge: 1 },
  { label: '待收货', icon: 'cart', badge: 3 },
  { label: '待评价', icon: 'message' },
  { label: '售后/退款', icon: 'service' }
]

const services = [
  { label: '商品收藏', icon: 'star' },
  { label: '店铺关注', icon: 'shop' },
  { label: '足迹', icon: 'clock' },
  { label: '我的活动', icon: 'gift' },
  { label: '地址管理', icon: 'location' },
  { label: '账户设置', icon: 'setting' },
  { label: '客服中心', icon: 'service' },
  { label: '帮助反馈', icon: 'ask' }
]

const assets = [
  { label: '红包', desc: '可用 2 张' },
  { label: '礼品卡', desc: '无可用' },
  { label: '余额', desc: '¥0.00' },
  { label: '积分', desc: '999' }
]
</script>
