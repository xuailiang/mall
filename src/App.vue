<template>
  <router-view v-slot="{ Component }">
    <transition name="page-fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
  <nut-tabbar v-if="showTabbar" v-model="tab" fixed>
    <nut-tabbar-item tab-title="首页" name="/">
      <template #icon>
        <IconFont name="home" />
      </template>
    </nut-tabbar-item>
    <nut-tabbar-item tab-title="分类" name="/category">
      <template #icon>
        <IconFont name="category" />
      </template>
    </nut-tabbar-item>
    <nut-tabbar-item tab-title="购物车" name="/cart" :value="cartCount > 0 ? cartCount : null">
       <template #icon>
        <IconFont name="cart" />
      </template>
    </nut-tabbar-item>
    <nut-tabbar-item tab-title="我的" name="/profile">
      <template #icon>
        <IconFont name="my" />
      </template>
    </nut-tabbar-item>
  </nut-tabbar>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCartStore } from './stores/cart'
import { IconFont } from '@nutui/icons-vue'

const route = useRoute()
const router = useRouter()
const cartStore = useCartStore()
const cartCount = computed(() => cartStore.selectedCount)

const tab = computed({
  get: () => route.path,
  set: (val) => {
    if (val !== route.path) {
      router.push(val)
    }
  }
})

const showTabbar = computed(() => route.meta?.showTabbar === true)
</script>
