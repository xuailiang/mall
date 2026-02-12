<template>
  <div class="order-page">
    <header class="order-navbar">
      <button class="nav-back" @click="goBack">‹</button>
      <div class="order-title">确认订单</div>
      <div class="nav-spacer"></div>
    </header>

    <section class="order-card address-card" @click="showAddress = true">
      <div class="addr-content">
        <div class="addr-line">
          <span class="addr-contact">{{ activeAddress?.name }} {{ activeAddress?.phone }}</span>
          <span class="addr-default">{{ activeAddress?.isDefault ? '默认地址' : '收货地址' }}</span>
        </div>
        <div class="addr-main">{{ activeAddress?.detail || '请选择收货地址' }}</div>
        <div class="addr-sub">{{ activeAddress?.region }} · {{ activeSchedule?.label || '请先选择配送时段' }}</div>
      </div>
      <div class="addr-arrow">···</div>
    </section>

    <section class="order-card store-card">
      <div class="store-title">JD 京东自营</div>
      <div class="item-row">
        <img class="item-thumb" :src="product.image" :alt="product.title" />
        <div class="item-info">
          <div class="item-title">{{ product.title }}</div>
          <div class="item-sku">11英寸 星光色 | WLAN版256G</div>
          <div class="item-price">¥{{ unitPrice.toFixed(2) }}</div>
          <div class="item-tags">
            <span class="tag">支持7天无理由退货（防伪签、密封条损毁不支持）</span>
            <span class="tag">7天价保</span>
          </div>
        </div>
        <div class="item-qty">
          <button class="qty-btn" :disabled="qty <= 1" @click="changeQty(-1)">-</button>
          <span>{{ qty }}</span>
          <button class="qty-btn" :disabled="qty >= maxQty" @click="changeQty(1)">+</button>
        </div>
      </div>

      <div class="row-line" @click="showDelivery = true">
        <span>配送</span>
        <span class="row-right">{{ activeDelivery?.label }} ···</span>
      </div>
      <div class="row-line" @click="showSchedule = true">
        <span>预约</span>
        <span class="row-right">{{ activeSchedule?.label }} ···</span>
      </div>
      <div class="row-line" @click="showPayment = true">
        <span>支付方式</span>
        <span class="row-right">{{ activePayment?.label }} ···</span>
      </div>
    </section>

    <section class="order-card summary-card">
      <div class="row-line">
        <span>商品金额</span>
        <span class="row-right">¥{{ subtotal.toFixed(2) }}</span>
      </div>
      <div class="row-line">
        <span>运费（总重:0.880kg）</span>
        <span class="row-right">¥{{ shippingFee.toFixed(2) }}</span>
      </div>
      <div class="row-line" @click="showCoupon = true">
        <span>优惠券</span>
        <span class="row-right" :class="{ muted: !activeCoupon }">
          {{ activeCoupon ? `-¥${couponDiscount.toFixed(2)}` : '无可用' }} ···
        </span>
      </div>
      <div class="row-line" @click="toggleBeans">
        <span>京豆（共184）</span>
        <span class="row-right" :class="{ muted: !useBeans }">{{ useBeans ? `-¥${beanDiscount.toFixed(2)}` : '未使用' }}</span>
      </div>
      <div class="row-line" @click="showGift = true">
        <span>礼品卡(京东卡/E卡)</span>
        <span class="row-right muted">{{ activeGift ? `-¥${activeGift.value.toFixed(2)}` : '无可用' }} ···</span>
      </div>
      <div class="row-line total">
        <span>合计：</span>
        <span class="row-right price">¥{{ payable.toFixed(2) }}</span>
      </div>
    </section>

    <section class="order-card" @click="showInvoice = true">
      <div class="row-line">
        <span>发票</span>
        <span class="row-right muted">{{ activeInvoice?.label }} ···</span>
      </div>
    </section>

    <section class="order-card note-card">
      <div class="row-line">
        <span>订单备注</span>
        <span class="row-right muted">{{ note ? '已填写' : '选填' }}</span>
      </div>
      <textarea v-model.trim="note" class="note-input" maxlength="60" placeholder="选填，请先和商家协商一致"></textarea>
      <div class="note-limit">{{ note.length }}/60</div>
    </section>

    <div class="order-footer-stack">
      <button class="footer-discount-toggle" @click="showDiscountPanel = !showDiscountPanel">
        <span>优惠明细 已优惠 ¥{{ totalDiscount.toFixed(2) }}</span>
        <span>{{ showDiscountPanel ? '收起' : '展开' }}</span>
      </button>
      <div class="footer-discount-panel" v-if="showDiscountPanel">
        <div class="discount-item">
          <span>优惠券</span>
          <span>-¥{{ couponDiscount.toFixed(2) }}</span>
        </div>
        <div class="discount-item">
          <span>活动立减</span>
          <span>-¥{{ activityDiscount.toFixed(2) }}</span>
        </div>
        <div class="discount-item">
          <span>京豆抵扣</span>
          <span>-¥{{ beanDiscount.toFixed(2) }}</span>
        </div>
      </div>
      <div class="order-footer">
        <div>
          <div class="footer-price">¥{{ payable.toFixed(2) }}</div>
          <div class="footer-sub">共 {{ qty }} 件商品</div>
        </div>
        <button class="pay-btn" :disabled="!canSubmit || submitting" @click="submitOrder">
          {{ submitting ? '支付提交中...' : '在线支付' }}
        </button>
      </div>
    </div>

    <nut-popup v-model:visible="showAddress" position="bottom" round>
      <div class="popup">
        <div class="popup-header">
          <span>选择地址</span>
          <nut-icon name="close" @click="showAddress = false" />
        </div>
        <div class="popup-list">
          <div
            class="popup-item"
            :class="{ active: item.id === selectedAddressId }"
            v-for="item in addresses"
            :key="item.id"
            @click="chooseAddress(item.id)"
          >
            <div class="popup-addr-title">{{ item.name }} {{ item.phone }}</div>
            <div class="popup-addr-sub">{{ item.region }} {{ item.detail }}</div>
          </div>
          <button class="popup-primary">新增收货地址</button>
        </div>
      </div>
    </nut-popup>

    <nut-popup v-model:visible="showDelivery" position="bottom" round>
      <div class="popup">
        <div class="popup-header">
          <span>配送方式</span>
          <nut-icon name="close" @click="showDelivery = false" />
        </div>
        <div class="popup-list">
          <div
            class="popup-item"
            :class="{ active: item.id === selectedDeliveryId }"
            v-for="item in deliveries"
            :key="item.id"
            @click="chooseDelivery(item.id)"
          >
            {{ item.label }}
          </div>
        </div>
      </div>
    </nut-popup>

    <nut-popup v-model:visible="showSchedule" position="bottom" round>
      <div class="popup">
        <div class="popup-header">
          <span>预约时间</span>
          <nut-icon name="close" @click="showSchedule = false" />
        </div>
        <div class="popup-list">
          <div
            class="popup-item"
            :class="{ active: item.id === selectedScheduleId }"
            v-for="item in schedules"
            :key="item.id"
            @click="chooseSchedule(item.id)"
          >
            {{ item.label }}
          </div>
        </div>
      </div>
    </nut-popup>

    <nut-popup v-model:visible="showCoupon" position="bottom" round>
      <div class="popup">
        <div class="popup-header">
          <span>优惠券</span>
          <nut-icon name="close" @click="showCoupon = false" />
        </div>
        <div class="popup-list">
          <div class="coupon-row" :class="{ disabled: !isCouponAvailable(item) }" v-for="item in coupons" :key="item.id">
            <div class="coupon-value">¥{{ item.value }}</div>
            <div class="coupon-info">
              <div class="coupon-title">{{ item.title }}</div>
              <div class="coupon-sub">{{ item.desc }}</div>
            </div>
            <button class="coupon-btn" :disabled="!isCouponAvailable(item)" @click="chooseCoupon(item.id)">
              {{ selectedCouponId === item.id ? '已使用' : '使用' }}
            </button>
          </div>
        </div>
      </div>
    </nut-popup>

    <nut-popup v-model:visible="showGift" position="bottom" round>
      <div class="popup">
        <div class="popup-header">
          <span>礼品卡</span>
          <nut-icon name="close" @click="showGift = false" />
        </div>
        <div class="popup-list">
          <div class="popup-item muted">暂无可用礼品卡</div>
        </div>
      </div>
    </nut-popup>

    <nut-popup v-model:visible="showInvoice" position="bottom" round>
      <div class="popup">
        <div class="popup-header">
          <span>发票信息</span>
          <nut-icon name="close" @click="showInvoice = false" />
        </div>
        <div class="popup-list">
          <div
            class="popup-item"
            :class="{ active: item.id === selectedInvoiceId }"
            v-for="item in invoices"
            :key="item.id"
            @click="chooseInvoice(item.id)"
          >
            {{ item.label }}
          </div>
        </div>
      </div>
    </nut-popup>

    <nut-popup v-model:visible="showPayment" position="bottom" round>
      <div class="popup">
        <div class="popup-header">
          <span>支付方式</span>
          <nut-icon name="close" @click="showPayment = false" />
        </div>
        <div class="popup-list">
          <div
            class="popup-item"
            :class="{ active: item.id === selectedPaymentId }"
            v-for="item in paymentMethods"
            :key="item.id"
            @click="choosePayment(item.id)"
          >
            {{ item.label }}
          </div>
        </div>
      </div>
    </nut-popup>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { showToast } from '@nutui/nutui'
