<template>
  <div class="payresult-page">
    <header class="payresult-header">
      <button class="nav-back" @click="goHome">×</button>
    </header>

    <div class="payresult-body">
      <div class="result-icon success">✓</div>
      <div class="result-title">支付成功</div>
      <div class="result-amount">¥{{ amount }}</div>

      <div class="result-info-card">
        <div class="info-row">
          <span class="info-label">订单编号</span>
          <span class="info-value">{{ orderId }}</span>
        </div>
        <div class="info-row">
          <span class="info-label">支付方式</span>
          <span class="info-value">在线支付</span>
        </div>
        <div class="info-row">
          <span class="info-label">预计送达</span>
          <span class="info-value">{{ deliveryDate }}</span>
        </div>
      </div>

      <div class="result-actions">
        <button class="result-btn primary" @click="goOrderDetail">查看订单</button>
        <button class="result-btn ghost" @click="goHome">返回首页</button>
      </div>

      <div class="result-recommend">
        <div class="recommend-title">🎁 推荐好物</div>
        <div class="recommend-scroll">
          <div class="recommend-card" v-for="item in recommend" :key="item.id" @click="goProduct(item.id)">
            <img :src="item.image" :alt="item.title" />
            <div class="recommend-name">{{ item.title }}</div>
            <div class="recommend-price">¥{{ item.price }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { products } from '../mock/products'

const router = useRouter()
const route = useRoute()

const orderId = computed(() => route.query.orderId || 'JD' + Date.now())
const amount = computed(() => route.query.amount || '295.00')

const today = new Date()
const delivery = new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000)
const deliveryDate = `${delivery.getMonth() + 1}月${delivery.getDate()}日`

const recommend = products.slice(0, 6)

const goHome = () => router.replace('/')
const goOrderDetail = () => router.push('/orders')
const goProduct = (id) => router.push(`/product/${id}`)
</script>
