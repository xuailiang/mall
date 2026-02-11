<template>
  <div>
    <header class="navbar">
      <div class="title">店铺首页</div>
      <div class="actions">
        <span>关注</span>
        <span>客服</span>
      </div>
    </header>

    <div class="page">
      <section class="shop-hero">
        <div class="shop-header">
          <div class="shop-avatar"></div>
          <div>
            <div class="shop-name">甄选家居旗舰店</div>
            <div class="shop-meta">粉丝 32.1万 | 综合评分 4.8</div>
          </div>
          <button class="primary-action">+ 关注</button>
        </div>
        <div class="shop-tags">
          <span class="tag">官方自营</span>
          <span class="tag">7天无理由</span>
          <span class="tag">极速发货</span>
        </div>
      </section>

      <section class="section">
        <div class="section-title">
          <span>店铺热卖</span>
          <span class="hint">爆款推荐</span>
        </div>
        <div class="grid-2">
          <ProductCard v-for="item in hot" :key="item.id" class="clickable" @click="goProduct(item.id)">
            <template #thumb>
              <img class="card-image" :src="item.image" :alt="item.title" />
            </template>
            <template #title>
              {{ item.title }}
            </template>
            <template #meta>
              <PromoBadge>{{ item.badge }}</PromoBadge>
            </template>
            <template #footer>
              <PriceTag :price="item.price" :original="item.original" :showOriginal="true" />
            </template>
          </ProductCard>
        </div>
      </section>

      <section class="section">
        <div class="section-title">
          <span>全部商品</span>
          <span class="hint">共 {{ products.length }} 件</span>
        </div>
        <div class="waterfall">
          <div class="waterfall-card clickable" v-for="item in products" :key="item.id" @click="goProduct(item.id)">
            <img class="waterfall-thumb" :src="item.image" :alt="item.title" />
            <div class="waterfall-title">{{ item.title }}</div>
            <div class="waterfall-meta">{{ item.desc }}</div>
            <div class="waterfall-footer">
              <div class="price"><small>¥</small> {{ item.price }}</div>
              <PromoBadge>好价</PromoBadge>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import ProductCard from '../components/ProductCard.vue'
import PriceTag from '../components/PriceTag.vue'
import PromoBadge from '../components/PromoBadge.vue'
import { products } from '../mock/products'

const router = useRouter()
const hot = products.slice(0, 4)

const goProduct = (id) => {
  router.push(`/product/${id}`)
}
</script>
