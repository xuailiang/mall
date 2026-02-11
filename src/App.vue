<template>
  <router-view v-slot="{ Component }">
    <transition name="page-fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
  <nut-tabbar v-if="showTabbar" v-model="tab" fixed>
    <nut-tabbar-item tab-title="首页" name="/" />
    <nut-tabbar-item tab-title="分类" name="/category" />
    <nut-tabbar-item tab-title="购物车" name="/cart" />
    <nut-tabbar-item tab-title="我的" name="/profile" />
  </nut-tabbar>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

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