import { products } from '../mock/products'

const router = useRouter()
const product = products[0]

const qty = ref(1)
const maxQty = product.stock || 99
const showAddress = ref(false)
const showDelivery = ref(false)
const showSchedule = ref(false)
const showCoupon = ref(false)
const showGift = ref(false)
const showInvoice = ref(false)
const showPayment = ref(false)
const showDiscountPanel = ref(false)
const submitting = ref(false)
const useBeans = ref(false)
const selectedCouponId = ref(null)
const note = ref('')

const addresses = [
  { id: 'addr1', name: '徐爱亮', phone: '135****0329', region: '山东省 济南市 历下区', detail: '工业南路295号玫瑰花园小区传达室', isDefault: true },
  { id: 'addr2', name: '张三', phone: '156****1234', region: '山东省 济南市 历下区', detail: '龙奥大厦 2025室', isDefault: false },
  { id: 'addr3', name: '李四', phone: '138****5678', region: '北京市 朝阳区', detail: '建国路88号 SOHO现代城', isDefault: false }
]
const selectedAddressId = ref(addresses.find((item) => item.isDefault)?.id || addresses[0].id)

const deliveries = [
  { id: 'd1', label: '京东快递 · 免运费', fee: 0 },
  { id: 'd2', label: '同城急送 · 2小时达', fee: 8 },
  { id: 'd3', label: '预约配送 · 指定时间送达', fee: 3 }
]
const selectedDeliveryId = ref(deliveries[0].id)

