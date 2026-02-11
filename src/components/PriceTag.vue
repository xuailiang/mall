<template>
  <div class="price-tag">
    <span class="price">¥ {{ price }}</span>
    <span v-if="showOriginal" class="original">¥ {{ original }}</span>
  </div>
</template>

<script setup>
const props = defineProps({
  price: {
    type: [String, Number],
    required: true
  },
  original: {
    type: [String, Number],
    default: ''
  },
  showOriginal: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
.price-tag {
  display: flex;
  align-items: baseline;
  gap: 8px;
}

.price {
  color: var(--jd-red);
  font-weight: 800;
  font-size: 20px;
}

.original {
  color: var(--jd-muted);
  font-size: 12px;
  text-decoration: line-through;
}
</style>
