<template>
  <div class="order-list-page">
    <header class="navbar order-navbar">
      <div class="nav-left" @click="goBack">返回</div>
      <div class="title">订单列表</div>
      <div class="actions">···</div>
    </header>

    <div class="order-tabs">
      <div
        v-for="tab in tabs"
        :key="tab.key"
        class="order-tab"
        :class="{ active: activeTab === tab.key }"
        @click="activeTab = tab.key"
      >
        {{ tab.label }}
      </div>
    </div>

    <div class="page">
      <div v-for="order in filteredOrders" :key="order.id" class="order-card" @click="goDetail(order.id)">
        <div class="order-shop">
          <div class="shop-left">
            <span class="shop-tag">自营</span>
            <span class="shop-name">{{ order.shop }}</span>
          </div>
          <div class="order-status">{{ order.statusLabel }}</div>
        </div>

        <div class="order-thumbs">
          <img
            v-for="item in order.items"
            :key="item.sku"
            class="order-thumb"
            :src="item.image"
            :alt="item.name"
          />
        </div>

        <div class="order-meta">
          <span>共 {{ order.totalQty }} 件 · {{ order.items.length }} 件商品</span>
          <span>合计：<strong>¥{{ order.total.toFixed(2) }}</strong></span>
        </div>

        <div class="order-actions">
          <button class="btn-ghost" v-for="action in order.actions" :key="action">
            {{ action }}
          </button>
          <button v-if="order.primary" class="btn-primary">{{ order.primary }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const goBack = () => router.back()
const goDetail = (id) => router.push(`/order/${id}`)

const tabs = [
  { key: 'all', label: '全部' },
  { key: 'pay', label: '待付款' },
  { key: 'ship', label: '待发货' },
  { key: 'receive', label: '待收货' },
  { key: 'done', label: '已完成' }
]

const activeTab = ref('all')

const orders = ref([
  {
    id: 'o1',
    status: 'pay',
    statusLabel: '待付款',
    shop: '京东服务自营旗舰店',
    items: [
      {
        name: '京东洗衣服务衣服任洗2件上门取',
        sku: '衣服任洗 · 2件/双',
        price: 65,
        qty: 1,
        image: 'https://picsum.photos/seed/order1/160/160'
      }
    ],
    actions: ['取消订单'],
    primary: '去支付',
    delivery: '京东快递 · 预计2月6日送达',
    address: '工业南路295号玫瑰花园小区传达室',
    tags: ['7天无理由', '闪电退款']
  },
  {
    id: 'o2',
    status: 'ship',
    statusLabel: '待发货',
    shop: '宫菱官方旗舰店',
    items: [
      {
        name: '宫菱Fxgonne空气炸锅家用5L大容量',
        sku: 'MAXS 欧盟认证款 5L',
        price: 599,
        qty: 1,
        image: 'https://picsum.photos/seed/order2/160/160'
      }
    ],
    actions: ['提醒发货'],
    primary: '',
    delivery: '京东快递 · 预计2月8日送达',
    address: '山东省 济南市 历下区 龙奥大厦 2025室',
    tags: ['价保服务', '坏了包退']
  },
  {
    id: 'o3',
    status: 'receive',
    statusLabel: '待收货',
    shop: '美国西屋厨房电器京东自营旗舰店',
    items: [
      {
        name: '西屋可视化空气炸锅',
        sku: 'H10 内外控温',
        price: 373.06,
        qty: 1,
        image: 'https://picsum.photos/seed/order3/160/160'
      }
    ],
    actions: ['查看物流'],
    primary: '确认收货',
    delivery: '京东快递 · 运输中',
    address: '北京市 朝阳区 建国路88号 SOHO现代城',
    tags: ['极速退款', '上门取件']
  },
  {
    id: 'o4',
    status: 'done',
    statusLabel: '已完成',
    shop: 'Apple官方旗舰店',
    items: [
      {
        name: 'Apple iPad Air 11英寸 M3芯片',
        sku: '星光色 | WLAN 256G',
        price: 4199,
        qty: 1,
        image: 'https://picsum.photos/seed/order4/160/160'
      },
      {
        name: 'Apple Pencil 2代',
        sku: '官方标配',
        price: 699,
        qty: 1,
        image: 'https://picsum.photos/seed/order5/160/160'
      }
    ],
    actions: ['再来一单'],
    primary: '评价',
    delivery: '京东快递 · 已送达',
    address: '上海市 徐汇区 漕溪北路88号',
    tags: ['正品保证', '全国联保']
  }
])

const withTotals = (order) => {
  const totalQty = order.items.reduce((sum, item) => sum + item.qty, 0)
  const total = order.items.reduce((sum, item) => sum + item.qty * item.price, 0)
  return { ...order, totalQty, total }
}

const enrichedOrders = computed(() => orders.value.map(withTotals))
const filteredOrders = computed(() => {
  const list = activeTab.value === 'all'
    ? enrichedOrders.value
    : enrichedOrders.value.filter((o) => o.status === activeTab.value)
  return list
})
</script>