const schedules = [
  { id: 's1', label: '2月6日 [周五] 09:00-15:00' },
  { id: 's2', label: '2月6日 [周五] 18:00-21:00' },
  { id: 's3', label: '2月7日 [周六] 09:00-15:00' }
]
const selectedScheduleId = ref(schedules[0].id)

const invoices = [
  { id: 'i1', label: '数电普票（商品明细-个人）' },
  { id: 'i2', label: '数电普票（商品明细-企业）' },
  { id: 'i3', label: '不开票' }
]
const selectedInvoiceId = ref(invoices[0].id)

const paymentMethods = [
  { id: 'p1', label: '在线支付（推荐）' },
  { id: 'p2', label: '微信支付' },
  { id: 'p3', label: '支付宝支付' }
]
const selectedPaymentId = ref(paymentMethods[0].id)

const coupons = [
  { id: 'c1', value: 20, threshold: 199, title: '满199减20', desc: '有效期至 2026-03-01' },
  { id: 'c2', value: 50, threshold: 500, title: '满500减50', desc: '满500可用' },
  { id: 'c3', value: 80, threshold: 899, title: '满899减80', desc: '限时活动券' }
]

const unitPrice = computed(() => Number(product.price || 0))
const subtotal = computed(() => unitPrice.value * qty.value)
const activeAddress = computed(() => addresses.find((item) => item.id === selectedAddressId.value))
const activeDelivery = computed(() => deliveries.find((item) => item.id === selectedDeliveryId.value))
const activeSchedule = computed(() => schedules.find((item) => item.id === selectedScheduleId.value))
const activeInvoice = computed(() => invoices.find((item) => item.id === selectedInvoiceId.value))
const activePayment = computed(() => paymentMethods.find((item) => item.id === selectedPaymentId.value))
const activeCoupon = computed(() => coupons.find((item) => item.id === selectedCouponId.value))
const activeGift = computed(() => null)
const shippingFee = computed(() => Number(activeDelivery.value?.fee || 0))
const couponDiscount = computed(() => {
  if (!activeCoupon.value) return 0
  return subtotal.value >= activeCoupon.value.threshold ? activeCoupon.value.value : 0
})
const activityDiscount = computed(() => (subtotal.value >= 399 ? 10 : 0))
const beanDiscount = computed(() => (useBeans.value && subtotal.value >= 500 ? 1.84 : 0))
const totalDiscount = computed(() => couponDiscount.value + activityDiscount.value + beanDiscount.value + (activeGift.value?.value || 0))
const payable = computed(() => Math.max(subtotal.value + shippingFee.value - totalDiscount.value, 0))
const canSubmit = computed(() => Boolean(activeAddress.value) && Boolean(activePayment.value) && qty.value > 0)

