<template>
  <div class="coupon-page">
    <header class="refund-header">
      <button class="nav-back" @click="$router.back()">‹</button>
      <div class="page-title">优惠券中心</div>
      <div class="nav-spacer"></div>
    </header>

    <div class="coupon-tabs">
      <span v-for="tab in tabs" :key="tab.key" class="coupon-tab" :class="{ active: activeTab === tab.key }" @click="activeTab = tab.key">
        {{ tab.label }}
      </span>
    </div>

    <div class="coupon-body">
      <div v-for="c in filteredCoupons" :key="c.id" class="coupon-card-full">
        <div class="coupon-card-left" :class="c.type">
          <div class="coupon-card-amount">¥{{ c.amount }}</div>
          <div class="coupon-card-threshold">满{{ c.threshold }}可用</div>
        </div>
        <div class="coupon-card-right">
          <div class="coupon-card-name">{{ c.name }}</div>
          <div class="coupon-card-expire">{{ c.expire }}</div>
          <div class="coupon-card-scope">{{ c.scope }}</div>
        </div>
        <button class="coupon-card-btn" :class="{ claimed: c.claimed }" @click="claimCoupon(c)">
          {{ c.claimed ? '已领取' : '立即领取' }}
        </button>
      </div>
      <div v-if="!filteredCoupons.length" class="search-empty">
        <div class="empty-icon">🎫</div>
        <div class="empty-text">暂无可用优惠券</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeTab = ref('available')
const tabs = [
  { key: 'available', label: '可领取' },
  { key: 'mine', label: '我的券' },
  { key: 'expired', label: '已过期' }
]

const coupons = ref([
  { id: 1, amount: 20, threshold: 199, name: '全品类满减券', expire: '2026-03-31', scope: '全场通用', type: 'red', claimed: false, status: 'available' },
  { id: 2, amount: 50, threshold: 500, name: '数码家电专享', expire: '2026-03-15', scope: '限数码家电', type: 'gold', claimed: false, status: 'available' },
  { id: 3, amount: 10, threshold: 99, name: '新人专享券', expire: '2026-04-01', scope: '首单使用', type: 'red', claimed: false, status: 'available' },
  { id: 4, amount: 30, threshold: 299, name: '食品生鲜券', expire: '2026-03-20', scope: '限食品生鲜', type: 'green', claimed: false, status: 'available' },
  { id: 5, amount: 100, threshold: 999, name: '家装大额券', expire: '2026-02-28', scope: '限家装建材', type: 'gold', claimed: true, status: 'mine' },
  { id: 6, amount: 15, threshold: 149, name: '日用百货券', expire: '2025-12-31', scope: '已过期', type: 'gray', claimed: true, status: 'expired' }
])

const filteredCoupons = computed(() => coupons.value.filter(c => c.status === activeTab.value))

const claimCoupon = (c) => {
  if (c.claimed) return
  c.claimed = true
  c.status = 'mine'
}
</script>
