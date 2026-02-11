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
              <svg viewBox="0 0 24 24" class="icon-svg" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                <path :d="item.icon" />
              </svg>
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
              <svg viewBox="0 0 24 24" class="icon-svg" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                <path :d="item.icon" />
              </svg>
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

const router = useRouter()
const goOrders = () => router.push('/orders')

const orderMenu = [
  { label: '待付款', icon: 'M3 7h18v10H3V7zm0 3h18m-6 4h3', badge: 1 },
  { label: '待收货', icon: 'M3 7h11v8H3V7zm11 3h4l3 3v2h-7v-5zm-7 7a1.5 1.5 0 1 0 0 .01M17 17a1.5 1.5 0 1 0 0 .01', badge: 3 },
  { label: '待评价', icon: 'M12 3l2.7 5.5 6.1.9-4.4 4.3 1 6.1L12 16.9 6.6 19.8l1-6.1L3.2 9.4l6.1-.9L12 3z' },
  { label: '售后', icon: 'M4 12a8 8 0 1 1 16 0M4 12v3a2 2 0 0 0 2 2h2v-6H6a2 2 0 0 0-2 2zm16 0v3a2 2 0 0 1-2 2h-2v-6h2a2 2 0 0 1 2 2' }
]

const services = [
  { label: '生活卡券', icon: 'M4 7h16v4a2 2 0 0 0 0 2v4H4v-4a2 2 0 0 0 0-2V7zM9 9v6M15 9v6' },
  { label: '话费充值', icon: 'M6 3h12v18H6V3zm3 14h6' },
  { label: '购卡实体', icon: 'M3 7h18v10H3V7zm0 3h18M6 14h5' },
  { label: '支付宝红包', icon: 'M6 4h12l2 4-8 12L4 8l2-4zM9 10h6' },
  { label: '商家卡券', icon: 'M4 10l8-6 8 6v8H4v-8zm5 8v-6h6v6' },
  { label: '中康体检', icon: 'M12 3a6 6 0 0 1 6 6c0 4-6 12-6 12S6 13 6 9a6 6 0 0 1 6-6zm-2 6h4M12 7v4' },
  { label: '使用范围', icon: 'M12 2l8 7-8 13-8-13 8-7zm0 6v8' },
  { label: '营业厅', icon: 'M3 9l9-5 9 5v10H3V9zm5 10v-6h4v6m5 0v-6h4v6' }
]

const assets = [
  { label: '红包', desc: '可用 2 张' },
  { label: '礼品卡', desc: '无可用' },
  { label: '余额', desc: '¥0.00' },
  { label: '积分', desc: '999' }
]
</script>
