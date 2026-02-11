<template>
  <span class="promo-badge">
    <slot />
  </span>
</template>

<style scoped>
.promo-badge {
  display: inline-flex;
  align-items: center;
  padding: 2px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  background: #fff1f0;
  color: var(--jd-red-strong);
  border: 1px solid #ffd7d5;
}
</style>
