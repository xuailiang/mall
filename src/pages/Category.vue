<template>
  <div class="category-page">
    <!-- Header -->
    <header class="category-header">
      <div class="cat-search-wrap">
        <div class="cat-search">
          <IconFont name="search" size="14" class="cat-search-icon" />
          <input v-model="search" placeholder="搜索商品" />
        </div>
      </div>
    </header>

    <!-- Body: Left Nav + Right Content -->
    <div class="category-body">
      <!-- Left Nav -->
      <aside class="category-left">
        <div
          v-for="cat in categories"
          :key="cat.id"
          class="left-item"
          :class="{ active: cat.id === activeId }"
          @click="setActive(cat.id)"
        >
          <span class="left-icon">{{ cat.icon }}</span>
          <span class="left-name">{{ cat.name }}</span>
        </div>
      </aside>

      <!-- Right Content -->
      <main class="category-right" ref="rightPanel">
        <!-- Top Banner -->
        <div class="cat-banner">
          <span class="cat-banner-title">{{ activeCategory.name }}</span>
          <span class="cat-banner-sub">精选好物 · 正品保障</span>
        </div>

        <!-- Sub Categories -->
        <div
          v-for="sub in activeCategory.subs"
          :key="sub.name"
          class="sub-group"
        >
          <div class="sub-title-row">
            <span class="sub-title">{{ sub.name }}</span>
            <span class="sub-more">更多 ›</span>
          </div>
          <div class="sub-grid">
            <div
              v-for="item in sub.items"
              :key="item.name"
              class="sub-item"
              @click="goProduct(item)"
            >
              <div class="sub-img-box">
                <img :src="item.image" :alt="item.name" />
              </div>
              <div class="sub-item-name">{{ item.name }}</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { IconFont } from '@nutui/icons-vue'
import { categories } from '../mock/categories'

const router = useRouter()
const search = ref('')
const activeId = ref(categories[0].id)
const rightPanel = ref(null)

const activeCategory = computed(() =>
  categories.find((c) => c.id === activeId.value) || categories[0]
)

function setActive(id) {
  activeId.value = id
  // Scroll right panel back to top when switching
  if (rightPanel.value) rightPanel.value.scrollTop = 0
}

function goProduct(item) {
  router.push({ path: '/product-list', query: { cat: item.name } })
}
</script>
