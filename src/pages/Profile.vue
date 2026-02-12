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
          <nut-avatar size="60" shape="square" />
          <div class="hero-info">
            <div class="hero-name">一卡通用户 <IconFont name="edit" size="12" /></div>
            <div class="hero-sub">135****0329 · LV3</div>
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
          <div class="asset-item" v-for="a in topAssets" :key="a.label">
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
          <div class="order-item" v-for="item in orderMenu" :key="item.label" @click="goOrders">
            <div class="order-icon-wrap">
              <IconFont :name="item.icon" size="26" />
              <span v-if="item.badge" class="order-badge">{{ item.badge }}</span>
            </div>
            <div class="item-label">{{ item.label }}</div>
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

      <section class="detail-card service-section">
        <div class="section-title">
          <span class="main-title">常用工具</span>
        </div>
        <div class="service-grid">
          <div class="service-item" v-for="item in services" :key="item.label" @click="goService(item.path)">
            <IconFont :name="item.icon" size="24" class="service-icon" />
            <div class="item-label">{{ item.label }}</div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { IconFont } from '@nutui/icons-vue'
import { useMessagesStore } from '../stores/messages'
import '../styles/profile.css'

const router = useRouter()
const goOrders = () => router.push('/orders')
const goMessages = () => router.push('/messages')
const goService = (path) => router.push(path)

const topAssets = [
  { label: '卡包', num: 7 },
  { label: '卡券', num: 6 },
  { label: '商家券', num: 0 },
  { label: '近期关注', num: 12 }
]

const orderMenu = [
  { label: '待付款', icon: 'order', badge: 1 },
  { label: '待收货', icon: 'cart', badge: 3 },
  { label: '待评价', icon: 'message' },
  { label: '退换/售后', icon: 'service' }
]

const services = [
  { label: '商品收藏', icon: 'star', path: '/favorites' },
  { label: '店铺关注', icon: 'shop', path: '/follows' },
  { label: '足迹', icon: 'clock', path: '/footprints' },
  { label: '我的活动', icon: 'gift', path: '/activities' },
  { label: '地址管理', icon: 'location', path: '/addresses' },
  { label: '账户设置', icon: 'setting', path: '/account' },
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
</script>
