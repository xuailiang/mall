<template>
  <div class="logistics-page">
    <header class="refund-header">
      <button class="nav-back" @click="$router.back()">‹</button>
      <div class="page-title">物流详情</div>
      <div class="nav-spacer"></div>
    </header>

    <div class="logistics-product-bar">
      <img :src="order.image" class="logistics-bar-img" />
      <div class="logistics-bar-info">
        <div class="logistics-bar-carrier">{{ order.carrier }}</div>
        <div class="logistics-bar-number">运单号：{{ order.trackingNo }}</div>
      </div>
      <button class="logistics-bar-copy" @click="copyTracking">复制</button>
    </div>

    <div class="timeline-body">
      <div v-for="(step, idx) in timeline" :key="idx" class="timeline-item" :class="{ active: idx === 0 }">
        <div class="timeline-dot" :class="{ active: idx === 0 }"></div>
        <div class="timeline-line" v-if="idx < timeline.length - 1"></div>
        <div class="timeline-content">
          <div class="timeline-text">{{ step.text }}</div>
          <div class="timeline-time">{{ step.time }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { showToast } from '@nutui/nutui'
import { products } from '../mock/products'

const order = {
  image: products[0].image,
  carrier: '京东快递',
  trackingNo: 'JD0086423571982'
}

const timeline = [
  { text: '您的订单已由本人签收，如有疑问请联系快递员【王师傅 138****6789】', time: '2026-02-24 14:30' },
  { text: '派送中：您的快件正在派送，派送员【王师傅】，联系电话【138****6789】', time: '2026-02-24 09:15' },
  { text: '到达：已到达【北京朝阳营业部】', time: '2026-02-24 07:20' },
  { text: '运输中：快件已从【北京分拣中心】发出，下一站【北京朝阳营业部】', time: '2026-02-23 22:45' },
  { text: '运输中：快件已从【上海转运中心】发出，下一站【北京分拣中心】', time: '2026-02-23 15:30' },
  { text: '已揽件：快件已由【上海嘉定揽投部】揽收', time: '2026-02-23 10:00' },
  { text: '商家已发货：您的订单由商家交付快递，感谢您的耐心等待', time: '2026-02-23 09:30' },
  { text: '您提交了订单，请等待系统确认', time: '2026-02-22 20:15' }
]

const copyTracking = () => {
  navigator.clipboard?.writeText(order.trackingNo)
  showToast.text('运单号已复制')
}
</script>
