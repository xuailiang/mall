<template>
  <div class="refund-page">
    <header class="refund-header">
      <button class="nav-back" @click="goBack">‹</button>
      <div class="page-title">申请售后</div>
      <div class="nav-spacer"></div>
    </header>

    <div class="refund-body">
      <!-- Order Info -->
      <section class="refund-card">
        <div class="refund-product">
          <img :src="product.image" class="refund-thumb" />
          <div class="refund-info">
            <div class="refund-name">{{ product.title }}</div>
            <div class="refund-sku">{{ product.desc }}</div>
            <div class="refund-price">¥{{ product.price }}</div>
          </div>
        </div>
      </section>

      <!-- Refund Type -->
      <section class="refund-card">
        <div class="card-title">售后类型</div>
        <div class="refund-type-grid">
          <div
            v-for="type in refundTypes"
            :key="type.key"
            class="type-item"
            :class="{ active: selectedType === type.key }"
            @click="selectedType = type.key"
          >
            <div class="type-icon">{{ type.icon }}</div>
            <div class="type-label">{{ type.label }}</div>
          </div>
        </div>
      </section>

      <!-- Refund Reason -->
      <section class="refund-card">
        <div class="card-title">退换原因</div>
        <div class="reason-list">
          <div
            v-for="r in reasons"
            :key="r"
            class="reason-item"
            :class="{ active: selectedReason === r }"
            @click="selectedReason = r"
          >
            <span>{{ r }}</span>
            <span class="reason-check" v-if="selectedReason === r">✓</span>
          </div>
        </div>
      </section>

      <!-- Description -->
      <section class="refund-card">
        <div class="card-title">问题描述</div>
        <textarea v-model="description" class="refund-textarea" placeholder="请详细描述您遇到的问题（选填）" maxlength="200"></textarea>
        <div class="char-count">{{ description.length }}/200</div>
      </section>

      <!-- Refund Amount -->
      <section class="refund-card" v-if="selectedType === 'refund'">
        <div class="card-title">退款金额</div>
        <div class="refund-amount">
          <span class="amount-symbol">¥</span>
          <span class="amount-value">{{ product.price }}</span>
        </div>
        <div class="amount-hint">含运费 ¥0.00（免运费商品）</div>
      </section>

      <div class="refund-submit">
        <button class="submit-btn" :disabled="!canSubmit" @click="handleSubmit">提交申请</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { showToast } from '@nutui/nutui'
import { products } from '../mock/products'

const router = useRouter()
const product = products[0]

const selectedType = ref('refund')
const selectedReason = ref('')
const description = ref('')

const refundTypes = [
  { key: 'refund', label: '仅退款', icon: '💰' },
  { key: 'return', label: '退货退款', icon: '📦' },
  { key: 'exchange', label: '换货', icon: '🔄' },
  { key: 'repair', label: '维修', icon: '🔧' }
]

const reasons = [
  '不想要了/不需要了',
  '商品与描述不符',
  '质量问题',
  '收到商品破损',
  '发错货/漏发',
  '未按约定时间发货',
  '其他原因'
]

const canSubmit = computed(() => selectedReason.value !== '')

const handleSubmit = () => {
  showToast.text('售后申请已提交，客服将在24小时内处理')
  setTimeout(() => router.back(), 1500)
}

const goBack = () => router.back()
</script>