const isCouponAvailable = (coupon) => subtotal.value >= coupon.threshold

const changeQty = (delta) => {
  const next = qty.value + delta
  qty.value = Math.max(1, Math.min(maxQty, next))
}

const chooseAddress = (id) => {
  selectedAddressId.value = id
  showAddress.value = false
  showToast.text('收货地址已更新')
}

const chooseDelivery = (id) => {
  selectedDeliveryId.value = id
  showDelivery.value = false
  showToast.text('配送方式已更新')
}

const chooseSchedule = (id) => {
  selectedScheduleId.value = id
  showSchedule.value = false
  showToast.text('预约时间已更新')
}

const chooseCoupon = (id) => {
  selectedCouponId.value = selectedCouponId.value === id ? null : id
  showCoupon.value = false
  showToast.text(selectedCouponId.value ? '优惠券已使用' : '已取消优惠券')
}

const chooseInvoice = (id) => {
  selectedInvoiceId.value = id
  showInvoice.value = false
  showToast.text('发票信息已更新')
}

const choosePayment = (id) => {
  selectedPaymentId.value = id
  showPayment.value = false
  showToast.text('支付方式已更新')
}

const toggleBeans = () => {
  if (subtotal.value < 500) {
    showToast.text('满500元可使用京豆')
    return
  }
  useBeans.value = !useBeans.value
  showToast.text(useBeans.value ? '已使用京豆抵扣' : '已取消京豆抵扣')
}

const submitOrder = async () => {
  if (!canSubmit.value || submitting.value) return
  submitting.value = true
  try {
    await new Promise((resolve) => setTimeout(resolve, 900))
    showToast.success('订单提交成功，正在跳转支付')
  } finally {
    submitting.value = false
  }
}

const goBack = () => {
  if (window.history.length > 1) router.back()
  else router.push('/cart')
}
</script>
