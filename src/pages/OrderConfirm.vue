<template>
  <div class="order-page">
    <header class="order-navbar">
      <button class="nav-back" @click="goBack">‹</button>
      <div class="order-title">确认订单</div>
      <div class="nav-spacer"></div>
    </header>

    <section class="order-card address-card" @click="showAddress = true">
      <div class="addr-tag">默认</div>
      <div class="addr-main">工业南路295号玫瑰花园小区传达室</div>
      <div class="addr-sub">徐爱亮 135****0329</div>
      <div class="addr-arrow">···</div>
    </section>

    <section class="order-card store-card">
      <div class="store-title">JD 京东自营</div>
      <div class="item-row">
        <img class="item-thumb" :src="product.image" :alt="product.title" />
        <div class="item-info">
          <div class="item-title">{{ product.title }}</div>
          <div class="item-sku">11英寸 星光色 | WLAN版256G</div>
          <div class="item-price">¥{{ product.price }}</div>
          <div class="item-tags">
            <span class="tag">支持7天无理由退货（防伪签、密封条损毁不支持）</span>
            <span class="tag">7天价保</span>
          </div>
        </div>
        <div class="item-qty">
          <button class="qty-btn">-</button>
          <span>1</span>
          <button class="qty-btn">+</button>
        </div>
      </div>

      <div class="row-line" @click="showDelivery = true">
        <span>配送</span>
        <span class="row-right">京东快递 ···</span>
      </div>
      <div class="row-line" @click="showSchedule = true">
        <span>预约</span>
        <span class="row-right">2月6日 [周五] 09:00-15:00 ···</span>
      </div>
    </section>

    <section class="order-card summary-card">
      <div class="row-line">
        <span>商品金额</span>
        <span class="row-right">¥{{ product.price }}</span>
      </div>
      <div class="row-line">
        <span>运费（总重:0.880kg）</span>
        <span class="row-right">¥0.00</span>
      </div>
      <div class="row-line" @click="showCoupon = true">
        <span>优惠券</span>
        <span class="row-right muted">无可用 ···</span>
      </div>
      <div class="row-line">
        <span>京豆</span>
        <span class="row-right muted">共184，满500可用</span>
      </div>
      <div class="row-line" @click="showGift = true">
        <span>礼品卡(京东卡/E卡)</span>
        <span class="row-right muted">无可用 ···</span>
      </div>
      <div class="row-line total">
        <span>合计：</span>
        <span class="row-right price">¥{{ product.price }}</span>
      </div>
    </section>

    <section class="order-card discount-card">
      <div class="row-line">
        <span>优惠明细</span>
        <span class="row-right muted">已优惠 ¥20.00</span>
      </div>
      <div class="discount-list">
        <div class="discount-item">
          <span>优惠券</span>
          <span>-¥20.00</span>
        </div>
        <div class="discount-item">
          <span>活动立减</span>
          <span>-¥0.00</span>
        </div>
      </div>
    </section>

    <section class="order-card" @click="showInvoice = true">
      <div class="row-line">
        <span>发票</span>
        <span class="row-right muted">数电普票(商品明细-个人) ···</span>
      </div>
    </section>

    <div class="order-footer">
      <div class="footer-price">¥{{ product.price }}</div>
      <button class="pay-btn">在线支付</button>
    </div>

    <nut-popup v-model:visible="showAddress" position="bottom" round>
      <div class="popup">
        <div class="popup-header">
          <span>选择地址</span>
          <nut-icon name="close" @click="showAddress = false" />
        </div>
        <div class="popup-list">
          <div class="popup-item active">工业南路295号玫瑰花园小区传达室</div>
          <div class="popup-item">山东省 济南市 历下区 龙奥大厦 2025室</div>
          <div class="popup-item">北京市 朝阳区 建国路88号 SOHO现代城</div>
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
          <div class="popup-item active">京东快递 · 免运费</div>
          <div class="popup-item">同城急送 · 2小时达</div>
          <div class="popup-item">预约配送 · 指定时间送达</div>
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
          <div class="popup-item active">2月6日 [周五] 09:00-15:00</div>
          <div class="popup-item">2月6日 [周五] 18:00-21:00</div>
          <div class="popup-item">2月7日 [周六] 09:00-15:00</div>
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
          <div class="coupon-row">
            <div class="coupon-value">¥20</div>
            <div class="coupon-info">
              <div class="coupon-title">满199减20</div>
              <div class="coupon-sub">有效期至 2026-03-01</div>
            </div>
            <button class="coupon-btn">使用</button>
          </div>
          <div class="coupon-row disabled">
            <div class="coupon-value">¥50</div>
            <div class="coupon-info">
              <div class="coupon-title">满500减50</div>
              <div class="coupon-sub">不满足使用条件</div>
            </div>
            <button class="coupon-btn" disabled>不可用</button>
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
          <div class="popup-item active">数电普票（商品明细-个人）</div>
          <div class="popup-item">数电普票（商品明细-企业）</div>
          <div class="popup-item">不开票</div>
        </div>
      </div>
    </nut-popup>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { products } from '../mock/products'
import { ref } from 'vue'

const router = useRouter()
const product = products[0]
const showAddress = ref(false)
const showDelivery = ref(false)
const showSchedule = ref(false)
const showCoupon = ref(false)
const showGift = ref(false)
const showInvoice = ref(false)

const goBack = () => {
  router.back()
}
</script>
