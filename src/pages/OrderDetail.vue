<template>
  <div class="order-detail-page">
    <header class="navbar order-navbar">
      <div class="nav-left" @click="goBack">返回</div>
      <div class="title">订单详情</div>
      <div class="actions">···</div>
    </header>

    <div class="page">
      <section class="detail-card status-card">
        <div class="status-title">{{ order.statusLabel }}</div>
        <div class="status-sub">预计送达：{{ order.delivery }}</div>
      </section>

      <section class="detail-card address-card">
        <div class="card-title">收货地址</div>
        <div class="address-main">{{ order.address }}</div>
        <div class="address-sub">收货人：{{ order.user }} · {{ order.phone }}</div>
      </section>

      <section class="detail-card goods-card">
        <div class="card-title">商品信息</div>
        <div class="goods-item" v-for="item in order.items" :key="item.sku">
          <img class="goods-thumb" :src="item.image" :alt="item.name" />
          <div class="goods-info">
            <div class="goods-title">{{ item.name }}</div>
            <div class="goods-sku">{{ item.sku }}</div>
          </div>
          <div class="goods-right">
            <div class="goods-price">¥{{ item.price.toFixed(2) }}</div>
            <div class="goods-qty">x{{ item.qty }}</div>
          </div>
        </div>
      </section>

      <section class="detail-card meta-card">
        <div class="meta-row">
          <span>商品金额</span>
          <strong>¥{{ order.total.toFixed(2) }}</strong>
        </div>
        <div class="meta-row">
          <span>运费</span>
          <span>¥0.00</span>
        </div>
        <div class="meta-row">
          <span>优惠券</span>
          <span>-¥{{ order.discount.toFixed(2) }}</span>
        </div>
        <div class="meta-row total">
          <span>实付</span>
          <strong>¥{{ (order.total - order.discount).toFixed(2) }}</strong>
        </div>
      </section>

      <section class="detail-card service-card">
        <div class="card-title">服务与保障</div>
        <div class="service-tags">
          <span class="mini-tag" v-for="tag in order.tags" :key="tag">{{ tag }}</span>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { products } from '../mock/products'

const route = useRoute()
const router = useRouter()
const goBack = () => router.back()

const orders = [
  {
    id: 'o1',
    statusLabel: '待付款',
    delivery: '2月6日 09:00-15:00',
    address: '工业南路295号玫瑰花园小区传达室',
    user: '徐爱亮',
    phone: '135****0329',
    items: [
      { name: '京东洗衣服务衣服任洗2件上门取', sku: '衣服任洗 · 2件/双', price: 65, qty: 1, image: products[0].image }
    ],
    discount: 10,
    tags: ['7天无理由', '闪电退款']
  },
  {
    id: 'o2',
    statusLabel: '待发货',
    delivery: '2月8日 24:00前送达',
    address: '山东省 济南市 历下区 龙奥大厦 2025室',
    user: '张三',
    phone: '156****1234',
    items: [
      { name: '宫菱Fxgonne空气炸锅家用5L大容量', sku: 'MAXS 欧盟认证款 5L', price: 599, qty: 1, image: products[3].image }
    ],
    discount: 20,
    tags: ['价保服务', '坏了包退']
  },
  {
    id: 'o3',
    statusLabel: '待收货',
    delivery: '运输中 · 京东快递',
    address: '北京市 朝阳区 建国路88号 SOHO现代城',
    user: '李四',
    phone: '138****5678',
    items: [
      { name: '西屋可视化空气炸锅', sku: 'H10 内外控温', price: 373.06, qty: 1, image: products[2].image }
    ],
    discount: 15,
    tags: ['极速退款', '上门取件']
  }
]

const order = computed(() => {
  const found = orders.find((item) => item.id === route.params.id)
  const fallback = orders[0]
  const total = found?.items.reduce((sum, item) => sum + item.price * item.qty, 0) || fallback.items.reduce((sum, item) => sum + item.price * item.qty, 0)
  return { ...(found || fallback), total }
})
</script>
