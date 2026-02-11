<template>
  <div class="product-card">
    <div class="thumb">
      <slot name="thumb" />
    </div>
    <div class="title">
      <slot name="title" />
    </div>
    <div class="meta">
      <slot name="meta" />
    </div>
    <div class="footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<style scoped>
.product-card {
  background: #fff;
  border-radius: var(--jd-radius-md);
  padding: var(--jd-space-sm);
  border: 1px solid #f1f1f1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.thumb {
  height: 120px;
  border-radius: var(--jd-radius-sm);
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--jd-muted);
  font-size: 12px;
}

.title {
  font-weight: 600;
  font-size: 14px;
  line-height: 1.3;
  min-height: 36px;
}

.meta {
  color: var(--jd-muted);
  font-size: 12px;
}

.footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
