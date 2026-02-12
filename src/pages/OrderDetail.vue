<template>
  <div class="order-detail-page">
    <header class="navbar order-navbar">
      <IconFont name="left" class="back-icon" @click="goBack" />
      <div class="title">订单详情</div>
      <div class="actions">···</div>
    </header>

    <div class="status-header" :class="'status-' + order.status">
      <div class="header-content">
        <div class="status-text-wrap">
          <div class="primary-status">{{ order.statusLabel }}</div>
          <div class="secondary-status">{{ statusDesc }}</div>
        </div>
        <div class="status-icon-box">
          <IconFont v-if="order.status === 'pay'" name="clock" size="48" />
          <IconFont v-else-if="order.status === 'ship'" name="service" size="48" />
          <IconFont v-else-if="order.status === 'receive'" name="location" size="48" />
          <IconFont v-else-if="order.status === 'done'" name="checked" size="48" />
          <IconFont v-else name="checked" size="48" />
        </div>
      </div>
    </div>

    <div class="page">
      <section class="detail-card delivery-track-card" v-if="order.deliverySnippet">
        <div class="track-icon">
          <IconFont name="location" size="14" />
        </div>
        <div class="track-info">
          <div class="track-text">{{ order.deliverySnippet }}</div>
          <div class="track-time">2026-02-12 10:20:45</div>
        </div>
        <IconFont name="right" size="12" class="arrow" />
      </section>

      <section class="detail-card address-card">
        <div class="card-title">收货地址</div>
        <div class="address-main">{{ order.address }}</div>
        <div class="address-sub">收货人：{{ order.user }} · {{ order.phone }}</div>
      </section>

      <section class="detail-card goods-card">
        <div class="shop-line">
          <IconFont name="shop" size="14" />
          <span class="shop-name">{{ order.shop || '京东自营' }}</span>
          <IconFont name="right" size="10" />
        </div>
        <div class="goods-item" v-for="item in order.items" :key="item.sku">
          <img class="goods-thumb" :src="item.image" :alt="item.name" />
          <div class="goods-info">
            <div class="goods-title">{{ item.name }}</div>
            <div class="goods-sku">{{ item.sku }}</div>
            <div class="goods-tags">
              <span class="lite-tag">7天无理由退换</span>
            </div>
          </div>
          <div class="goods-right">
            <div class="goods-price">¥{{ item.price.toFixed(2) }}</div>
            <div class="goods-qty">x{{ item.qty }}</div>
          </div>
        </div>
        <div class="order-actions-row">
          <button class="btn-ghost">申请售后</button>
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

      <section class="detail-card info-card">
        <div class="info-row">
          <span class="label">订单编号：</span>
          <span class="value">28479201837482937 <span class="copy-btn">复制</span></span>
        </div>
        <div class="info-row">
          <span class="label">下单时间：</span>
          <span class="value">2026-02-12 09:45:12</span>
        </div>
        <div class="info-row">
          <span class="label">支付方式：</span>
          <span class="value">在线支付</span>
        </div>
        <div class="info-row">
          <span class="label">发票类型：</span>
          <span class="value">普通发票（电子）</span>
        </div>
      </section>
    </div>

    <div class="order-footer">
      <div v-if="order.id === 'o1'" class="footer-actions">
        <button class="btn-ghost">取消订单</button>
        <button class="btn-primary">去支付</button>
      </div>
      <div v-else-if="order.status === 'done'" class="footer-actions">
        <button class="btn-ghost" @click="router.push('/order/o4')">申请售后</button>
        <button class="btn-ghost">评价晒单</button>
        <button class="btn-primary">再次购买</button>
      </div>
      <div v-else class="footer-actions">
        <button class="btn-ghost">查看物流</button>
        <button class="btn-ghost">删除订单</button>
        <button class="btn-primary">再次购买</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { IconFont } from '@nutui/icons-vue'
import { products } from '../mock/products'

const route = useRoute()
const router = useRouter()
const goBack = () => router.back()

const orders = [
  {
    id: 'o1',
    status: 'pay',
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
    status: 'ship',
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
    status: 'receive',
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
  },
  {
    id: 'o4',
    status: 'done',
    statusLabel: '已完成',
    delivery: '订单已完成，感谢您的支持',
    address: '上海市 徐汇区 漕溪北路88号',
    user: '王五',
    phone: '139****9999',
    items: [
      { name: 'Apple iPad Air 11英寸 M3芯片', sku: '星光色 | WLAN 256G', price: 4199, qty: 1, image: products[4].image }
    ],
    discount: 0,
    tags: ['官方原装', '全国联保']
  }
]

const order = computed(() => {
  const found = orders.find((item) => item.id === route.params.id)
  const fallback = orders[0]
  const total = found?.items.reduce((sum, item) => sum + item.price * item.qty, 0) || fallback.items.reduce((sum, item) => sum + item.price * item.qty, 0)
  
  // Add some mock data for UI enhancement
  const deliverySnippet = found?.id === 'o1' ? '' : '您的订单已到达【上海分拣中心】，正在发往下一站'
  const shop = found?.id === 'o1' ? '京东服务自营旗舰店' : found?.id === 'o2' ? '宫菱官方旗舰店' : '美国西屋厨房电器京东自营旗舰店'

  return { ...(found || fallback), total, deliverySnippet, shop }
})

const statusDesc = computed(() => {
  const s = order.value.status
  switch (s) {
    case 'pay':
      return '剩 23 小时 59 分自动取消'
    case 'ship':
      return '商家正在备货，预计24小时内发出'
    case 'receive':
      return '拼命配送中，请保持手机畅通'
    case 'done':
      return '感谢您的支持，期待下次光临'
    default:
      return ''
  }
})
</script>
